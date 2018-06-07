# casey

A javascript functional approach to switch and if-else statements

## Installation

```
npm install --save casey
# or
yarn add casey
```

## Usage

You can always start by importing the module

```js
import casey from "casey";
```

Simple usage allows you to provide direct mappings from a condition value to a desired resulting value. An optional `default` may be provided for when there is no explicit match using strict `===` comparison.

```js
casey
  .case(1, "one")
  .case(2, "two")
  .case(3, "three")
  .default("not found")
  .match(2); // "two"
```

A slightly more advanced approach is to provide the custom matching functions and corresponding value generating functions. This can be useful when the conditions require more than a simple strict comparison or the values are resource/processor intensive to create. When a function is provided for the value it will automatically be called and the resulting value returned by `match`. Comparison functions may return any value to be checked for truthiness but a `boolean` value is recommended for transparency.

```js
casey
  .case(v => v === 1, () => "one")
  .case(v => v === 2, () => "two")
  .case(v => v === 3, () => "three")
  .default(() => "not found")
  .match(3); // "three"
```

In some less frequent cases you may wish to predetermine the desired result by providing a boolean value for the condition. In this form the same result will always be returned by `match` essentially overriding the provided default.

```js
const a = 5;
casey
  .case(a === 1, "one")
  .case(a === 2, "two")
  .case(a === 3, "three")
  .case(true, "other number")
  .default("not found")
  .match(); // "other number"
```

You can also add your cases in batches using the `map` function. Casey looks for the first possible match so duplicate conditions, though possible, will always result in the first possible match. `map` may be called multiple times to add more cases in batches.

```js
casey.map([[1, "one"], [2, "two"], [3, "three"]]).match(3); // "three"
```

In all scenarios you can mix the types of the conditions and the value as you please. They do not need to all be the same though the resulting code may make your eyes bleed.

Another advantage to using `casey` is the ability to provide the match function directly to an `Array.map()` function.

```js
const translate = casey
  .case(1, "one")
  .case(2, "two")
  .case(3, "three")
  .default("other");
[1, 2, 3, 4].map(translate.match); // ["one","two","three","other"]
```

## Testing

```
npm test
```

## Rationale

With functional programming becoming more and more prevalent the traditional if, elseif, else way of development starts to feel clunky and unnecessary.

```js
const value = 3;
let result = "";
if (value === 1) {
  result = "one";
} else if (value === 2) {
  result = "two";
} else if (value === 3) {
  result = "three";
} else {
  result = "other";
}
result; // "three"
```

is the same as

```js
const value = 3;
casey
  .case(1, "one")
  .case(2, "two")
  .case(3, "three")
  .default("other")
  .match(value); // "three"
```
