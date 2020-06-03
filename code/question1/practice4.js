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

const _underscore = fp.replace(/\W+/g, "_");

const sanitizeNames1 = fp.map(fp.flowRight(_underscore, fp.lowerCase));
console.log(sanitizeNames1(["Ferrari FF", "Aston Martin Onr-77", "Audi R8"]));

const sanitizeNames2 = fp.map(
  fp.flowRight(_underscore, fp.lowerCase, fp.prop("name"))
);
console.log(sanitizeNames2(cars));

const sanitizeNames3 = fp.map((item) =>
  fp.set("name")(
    fp.flowRight(_underscore, fp.lowerCase)(fp.prop("name")(item))
  )(item)
);
console.log(sanitizeNames3(cars));
