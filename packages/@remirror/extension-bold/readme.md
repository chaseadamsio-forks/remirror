# @remirror/extension-bold

> Make your text bold. Make it courageous.

[![Version][version]][npm] [![Weekly Downloads][downloads-badge]][npm] [![Bundled size][size-badge]][size] [![Typed Codebase][typescript]](#) [![MIT License][license]](#)

[version]: https://flat.badgen.net/npm/v/@remirror/extension-bold/next
[npm]: https://npmjs.com/package/@remirror/extension-bold/v/next
[license]: https://flat.badgen.net/badge/license/MIT/purple
[size]: https://bundlephobia.com/result?p=@remirror/extension-bold@next
[size-badge]: https://flat.badgen.net/bundlephobia/minzip/@remirror/extension-bold@next
[typescript]: https://flat.badgen.net/badge/icon/TypeScript?icon=typescript&label
[downloads-badge]: https://badgen.net/npm/dw/@remirror/extension-bold/red?icon=npm

<br />

## Installation

```bash
yarn add @remirror/extension-bold@next @remirror/pm@next # yarn
pnpm add @remirror/extension-bold@next @remirror/pm@next # pnpm
npm install @remirror/extension-bold@next @remirror/pm@next # npm
```

This is included by default when you install the recommended `remirror` package. All exports are also available via the entry-point, `remirror/extension/bold`.

<br />

## Usage

When added to your editor it will provide the `toggleBold` command which makes the text under the cursor / or at the provided position range bold.

```ts
import { ExtensionPriority, RemirrorManager } from 'remirror/core';
import { BoldExtension } from 'remirror/extension/bold';
import { CorePreset } from 'remirror/preset/core';

// Create the bold extension
const boldExtension = new BoldExtension({ weight: '500' });
const corePreset = new CorePreset();

// Create the Editor Manager with the bold extension passed through.
const manager = RemirrorManager.create([boldExtension, corePreset]);

// Pass the dom element to the editor. If you are using `@remirror/react` this is done for you.
const element = document.createElement('div');
document.body.append(element);

// Add the view to the editor manager.
manager.addView(element);

// Access the commands and toggleBoldness
manager.commands.toggleBold();

// Toggle at the provided range
manager.commands.toggleBold({ from: 1, to: 7 });
```

<br />
