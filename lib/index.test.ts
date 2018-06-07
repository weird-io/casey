import casey from "./index";

describe("Casey simple", () => {
  const t = casey
    .case(1, () => "one")
    .case(2, "two")
    .case(3, "three")
    .case(4, "four")
    .case((v: any) => v !== undefined, "many")
    .default("unknown");

  const tests = [
    { key: 1, expected: "one" },
    { key: 2, expected: "two" },
    { key: 3, expected: "three" },
    { key: 4, expected: "four" },
    { key: 5, expected: "many" }
  ];

  tests.forEach(v => {
    it(`should return "${v.key}" for value '${v.expected}'`, () => {
      expect(t.match(v.key)).toBe(v.expected);
    });
  });
  it(`should return "many" for value 'null'`, () => {
    expect(t.match(null)).toBe("many");
  });
  it(`should return "unknown" for value 'undefined'`, () => {
    expect(t.match(undefined)).toBe("unknown");
  });
  it(`should return "unknown" for no value`, () => {
    expect(t.match()).toBe("unknown");
  });
});

describe("Casey default first", () => {
  const value: number = null;
  const t = casey
    .default("unknown")
    .case(value === 1, () => "one")
    .case(value === 2, () => "two")
    .case(value === 3, () => "three")
    .case(value === 4, () => "four");

  it(`should return "unknown" for value 'null'`, () => {
    expect(t.match(value)).toBe("unknown");
  });
});
