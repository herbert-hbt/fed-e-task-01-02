# 简答题

1. 描述引用计数的工作原理和优缺点<br>
答： 
    - 原理：记录对象被引用的次数，被引用 1 次加一，解除引用减一，一旦引用次数为零，就对该对象进行回收。 
    - 优点： 一旦为零就被回收，实时性好，及时。 - 因为及时性比较好，所以内存利用率高， 
    - 缺点： - 无法回收循环引用的对象 - 由于需要维护很多计数器，所以程序运行速度稍慢，时间开销大
2.  描述标记整理算法的工作流程<br>
答： 
    - 遍历所有对象，标记可达对象 
    - 遍历所有对象 - 先整理可达对象 
    - 再清除可达对象标记 
    - 最后释放非可达对象内存
3.  描述 V8 新生代区垃圾回收流程<br>
答 
    - 标记整理 From 区 
    - 复制 From 区到 To 区 
    - 释放from区内存
    - 满足以下条件时，发生晋升 
    - 单个对象 经历 From 到 To 的次数 到达 晋升条件 规定的次数 
    - 所有对象所占内存达到 25%以上 
    - 交换 From 与 To

4.  描述增量标记算法在何时使用以及工作原理<br>
    答： 
    - 适用时机：V8GC 的标记整理或标记清除阶段 
    - 工作原理：可以将标记清楚和标记整理分为三个阶段 
        - 遍历所有对象，标记直接可达对象， 
        - 标记间接可达对象 
        - 整理

# 代码题 1

基于以下代码完成下面四个练习
```
const fp = require('lodash/fp')
// 数据
// horsepower 马力
// dollar_value 价格
// in_stock 库存
const cars = [{
    name: 'Ferrari FF',
    horsepower: 600,
    dollar_value: 700000,
    in_stock: true
}, {
    name: 'Spyker C12',
    horsepower: 650,
    dollar_value: 648000,
    in_stock: false 
}, { 
    name: 'JAGUAR xkr-s', 
    horsepower: 550, 
    dollar_value: 132000,
    in_stock: false 
}, { 
    name: 'Audi R8', 
    horsepower: 525, 
    dollar_value: 114200, 
    in_stock: false 
}, { 
    name: 'Aston Martin Onr-77', 
    horsepower: 750, 
    dollar_value: 185000, 
    in_stock: true 
}, { 
    name: 'Pagani Huayra', 
    horsepower: 700, 
    dollar_value: 130000, 
    in_stock: false 
}]
```
## 练习题1：使用函数组合fp.flowRight()重新实现下面这个函数
```
    let isLastInStock = function(cars){
        //获取最后一条数据
        let last_car = fp.last(cars);
        //获取最后一条数据的 in_stock 属性值
        return fp.prop('in_stock',last_car);
    }
```
> 答：
```
    const isLastInStock = fp.flowRight(fp.prop('name'),getLast);
```
## 练习题2：使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name值
> 答：
```
    const getTheNameOfFirstCar = fp.flowRight(fp.prop('name'),fp.first);
```
## 练习题3：使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现
```
    let _average = function(xs){
        return fp.reduce(fp.add,0,xs) / xs.length
    }
    let averageDollarValue = function(cars){
        let dollar_values = fp.map(function(car){
            return car.dollar_value
        },cars)
        return _average(dollar_values)
    }
```
> 答：
```
    const _average = function (xs) {
        return fp.reduce(fp.add, 0, xs) / xs.length;
    };
    const averageDollarValue = fp.flowRight(_average, fp.map(fp.prop('dollar_value')));
```
## 练习题4：使用flowRight写一个sanitizeNames()函数，返回一个下滑线连接的小写字符串，把数组中的name转为这种形式：例如：sanitizeNames(["Hello World"]) => ["hello_world"]
> 答：（由于没太理解题意，给出了三种转换方案）
```
    const _underscore = fp.replace(/\W+/g, "_");

    //情形一：直接转换数组
    const sanitizeNames = fp.map(fp.flowRight(_underscore, fp.lowerCase));
    console.log(sanitizeNames(["Ferrari FF", "Aston Martin Onr-77", "Audi R8"]));

    //情形二：将cars数组中name抽成数组，再转为"_"连接的小写形式
    const sanitizeNames = fp.map(fp.flowRight(_underscore, fp.lowerCase, fp.prop("name")));
    console.log(sanitizeNames(cars))

    //情形三：将cars数组中的name属性转为"_"连接的小写形式
    const sanitizeNames = fp.map((item) =>
        fp.set("name")(
            fp.flowRight(_underscore, fp.lowerCase)(fp.prop("name")(item))
        )(item)
    );
    console.log(sanitizeNames(cars))
```

# 代码题 2
基于以下代码完成下面四个练习
```
    //support.js
    class Container {
        static of(value) {
            return new Container(value);
        }
        constructor(value) {
            this._value = value;
        }
        map(fn) {
            return Container.of(fn(this._value));
        }
    }
    class Maybe {
        static of(x) {
            return new Maybe(x);
        }
        isNothing() {
            return this._value === null || this._value === undefined;
        }
        constructor(x) {
            this._value = x;
        }
        map(fn) {
            return this.isNothing() ? this : Maybe.of(fn(this._value));
        }
    }
    module.exports = {
        Maybe,
        Container,
    };
```
## 练习题1：使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
> 答：
```
    const fp = require("lodash/fp");
    const { Maybe, Container } = require("./support.js");

    let maybe = Maybe.of([5, 6, 1]);
    let ex1 = maybe.map(fp.map(fp.add(3)));
    console.log(ex1._value);
```
## 练习题2：实现一个函数ex2,能够使用fp.first获取列表的第一个元素
> 答：
```
    const fp = require("lodash/fp");
    const { Maybe, Container } = require("./support.js");

    let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);
    let ex2 = () => xs.map(fp.first)._value;
    console.log(ex2());
```
## 练习题3：实现一个函数ex3,使用safeProp和fp.first找到user的名字的首字母
> 答：
```
    const fp = require("lodash/fp");
    const { Maybe, Container } = require("./support.js");

    let safeProp = fp.curry(function (x, o) {
        return Maybe.of(o[x]);
    });
    let user = {
        id: 2,
        name: "Albert",
    };
    let ex3 = (obj) => safeProp("name")(obj).map(fp.first)._value;
    console.log(ex3(user));
```
## 练习题4：使用Maybe重写ex4，不要有if语句
```
    const fp = require("lodash/fp");
    const { Maybe, Container } = require("./support.js");

    let ex4 = function (n) {
    if (n) {
        return parseInt(n);
    }
    };
```
> 答：（对于输入为0的情况，原Maybe不适用，所以重写了Maybe）
```
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
    const ex4 = (n) => Maybe.of(n).map(parseInt)._value;
    console.log(ex4(4));
    console.log(ex4(0));
    console.log(ex4(undefined));
    console.log(ex4(5.4));
    console.log(ex4("oo"))
    console.log(ex4());
```