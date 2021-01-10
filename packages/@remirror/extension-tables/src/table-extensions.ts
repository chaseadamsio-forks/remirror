import {
  ApplySchemaAttributes,
  command,
  CommandFunction,
  CommandFunctionParameter,
  convertCommand,
  EditorState,
  extension,
  ExtensionPriority,
  ExtensionTag,
  Helper,
  helper,
  NodeExtension,
  NodeSpecOverride,
  nonChainable,
  NonChainableCommandFunction,
  OnSetOptionsParameter,
  ProsemirrorPlugin,
  StateUpdateLifecycleParameter,
} from '@remirror/core';
import { ExtensionTablesMessages as Messages } from '@remirror/messages';
import { TextSelection } from '@remirror/pm/state';
import {
  addColumnAfter,
  addColumnBefore,
  addRowAfter,
  addRowBefore,
  columnResizing,
  deleteColumn,
  deleteRow,
  deleteTable,
  fixTables,
  fixTablesKey,
  mergeCells,
  setCellAttr,
  splitCell,
  tableEditing,
  toggleHeaderCell,
  toggleHeaderColumn,
  toggleHeaderRow,
} from '@remirror/pm/tables';

import {
  createTable,
  CreateTableCommand,
  createTableNodeSchema,
  TableSchemaSpec,
} from './table-utils';

const createTableCommand: Remirror.CommandDecoratorOptions = {
  icon: 'table2',
  description: ({ t }) => t(Messages.CREATE_COMMAND_DESCRIPTION),
  label: ({ t }) => t(Messages.CREATE_COMMAND_LABEL),
};

export interface TableOptions {
  /**
   * When `true` the table will be resizable.
   *
   * @default true
   */
  resizable?: boolean;
}

let tablesEnabled = false;

@extension<TableOptions>({
  defaultOptions: {
    resizable: true,
  },
  defaultPriority: ExtensionPriority.Default,
})
export class TableExtension extends NodeExtension<TableOptions> {
  private lastGoodState?: EditorState = undefined;

  get name() {
    return 'table' as const;
  }

  createTags() {
    return [ExtensionTag.Block];
  }

  /**
   * The last known good state that didn't need fixing. This helps make the fix
   * command more effective.
   */

  createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec {
    return createTableNodeSchema(extra, override).table;
  }

  /**
   * Create the table extensions. Set the priority to low so that they appear
   * lower down in the node list.
   */
  createExtensions() {
    return [new TableRowExtension({ priority: ExtensionPriority.Low })];
  }

  onStateUpdate(parameter: StateUpdateLifecycleParameter): void {
    const { tr, state } = parameter;

    if (tr?.getMeta(fixTablesKey)?.fixTables) {
      this.lastGoodState = state;
    }
  }

  /**
   * Add the table plugins to the editor.
   */
  createExternalPlugins(): ProsemirrorPlugin[] {
    const plugins = [tableEditing()];

    if (this.options.resizable) {
      plugins.push(columnResizing({}));
    }

    return plugins;
  }

  /**
   * Create a table in the editor at the current selection point.
   */
  @command(createTableCommand)
  createTable(options: CreateTableCommand = {}): CommandFunction {
    return (parameter) => {
      const { tr, dispatch, state } = parameter;

      if (!tr.selection.empty) {
        return false;
      }

      const offset = tr.selection.anchor + 1;
      const nodes = createTable({ schema: state.schema, ...options });

      dispatch?.(
        tr
          .replaceSelectionWith(nodes)
          .scrollIntoView()
          .setSelection(TextSelection.near(tr.doc.resolve(offset))),
      );

      return true;
    };
  }

  /**
   * Delete the table.
   */
  @command()
  deleteTable(): CommandFunction {
    return convertCommand(deleteTable);
  }

  /**
   * Command to add a column before the column with the selection.
   */
  @command()
  addTableColumnBefore(): CommandFunction {
    return convertCommand(addColumnBefore);
  }

  /**
   * Command to add a column after the column with the selection.
   */
  @command()
  addTableColumnAfter(): CommandFunction {
    return convertCommand(addColumnAfter);
  }

  /**
   * Remove selected column from the table.
   */
  @command()
  deleteTableColumn(): CommandFunction {
    return convertCommand(deleteColumn);
  }

  /**
   * Add a table row before the current selection.
   */
  @command()
  addTableRowBefore(): CommandFunction {
    return convertCommand(addRowBefore);
  }

