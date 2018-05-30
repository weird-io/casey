# casey
A javascript functional approach to switch and if-else statements

```js
const x = casey
  .case(1, "one")
  .case(2, "two")
  .case(3, "three")
  .default("not found")
  .match(2) // x = "two"
```
```js
const y = casey
  .case(v => v === 1, () => "one")
  .case(v => v === 2, () => "two")
  .case(v => v === 3, () => "three")
  .default(() => "not found")
  .match(3) // y = "three"
```
```js
const a = 5
const z = casey
  .case(a === 1, "one")
  .case(a === 2, "two")
  .case(a === 3, "three")
  .case(true, "other number")
  .default("not found")
  .match() // z = "other number"
```
