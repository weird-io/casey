import casey from "../lib";

const result = casey
  .case(1, () => "one")
  .case(2, "two")
  .case(3, "three")
  .case(4, "four")
  .case((v: any) => true, "many")
  .default("foobar")
  .match(5);

// result == "many"
