<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@remirror/core-utils](./core-utils.md) &gt; [findChildrenByAttr](./core-utils.findchildrenbyattr.md)

## findChildrenByAttr variable

Iterates over descendants of a given `node`<!-- -->, returning child nodes predicate returns truthy for.

<b>Signature:</b>

```typescript
findChildrenByAttr: ({ node, predicate, descend }: FindChildrenByAttrParams) => NodeWithPosition[]
```

## Remarks

It doesn't descend into a node when descend argument is `false` (defaults to `true`<!-- -->).

```ts
const mergedCells = findChildrenByAttr(table, attrs => attrs.colspan === 2);

```