  /**
   * Add a table row after the current selection.
   */
  @command()
  addTableRowAfter(): CommandFunction {
    return convertCommand(addRowAfter);
  }

  /**
   * Delete the table row at the current selection.
   */
  @command()
  deleteTableRow(): CommandFunction {
    return convertCommand(deleteRow);
  }

  /**
   * Toggles between merging cells.
   */
  @command()
  toggleTableCellMerge(): CommandFunction {
    return toggleMergeCellCommand;
  }

  /**
   * Merge the table cells.
   */
  @command()
  mergeTableCells(): CommandFunction {
    return convertCommand(mergeCells);
  }

  /**
   * Split the merged cells into individual cells.
   */
  @command()
  splitTableCell(): CommandFunction {
    return convertCommand(splitCell);
  }

  /**
   * Toggles a column as the header column.
   */
  @command()
  toggleTableHeaderColumn(): CommandFunction {
    return convertCommand(toggleHeaderColumn);
  }

  /**
   * Toggles a row as a table header row.
   */
  @command()
  toggleTableHeaderRow(): CommandFunction {
    return convertCommand(toggleHeaderRow);
  }

  /**
   * Toggle a cell as a table header cell.
   */
  @command()
  toggleTableHeaderCell(): CommandFunction {
    return convertCommand(toggleHeaderCell);
  }

  /**
   * Set the attribute for a table cell.
   */
  @command()
  setTableCellAttribute(name: string, value: unknown): CommandFunction {
    return convertCommand(setCellAttr(name, value));
  }

  /**
   * Fix all tables within the document.
   *
   * This is a **non-chainable** command.
   */
  @command({ disableChaining: true })
  fixTables(): NonChainableCommandFunction {
    return nonChainable(fixTablesCommand(this.lastGoodState));
  }

  /**
   * Enable table usage within the editor. This depends on the browser that
   * is being used.
   */
  @helper()
  enableTableSupport(): Helper<void> {
    if (!tablesEnabled) {
      document.execCommand('enableObjectResizing', false, 'false');
      document.execCommand('enableInlineTableEditing', false, 'false');
      tablesEnabled = true;
    }
  }

  /**
   * This managers the updates of the collaboration provider.
   */
  protected onSetOptions(parameter: OnSetOptionsParameter<TableOptions>): void {
    const { changes } = parameter;

    // TODO move this into a new method in `plugins-extension`.
    if (changes.resizable.changed) {
      this.store.updateExtensionPlugins(this);
    }
  }
}

/**
 * The extension for a table row node.
 */
@extension({ defaultPriority: ExtensionPriority.Low })
export class TableRowExtension extends NodeExtension {
  get name() {
    return 'tableRow' as const;
  }

  /**
   * Automatically create the `TableCellExtension` and
   * `TableHeaderCellExtension`. This is placed here so that this extension can
   * be tested independently from the `TableExtension`.
   */
  createExtensions() {
    return [
      new TableCellExtension({ priority: ExtensionPriority.Low }),
      new TableHeaderCellExtension({ priority: ExtensionPriority.Low }),
    ];
  }

  createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec {
    return createTableNodeSchema(extra, override).tableRow;
  }
}

/**
 * The extension for a table cell node.
 */
@extension({ defaultPriority: ExtensionPriority.Low })
export class TableCellExtension extends NodeExtension {
  get name() {
    return 'tableCell' as const;
  }

  createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec {
    return createTableNodeSchema(extra, override).tableCell;
  }
}

/**
 * The extension for the table header node.
 */
@extension({ defaultPriority: ExtensionPriority.Low })
export class TableHeaderCellExtension extends NodeExtension {
  get name() {
    return 'tableHeaderCell' as const;
  }

  createNodeSpec(extra: ApplySchemaAttributes, override: NodeSpecOverride): TableSchemaSpec {
    return createTableNodeSchema(extra, override).tableHeaderCell;
  }
}

/**
 * The command for fixing the tables.
 */
function fixTablesCommand(lastGoodState?: EditorState): CommandFunction {
  return ({ state, dispatch }) => {
    const tr = fixTables(state, lastGoodState);

    if (!tr) {
      return false;
    }

    if (dispatch) {
      dispatch(tr);
    }

    return true;
  };
}

function toggleMergeCellCommand({ state, dispatch }: CommandFunctionParameter) {
  if (mergeCells(state, dispatch)) {
    return false;
  }

  return splitCell(state, dispatch);
}

declare global {
  namespace Remirror {
    interface AllExtensions {
      table: TableExtension;
    }
  }
}