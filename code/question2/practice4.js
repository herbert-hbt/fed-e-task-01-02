// const fp = require("lodash/fp");
// const { Maybe, Container } = require("./support.js");

// let ex4 = function (n) {
//   if (n) {
//     return parseInt(n);
//   }
// };

class Maybe {
  static of(x) {
    return new Maybe(x);
  }
  isNothing() {
    return (
      this._value === null || this._value === undefined || this._value === 0
    );
  }
  constructor(x) {
    this._value = x;
  }
  map(fn) {
    return this.isNothing() ? Maybe.of(undefined) : Maybe.of(fn(this._value));
  }
}
// let ex4 = function (n) {
//   if (n) {
//     return parseInt(n);
//   }
// };
const ex4 = (n) => Maybe.of(n).map(parseInt)._value;
console.log(ex4(4));
console.log(ex4(0));
console.log(ex4(undefined));
console.log(ex4(5.4));
console.log(ex4("oo"));
console.log(ex4());
