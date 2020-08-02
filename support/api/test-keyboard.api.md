## API Report File for "test-keyboard"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import type { Shape } from '@remirror/core-types';

// @public
export type BatchedCallback = (action: BatchedKeyboardAction, index: number, actions: BatchedKeyboardAction[]) => void;

// @public (undocumented)
export interface BatchedKeyboardAction {
    dispatch: () => void;
    event: KeyboardEvent;
    type: KeyboardEventName;
}

// @public
export const cleanKey: (key: SupportedCharacters) => any;

// @public
export const createKeyboardEvent: (type: KeyboardEventName, options: KeyboardEventInit & Shape) => KeyboardEvent;

// @public
export const getModifierInformation: ({ modifiers, isMac, }: GetModifierInformationParameter) => ModifierInformation;

// @public (undocumented)
export interface IsTypingParameter {
    typing: boolean;
}

// @public
export const isUSKeyboardCharacter: (char: unknown) => char is "a" | "b" | "i" | "p" | "q" | "s" | "u" | "0" | "g" | "\0" | " " | "Digit0" | "1" | "Digit1" | "2" | "Digit2" | "3" | "Digit3" | "4" | "Digit4" | "5" | "Digit5" | "6" | "Digit6" | "7" | "Digit7" | "8" | "Digit8" | "9" | "Digit9" | "Power" | "Eject" | "Abort" | "Cancel" | "Help" | "Backspace" | "Tab" | "Clear" | "Numpad5" | "NumpadEnter" | "Enter" | "\r" | "ShiftLeft" | "Shift" | "ShiftRight" | "ControlLeft" | "Control" | "ControlRight" | "AltLeft" | "Alt" | "AltRight" | "Pause" | "CapsLock" | "Escape" | "Convert" | "NonConvert" | "Space" | "PageUp" | "Numpad9" | "PageDown" | "Numpad3" | "End" | "Numpad1" | "Home" | "Numpad7" | "ArrowLeft" | "Numpad4" | "ArrowUp" | "Numpad8" | "ArrowRight" | "Numpad6" | "ArrowDown" | "Numpad2" | "Select" | "Open" | "Execute" | "PrintScreen" | "Insert" | "Numpad0" | "Delete" | "NumpadDecimal" | "." | ")" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*" | "(" | "KeyA" | "A" | "KeyB" | "B" | "KeyC" | "C" | "c" | "KeyD" | "D" | "d" | "KeyE" | "E" | "e" | "KeyF" | "F" | "f" | "KeyG" | "G" | "KeyH" | "H" | "h" | "KeyI" | "I" | "KeyJ" | "J" | "j" | "KeyK" | "K" | "k" | "KeyL" | "L" | "l" | "KeyM" | "M" | "m" | "KeyN" | "N" | "n" | "KeyO" | "O" | "o" | "KeyP" | "P" | "KeyQ" | "Q" | "KeyR" | "R" | "r" | "KeyS" | "S" | "KeyT" | "T" | "t" | "KeyU" | "U" | "KeyV" | "V" | "v" | "KeyW" | "W" | "w" | "KeyX" | "X" | "x" | "KeyY" | "Y" | "y" | "KeyZ" | "Z" | "z" | "MetaLeft" | "Meta" | "MetaRight" | "ContextMenu" | "NumpadMultiply" | "NumpadAdd" | "+" | "NumpadSubtract" | "-" | "NumpadDivide" | "/" | "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12" | "F13" | "F14" | "F15" | "F16" | "F17" | "F18" | "F19" | "F20" | "F21" | "F22" | "F23" | "F24" | "NumLock" | "ScrollLock" | "AudioVolumeMute" | "AudioVolumeDown" | "AudioVolumeUp" | "MediaTrackNext" | "MediaTrackPrevious" | "MediaStop" | "MediaPlayPause" | "Semicolon" | ":" | ";" | "Equal" | "=" | "NumpadEqual" | "Comma" | "<" | "," | "Minus" | "_" | "Period" | ">" | "Slash" | "?" | "Backquote" | "~" | "`" | "BracketLeft" | "{" | "[" | "Backslash" | "|" | "\\" | "BracketRight" | "}" | "]" | "Quote" | "\"" | "'" | "AltGraph" | "Props" | "CrSel" | "Accept" | "ModeChange" | "Print" | "Attn" | "ExSel" | "EraseEof" | "Play" | "ZoomOut" | "\n";

// @public (undocumented)
export class Keyboard {
    constructor({ target, defaultOptions, isMac, batch, onEventDispatch, }: KeyboardConstructorParameter);
    char({ text, options, typing }: TextInputParameter): this;
    // (undocumented)
    static create(params: KeyboardConstructorParameter): Keyboard;
    // (undocumented)
    static get defaultOptions(): KeyboardEventInit;
    end(): this;
    forEach(fn: BatchedCallback): this;
    keyDown: ({ options }: OptionsParameter) => this;
    keyPress: ({ options }: OptionsParameter) => this;
    keyUp: ({ options }: OptionsParameter) => this;
    mod({ text, options }: TextInputParameter): this;
    start(): this;
    // (undocumented)
    status: 'started' | 'ended' | 'idle';
    type({ text, options }: TypingInputParameter): this;
    usChar({ text, options, typing }: TextInputParameter<SupportedCharacters>): this;
}

// @public (undocumented)
export interface KeyboardConstructorParameter {
    batch?: boolean;
    defaultOptions?: KeyboardEventInit;
    isMac?: boolean;
    onEventDispatch?: (event: KeyboardEvent) => void;
    target: Element;
}

// @public
export type KeyboardEventName = 'keydown' | 'keyup' | 'keypress';

// @public (undocumented)
export interface KeyDefinition {
    // (undocumented)
    code?: string;
    // (undocumented)
    key: string;
    // (undocumented)
    keyCode?: number;
    // (undocumented)
    location?: number;
    // (undocumented)
    shiftKey?: string;
    // (undocumented)
    shiftKeyCode?: number;
    // (undocumented)
    text?: string;
}

// @public
export interface ModifierInformation {
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
    shiftKey: boolean;
}

// @public (undocumented)
export const noKeyPress: string[];

// @public (undocumented)
export const noKeyUp: string[];

// @public (undocumented)
export interface OptionsParameter {
    options: KeyboardEventInit;
}

// @public (undocumented)
export interface OptionsWithTypingParameter extends OptionsParameter, Partial<IsTypingParameter> {
}

// @public (undocumented)
export type SupportedCharacters = Extract<keyof USKeyboardLayout, string>;

// @public (undocumented)
export interface TextInputParameter<Type extends string = string> extends Partial<OptionsParameter>, Partial<IsTypingParameter> {
    text: Type;
}

// @public (undocumented)
export type TypingInputParameter = Omit<TextInputParameter, 'typing'>;

// @public (undocumented)
export type USKeyboardLayout = typeof rawUSKeyboardLayout;

// @public (undocumented)
export const usKeyboardLayout: Record<"a" | "b" | "i" | "p" | "q" | "s" | "u" | "0" | "g" | "\0" | " " | "Digit0" | "1" | "Digit1" | "2" | "Digit2" | "3" | "Digit3" | "4" | "Digit4" | "5" | "Digit5" | "6" | "Digit6" | "7" | "Digit7" | "8" | "Digit8" | "9" | "Digit9" | "Power" | "Eject" | "Abort" | "Cancel" | "Help" | "Backspace" | "Tab" | "Clear" | "Numpad5" | "NumpadEnter" | "Enter" | "\r" | "ShiftLeft" | "Shift" | "ShiftRight" | "ControlLeft" | "Control" | "ControlRight" | "AltLeft" | "Alt" | "AltRight" | "Pause" | "CapsLock" | "Escape" | "Convert" | "NonConvert" | "Space" | "PageUp" | "Numpad9" | "PageDown" | "Numpad3" | "End" | "Numpad1" | "Home" | "Numpad7" | "ArrowLeft" | "Numpad4" | "ArrowUp" | "Numpad8" | "ArrowRight" | "Numpad6" | "ArrowDown" | "Numpad2" | "Select" | "Open" | "Execute" | "PrintScreen" | "Insert" | "Numpad0" | "Delete" | "NumpadDecimal" | "." | ")" | "!" | "@" | "#" | "$" | "%" | "^" | "&" | "*" | "(" | "KeyA" | "A" | "KeyB" | "B" | "KeyC" | "C" | "c" | "KeyD" | "D" | "d" | "KeyE" | "E" | "e" | "KeyF" | "F" | "f" | "KeyG" | "G" | "KeyH" | "H" | "h" | "KeyI" | "I" | "KeyJ" | "J" | "j" | "KeyK" | "K" | "k" | "KeyL" | "L" | "l" | "KeyM" | "M" | "m" | "KeyN" | "N" | "n" | "KeyO" | "O" | "o" | "KeyP" | "P" | "KeyQ" | "Q" | "KeyR" | "R" | "r" | "KeyS" | "S" | "KeyT" | "T" | "t" | "KeyU" | "U" | "KeyV" | "V" | "v" | "KeyW" | "W" | "w" | "KeyX" | "X" | "x" | "KeyY" | "Y" | "y" | "KeyZ" | "Z" | "z" | "MetaLeft" | "Meta" | "MetaRight" | "ContextMenu" | "NumpadMultiply" | "NumpadAdd" | "+" | "NumpadSubtract" | "-" | "NumpadDivide" | "/" | "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8" | "F9" | "F10" | "F11" | "F12" | "F13" | "F14" | "F15" | "F16" | "F17" | "F18" | "F19" | "F20" | "F21" | "F22" | "F23" | "F24" | "NumLock" | "ScrollLock" | "AudioVolumeMute" | "AudioVolumeDown" | "AudioVolumeUp" | "MediaTrackNext" | "MediaTrackPrevious" | "MediaStop" | "MediaPlayPause" | "Semicolon" | ":" | ";" | "Equal" | "=" | "NumpadEqual" | "Comma" | "<" | "," | "Minus" | "_" | "Period" | ">" | "Slash" | "?" | "Backquote" | "~" | "`" | "BracketLeft" | "{" | "[" | "Backslash" | "|" | "\\" | "BracketRight" | "}" | "]" | "Quote" | "\"" | "'" | "AltGraph" | "Props" | "CrSel" | "Accept" | "ModeChange" | "Print" | "Attn" | "ExSel" | "EraseEof" | "Play" | "ZoomOut" | "\n", KeyDefinition>;


// (No @packageDocumentation comment for this package)

```