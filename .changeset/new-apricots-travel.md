---
'@remirror/core': major
'@remirror/core-helpers': major
'@remirror/core-utils': major
'remirror': major
---

🚀 Update the `onError` handler with a new improved type signature for better management of errors. See the following example.

```tsx
import React from 'react';
import { InvalidContentHandler, RemirrorProvider } from 'remirror/core';
import { WysiwygPreset } from 'remirror/preset/wysiwyg';
import { RemirrorProvider, useManager } from 'remirror/react';

const EditorWrapper = () => {
  const onError: InvalidContentHandler = useCallback(({ json, invalidContent, transformers }) => {
    // Automatically remove all invalid nodes and marks.
    return transformers.remove(json, invalidContent);
  }, []);

  const manager = useManager([new WysiwygPreset()]);

  return (
    <RemirrorProvider manager={manager} onError={onError}>
      <div />
    </RemirrorProvider>
  );
};
```

- 🚀 Add `set` and `unset` methods to `@remirror/core-helpers`.
- 🚀 Add `getInvalidContent` export from `@remirror/core-utils`.
- 🚀 Add logging support for `RemirrorError` for better readability.
- 🚀 Add new `ErrorConstant.INVALID_CONTENT` constant for content related errors.
- 🚀 Add `Manager.createEmptyDoc()` instance method for creating any empty doc (with default content) for the current schema.
- 💥 Remove `Fallback`, `CreateDocumentErrorHandler`, `getLineHeight`, `getPluginMeta`, `getPluginState`, `nodeNameMatchesList` and `setPluginMeta` exports from `@remirror/core-utils`.
- 💥 Rename `getNearestNonTextNode` function to `getNearestNonTextElement`.
- 💥 Rename `getNearestNonTextNode` function to `getNearestNonTextElement`.
- 💥 Rename `StateOrTransactionParameter` interface to `TrStateParameter`.

General refactor of types to use the `EditorSchema` rather than `any`. If you notice any downstream issues please open an issue.
