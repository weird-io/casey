# casey

A javascript functional approach to switch and if-else statements

## install

```
npm install --save casey
# or
yarn add casey
```

## usage

You can always start by importing the module

```js
import casey from "casey";
```

Simple usage allows you to provide direct mappings from a condition value to a desired resulting value. An optional `default` may be provided for when there is no explicit match using strict comparison (i.e. ===).

```js
const x = casey
  .case(1, "one")
  .case(2, "two")
  .case(3, "three")
  .default("not found")
  .match(2); // x = "two"
```

A slightly more advanced approach is to provide the custom matching functions and corresponding value generating functions. This can be useful when the conditions require more than a simple strict comparison or the values are resource/processor intensive to create. When a function is provided for the value it will automatically be called and the resulting value returned by `match`. Comparison functions may return any value to be checked for truthiness but a `boolean` value is recommended for transparency.

```js
const x = casey
  .case(v => v === 1, () => "one")
  .case(v => v === 2, () => "two")
  .case(v => v === 3, () => "three")
  .default(() => "not found")
  .match(3); // x = "three"
```

In some less frequent cases you may wish to predetermine the desired result by providing a boolean value for the condition. In this form the same result will always be returned by `match` essentially overriding the provided default.

```js
const a = 5;
const x = casey
  .case(a === 1, "one")
  .case(a === 2, "two")
  .case(a === 3, "three")
  .case(true, "other number")
  .default("not found")
  .match(); // x = "other number"
```

You can also add your cases in batches using the `map` function. Casey looks for the first possible match so duplicate conditions, though possible, will always result in the first possible match. `map` may be called multiple times to add more cases in batches.

```js
const x = casey.map([[1, "one"], [2, "two"], [3, "three"]]).match(3); // x = "three"
```

In all scenarios you can mix the types of the conditions and the value as you please. They do not need to all be the same though the resulting code may make your eyes bleed.

## test

```
npm test
```
