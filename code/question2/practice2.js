const fp = require("lodash/fp");
const { Maybe, Container } = require("./support.js");

let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);
let ex2 = () => xs.map(fp.first)._value;
console.log(ex2());
