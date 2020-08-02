## API Report File for "@remirror/extension-history"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { CommandFunction } from '@remirror/core';
import { DispatchFunction } from '@remirror/core';
import { EditorState } from '@remirror/core';
import { Handler } from '@remirror/core';
import { KeyBindings } from '@remirror/core';
import { PlainExtension } from '@remirror/core';
import { Static } from '@remirror/core';

// @public
export class HistoryExtension extends PlainExtension<HistoryOptions> {
    createCommands(): {
        undo: () => import("@remirror/core").Brand<CommandFunction<any, object>, "non-chainable">;
        redo: () => import("@remirror/core").Brand<CommandFunction<any, object>, "non-chainable">;
    };
    createExternalPlugins(): any;
    createKeymap(): KeyBindings;
    // (undocumented)
    get name(): "history";
    }

// @public (undocumented)
export interface HistoryOptions {
    depth?: Static<number | null>;
    getDispatch?: (() => DispatchFunction) | null;
    getState?: (() => EditorState) | null;
    newGroupDelay?: Static<number | null>;
    onRedo?: Handler<(success: boolean) => void>;
    onUndo?: Handler<(success: boolean) => void>;
}


// (No @packageDocumentation comment for this package)

```