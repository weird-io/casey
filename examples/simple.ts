
import casey from "../src/index";

const blah = casey
    .case(1, () => "one")
    .case(2, "two")
    .case(3, "three")
    .case(4, "four")
    .case((v) => true, "many")
    .default("foobar")
    .match(5) //?

       