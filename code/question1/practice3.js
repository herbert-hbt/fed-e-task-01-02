const fp = require("lodash/fp");
const cars = [
  {
    name: "Ferrari FF",
    horsepower: 600,
    dollar_value: 700000,
    in_stock: true,
  },
  {
    name: "Spyker C12",
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false,
  },
  {
    name: "JAGUAR xkr-s",
    horsepower: 550,
    dollar_value: 132000,
    in_stock: false,
  },
  {
    name: "Audi R8",
    horsepower: 525,
    dollar_value: 114200,
    in_stock: false,
  },
  {
    name: "Aston Martin Onr-77",
    horsepower: 750,
    dollar_value: 185000,
    in_stock: true,
  },
  {
    name: "Pagani Huayra",
    horsepower: 700,
    dollar_value: 130000,
    in_stock: false,
  },
];

let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length;
};
const averageDollarValue = fp.flowRight(
  _average,
  fp.map(fp.prop("dollar_value"))
);
console.log(averageDollarValue(cars));
