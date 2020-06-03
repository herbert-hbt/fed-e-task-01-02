const fp = require("lodash/fp");
const { Maybe, Container } = require("./support.js");

let maybe = Maybe.of([5, 6, 1]);
let ex1 = (num) => maybe.map(fp.map(fp.add(num)))._value;
console.log(ex1(4));
