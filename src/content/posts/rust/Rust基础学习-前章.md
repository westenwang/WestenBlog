---
title: Rust基础学习-前章
published: 2025-05-30
description: ''
image: ''
tags: ['Web3', 'Rust']
category: 'Rust'
draft: false 
lang: ''
---

### Rust基础

- Rust设计初衷，为了满足系统级编程的需求，并弥补C++等语言的不足。
- 优势：强大的内存安全性、零成本抽象、并发性和不可变性。
- 适用场景：编写操作系统、嵌入式系统、网络服务以及区块链



### 变量可变性

- 变量：可变变量和不可变变量
- 可变变量：是否允许修改。mut即 mutable的意思，该修饰符修饰的变量允许改变
- 不可变变量: 不允许再次发生变更。
- 不可变量的好处？编译器会在编译时对其进行静态检查，以确保在变量的作用域内不会发生对齐进行修改的操作。静态检查可以帮助编译器在编译时优化代码，减少一些运行时的检查。

- assert_eq! :  Rust 语言中用于**断言两个值相等**的宏，属于测试和调试的核心工具。

```rust
fn add(a: i32, b: i32) -> i32 { a + b }
assert_eq!(add(2, 2), 4); // 验证 2+2=4
```



### 变量解构

- 是什么？ 一种将复合数据类型（如元组、结构体、枚举等）中的值分解为单独变量的过程。
- 真实例子：

```rust
// 根据签名用户数组 和 程序ID 获取对应的 PDA 账户 及 bump 跳值种子
let (pda_account, bump_seed) = Pubkey::find_program_address(&[singer.key.as_ref()], program_id);

// 如果不需要第2个元素，可以用 .. 代替
let (pda_account, ..) = Pubkey::find_program_address(&[singer.key.as_ref()], program_id);
```

- 例子

```rust
// 第一种放法
let (a, b, c) = ("Banana", "pineapple", "durian");

// 第二种放法
let (e, d, ..) = ("Banana", "pineapple", "durian");
```



### 数值类型

- 基本类型：
  - 符号整数： i8, i16, i32, i64, isize
  - 无符号整数：u8, u16, u32, u64, usize
  - 浮点数： f32, f64， 默认浮点数为f64
- 整数：没有小数部分的数字。表示方式：有无符号+类型大小（位数）
- 整数：正整数、0、负整数

- 例子

```rust
// 这里a为默认的 i32 类型
let a = 1;
// 可以指定也可以指定为具体的整数类型
let b: u32 = 1;

// 这里c为默认的 f64 类型
let c = 1.0;
// 也可以指定为具体的浮点数类型
let d: f32 = 1.0;

// Rust中可以方便的使用不同进制来表示数值，总有一款适合你
let x: i32 = 100_000_000;
let y: i32 = 0xffab;
let z: i32 = 0o77;
let m: i32 = 0b1111_0000;
let n: u8 = b'A';
println!("x = {}, y = {}, z = {}, m = {}, n = {}", x, y, z, m, n);
```

- isize和usize
  - isize和usize类型取决于程序运行的计算机CPU类型
  - CPU为32位，则两个类型都为32位；若为64位，则它们为64位。



### 布尔、字符类型

- 字符类型：`char`，占用4个字节，可以表示Unicode字符集中的任何字符，包括ASCII字符、各种符号、各种语言的文字，甚至表情符号。

```rust
let a:char = '12';
```

- 布尔类型：`true`和`false`, 占用1个字节。

- Rust中，字符串类型的长度取决于使用的编码集，默认使用UTF-8编码，一个字符串占用1~4字节。`char`会将1~3字节的扩展为4个字节。
- `char`默认扩展为4字节的好处：
  - 保证所有`char`值在内存中占用固定大小，有利于内存对齐和访问效率。
  - 避免编码转换开销，直接使用4字节可以高效处理字符。
  - 足够表示Unicode标量值所需的全部码位，确保未来的兼容性。
- `Unicode编码`：
  - 一种可以容纳所有语言的字符编码系统，世界上任何一种语言的单个字母、汉字、日文、韩文等，都在`Unicode`字符集里有个数字跟它一一对应，可以表示的字符超过11W个。
  - `Unicode`字符集只是一种字符和数字的映射关系，一种抽象的定义。
- `Unicode`存储和传输
  - GBK: 固定双字节编码，即每个字符占用2个字节
  - UTF-8：变长编码，可以使用1~4个字节表示一个字符。对于ASCII码只需要1个字节，其他可能需要2、3、4个字节。
  - UTF-16等等



### 语句与表达式

- 语句： Rust中的执行单位，执行一些操作但不返回值，以`;`结尾。
- 表达式：Rust中的计算单位，计算并返回一个值，表示是可以用作赋值。
  - 常见表达式：函数调用、宏调用、用大括号创建的代码块等
- 单元类型：Rust中的一个特殊返回值类型，函数或表达式没有返回值，类似于其他语言中的`Void`返回类型。用`()`表示
- 区分表达式与语句：看有无`;`

```rust
fn main() {
    // 语句，使用 let 关键字创建变量并绑定一个值
    let a = 1;

    // 语句不返回值，所以不能把语句(let a = 1)绑定给变量b，下面代码会编译失败
    let b = (let a = 1);
    
    // 表达式，返回值是 x + 1
    let y = {
        let x = 3;
        x + 1
    };
    
    println!("The value of y is: {}", y); // y = 4
}
```

### 函数

- 定义：一段可重复使用的代码块，用于执行特定的任务或完成特定的操作。
- 蛇形命名规范：函数和变量名使用`snake_case`规范风格
- 函数的参数需要显示的标注类型，有助于提高代码的可读性，也有助于Rust提供更强的类型安全性。

```rust
// fn 为声明函数的关键字
// unsafe_add()是函数名，函数的命名要遵循 snake_case 的规范，同时要见名知意，提高代码的可读性
// i 和 j 是入参，并且需要显式指定参数类型
// --> i32 表明出参也是 i32 类型
fn unsafe_add(i: i32, j: i32) -> i32 {
   // 表达式形式，所以函数会在计算求和后返回该值
   i + j
}
```

- 一些特殊函数

```rust
 // 表达式作为返回值的函数
fn max_plus_one(x: i32, y: i32) -> i32 {
    if x > y {
        // 命中该规则，可通过return直接返回
        return x + 1;
    }

    // 最后一行是表达式，可作为函数返回值
    // 注意，这里不能有分号，否则就是语句
    y + 1
}

// 单元类型()作为返回值的函数
// 该函数没有显式执行返回值类型，Rust默认返回单元类型()
fn print_hello() {
    // 这里是个语句，不是表达式
    println!("hello");
}

// 永不返回的发散函数，用!标识
fn diverging() -> ! {
    // 抛出panic异常，终止程序运行
    panic!("This function will never return!");
}
```

### 栈内存和堆内存

- 栈内存： 存储的数据主要为大小固定的基础数据类型，分配和释放速度很快。后进先出。
- 堆内存：存储运行时动态变化的数据结构，允许更灵活的数据共享和动态分配；当向堆放入数据时，内存分配器在堆的某处找到一块足够大的空位，把它标记为已使用，并返回一个表示该位置地址的**指针**。
- 动态字符串(String类型)：大小可变的字符串集合，允许程序在运行时动态的管理堆内存上的字符串数据，比如分配、增长和修改字符串内容，所以能够存储在编译时未知大小的内容。
- 形象比喻：栈内存类似堆盘子，堆放满了取盘子时，要从顶部逐一取走；堆内存犹如仓库存放货物，入库需要清出一片足够的区域，出库后区域被释放；货物大小没有固定要求，只要仓库放得下即可。
- **栈内存**中存储该字符串在堆内存空间中的信息，包含：堆内存的指针、字符串长度、开辟的堆内存容量大小。



### 所有权

- 作用：保证内存安全，Rust无需垃圾回收器。
- Rust中没告知都有一个唯一的所有者Owner中，所有者拥有这个值的所有权，负责管理内存资源的分配和释放。
- 所有权三原则
  - Rust中每一个值都被一个变量所拥有，该变量被称为值的所有者；
  - 一个值透视只能被一个变量所拥有，或者一个值只能拥有一个所有者；
  - 当所有者（变量）离开作用域范围时，这个值将被丢弃。
- 形象比喻：Rust中所有权概念跟法律所有权一脉相承。Rust中所有者负责管理值的内存-分配、使用以及最终释放。
- 例子

```rust
// 变量 s1 拥有字符串 hello 的所有权
let mut s1:String = String::from("hello");

// 变量 s1 可以修改该字符串
s1.push_str(", hackquest."); // push_str() 在字符串后追加字面值
```

- 所有权转义：

```rust
// 移动所有权
fn main() {
    let s1 = String::from("hello");
    
    // 这里s1把所有权转移给了变量s2，按照所有权三原则中的第2条，
		// 此时只有s2拥有所有权，也就意味着s1已失效
    let s2 = s1;
    
    // 在这里打印s1会失败，因为它已失效
    // println!("{}, world!", s1);

} //在这里触发所有权第3个原则，即 drop 掉s2变量，释放内存
```

- Rust中作用域：变量的有效范围从作用域开始到作用域结束有效，离开作用域后变量失效且内存释放（如果变量占用内存）。
- 所有权转移，内存的变化？所有权的转移涉及两个部分：浅拷贝+旧变量失去所有权。



### 借用（引用）

- 定义: 通过引用来获得数据的**访问权**，而不是所有权，使用符号`&`表示。
- 借用在不转移所有权的情况下，让多个部分同时访问相同的数据。
- 分类：可变借用和不可变借用
- 解引用：借用的一个重要操作，允许通过引用获取到被引用值的实际内容。即：获取借用对象的值。符号`*`表示。
- 例子

```rust
// 变量s1拥有字符串的所有权，类似于你拥有一辆特别酷炫的车
let s1 = String::from("hello");

// 借用，通过 &s1 获得字符串的访问权，类似于朋友从你那里把这辆车借走了
// 但是车还是你的
let s: &String = &s1;

// 解引用，通过 *s 获的借用的对象的值
// 类似于你朋友把车开到大街上向别人展示：看，我借到了一辆特别酷炫的车！
println!("s1 = {}, s = {}", s1, *s);
```

- 借用：存储了字符串对象的内存地址指针。从更宽泛概念描述，借用也是一种引用。



### 所有权与函数

- 所有权可以转移给函数，在移动期间，所有者的堆栈值将会被复制到函数调用的参数堆栈中。
- 也可以从函数中获取所有权
- 分级释放：以结构体为例，删除一个结构体时，结构体本身会先被释放，紧接着才分别释放相应的子结构体并以此类推。
- 在发生了可变借用后，一个资源的所有者便不可以再次被借用或者修改。



### 动态字符串切片

- 切片（slice)
  - 一种引用数据结构
  - 允许你引用数据的一部分而不需要拷贝整个数据
  - 通常用于数组、字符串等集合类型。
- 字符串切片
  - 一种特殊的切片
  - 专用于处理字符串
  - 表示`&str`
  - 字符串切片提供了对字符串的引用，而不引入额外开销。
- 例子：

```rust
fn main() {
    let s: String = String::from("hello, hackquest.");

    // 起始从0开始， .. 代表一个或多个索引
    let slice1: &str = &s[0..2];
    // 默认也是从0开始
    let slice2: &str = &s[..2];

    let len: usize = s.len();
    // 包含最后一个字节，由于最后1个字节的索引为(len-1)，所以[4..len]的方式刚好包含了第(len-1)个字节
    let slice3: &str = &s[4..len];
    // 默认到最后1个字节
    let slice4: &str = &s[4..];

    // 获取整个字符串的切片
    let slice5: &str = &s[0..len];
    // 同上
    let slice6: &str = &s[..];
}
```

- 字符串包含汉字时，字符串切片注意
  - 字符串切片的索引位置是按照**字节**而不是**字符**。
  - 汉字使用 UTF-8 编码，一个汉字（字符）可能由**一个或多个字节**组成。一个汉字占3个字节。
  - 索引必须对应一个完整的汉字的边界，否则获取该汉字会失败。



### 字符串字面量

- 定义：在代码中直接写死的、由双引号包围的一系列字符，例如`"Hello, world!"`
- 硬编码到最终的程序二进制中，类型为`&str`
- 静态字符串切片
- 例子

```rust
// 字符串字面量，编译时已确定
let x: &str = "hello world";

// 动态字符串
let hello: String = String::from("hello world");
// 字符串切片，引用整个字符串
let y: &str = &hello[..];
// 字符串切片，引用部分字符串
let z: &str = &hello[0..3];
```

- 字符串字面量 VS 动态字符串切片
  - 相同点： 
    - 都是对字符串数据的引用，而不是实际的字符串本身
    - 都是UTF-8编码的字符串
    - 两者都可以使用一些相似的字符串操作，如切片、查找、比较等
  - 不同点：
    - 字符串字面量被硬编码到程序二进制文件中，因此整个程序运行期间有效。而字符串切片取决于引用它的变量或数据结构的生命周期。
    - 字符串字面量在编译时已知大小，是固定大小的；字符串切片在运行时确定大小，是动态大小的。



### 动态字符串操作

- 追加：修改原来的字符串，不是生成新的字符串
  - `push(str)`
  - ``push_str(str)` 
- 插入: 修改原来的字符串，需要指定索引位置，索引从0开始
  -  `insert(index, str)` 
  -  `insert_str(index, str)`
- 替换: 替换操作生成新的字符串
  - `replace(oldstr, newstr)` 
- 删除: 删除操作，修改原来的字符串，相当于弹出字符数组的最后一个字符
  - `pop()`

- 示例：

```rust
fn main() {
    let mut s = String::from("Hello ");

    // 追加字符串，修改原来的字符串，不是生成新的字符串
    s.push_str("rust");
    println!("追加字符串 push_str() -> {}", s);

    // 追加字符
    s.push('!');
    println!("追加字符 push() -> {}", s);

    // 插入字符，修改原来的字符串，需要指定索引位置，索引从0开始，
    // 如果越界则会发生错误
    s.insert(5, ',');
    println!("插入字符 insert() -> {}", s);

    // 插入字符串
    s.insert_str(6, " I like");
    println!("插入字符串 insert_str() -> {}", s);

    // replace 替换操作生成新的字符串。需要2个参数，第一个参数是
    // 要被替换的字符串，第二个参数是新的字符串
    let str_old = String::from("I like rust, rust, rust!");
    let str_new = str_old.replace("rust", "RUST");
    println!("原字符串长度为:{},内存地址:{:p}", str_old.len(), &str_old);
    println!("新字符串长度为:{},内存地址:{:p}", str_new.len(), &str_new);

    // pop 删除操作，修改原来的字符串，相当于弹出字符数组的最后一个字符
    // 返回值是删除的字符，Option类型，如果字符串为空，则返回None
    // 注意：pop是按照“字符”维度进行的，而不是“字节”
    let mut string_pop = String::from("删除操作，rust 中文!");
    // 此时删除的是末尾的感叹号“！”
    let p1 = string_pop.pop();
    println!("p1:{:?}", p1);
    // 在p1基础上删除末尾的“文”
    let p2 = string_pop.pop();
    println!("p2:{:?}", p2);
    // 此时剩余的字符串为“删除操作，rust 中”
    println!("string_pop:{:?}", string_pop);
}
```



### 元组

- 定义: 由多种类型元素组合到一起形成的组合。
- 复合类型，长度、顺序是固定的。
- 表示符号`()`
- 示例

```rust
fn main() {
    // 创建1个长度为4，多种不同元素类型的元组
    let tup: (i32, f64, u8, &str) = (100, 1.1, 1, "这是一个元组");
    
    // 解构tup变量，将其中第2个元素绑定给变量x
    let (_, x, ..) = tup;
    println!("The value of x is: {}", x);  //1.1

    // 使用.来访问指定索引处的元素
    let first = tup.0;
    let second = tup.1;
    let third = tup.2;
    let fourth = tup.3;
    println!("The value of first is: {}, second is: {}, third is: {}, fourth is: {}", first, second, third, fourth);

    let s = String::from("hello, hackquest.");
    // 函数返回值为元组类型
    let (s1, len) = calculate_length(s);
    println!("The length of '{}' is {}.", s1, len);
}

// len() 返回字符串的长度
fn calculate_length(s: String) -> (String, usize) {
    let length = s.len();

    (s, length)
}
```



### 结构体

- 定义：一种自定义数据类型，用于组织和存储不同类型的数据成员。
- 关键字`struct`
- 示例

```rust
// 标准的创建方式
fn build_car(color: String, year: String, price: f64) -> Car {
    Car {
        brand: String::from("Tesla"),
        color: color,
        year: year,
        is_new_energy: true,
        price: price,
    }
}

// 简化后的创建方式
fn build_car2(color: String, year: String, price: f64) -> Car {
    Car {
        brand: String::from("Tesla"),
        // 函数参数和结构体字段同名时，可以直接使用缩略的方式进行初始化
        color,
        year,
        is_new_energy: true,
        price,
    }
}

fn main() {
    // 声明 Car 类型变量（要求变量必须是 mut 类型）
    let mut car1 = build_car2(String::from("black"), String::from("2023-01-01"), 123.00);

    // 访问并修改结构体(通过 . 操作符访问)
    car1.color = String::from("white");
    println!("car1 {:?}", car1);

    // 根据已有的结构体实例，创建新的结构体实例
    let mut car2 = Car {
        color: String::from("greey"),
        // 其他字段从car1中取，..car1 必须在结构体的尾部使用
        ..car1
    };

    println!("car2 {:?}", car2);
}
```

- 元组结构体
  - 是什么? 结构提必须要有名称，但是结构体的字段可以没有名称，这种结构体长得像元组，被称为元组结构体。
  - 适用场景：坐标点、RGB颜色等



### 枚举

- 定义：一种用户自定义数据类型，也叫变体。
- 每个变体可以包含不同类型的数据。
- 示例

```rust
// 简单枚举
enum TrafficLight {
    Red,
    Yellow,
    Green,
}

// 包含值的枚举，不同成员可以持有不同的数据类型
enum TrafficLightWithTime {
  Red(u8),
  Yellow(char),
  Green(String),
}

fn main() {
    // 通过 :: 操作符来访问 TrafficLight 的成员
    let red = TrafficLight::Red;
    let yellow = TrafficLight::Yellow;

    // 包含时间的红绿灯
    let red_with_time = TrafficLightWithTime::Red(10);
    let yellow_with_time = TrafficLightWithTime::Yellow('3');
    let green_with_time = TrafficLightWithTime::Green(String::from("绿灯持续30秒"));
}
```

- Option枚举

  - 是什么？ Option枚举主要用于处理可能出现空值的情况，以避免使用空指针引起的运行时错误。
  - 示例

  ```rust
  // 它有两个枚举值，Some(T): 包含一个具体的值 T，以及None: 表示没有值。
  enum Option<T> {
  	None,
  	Some(T),
  }
  ```

  - Rust标准库`prelude`中，Option枚举是默认导入的。代码使用中无需显示使用Option前缀或通过`use`导入。

  

### 静态数组

- 数组定义：将多个**相同类型**的元素依次组合在一起，形成的集合。
  - 静态数组`array`：直接分配在**栈内存**中，**速度很快长度固定**
  - 动态数组`Vector`: 分配在**堆内存**中，可**动态增长且有性能损耗**
- 元组与数组的区别：元组是不同类型元素的集合，数组是相同类型元素的集合
- 示例

```rust
fn main() {
    // array = [类型; 长度] 这种语法对于i32、f64、bool等基础类型是OK的
    let a = [3u8; 5]; // a = [3, 3, 3, 3, 3]

    // 但是对于String这类非基础类型，需要用如下方式，因为基础类型数据是在栈内存，可以直接拷贝，
    // 而非基础类型的数据是在堆内存，需要深拷贝。
    let b: [String; 3] = std::array::from_fn(|_i| String::from("rust")); // b = ["rust","rust","rust"]

    let c = [9, 8, 7, 6, 5];
    // 通过下标直接访问
    let first = c[0]; // first = 9
    let second = c[1]; // second = 8

    // 访问不存在的元素，编译器会直接识别到并给出错误提示
    // let none_element = c[100];

    // arrays是一个二维数组，其中每一个元素都是一个数组，元素类型是[u8; 5]
		// arrays = [[3, 3, 3, 3, 3],[9, 8, 7, 6, 5]]
    let arrays: [[u8; 5]; 2] = [a, c];
}
```



### 动态数组

- 定义：一种灵活的数据结构，允许在运行时动态改变大小。
- 表示符号`Vec<T>`
- 长度可变，可存储“任何类型”的元素。
- 声明示例

```rust
// 1.显式声明动态数组类型
let v1: Vec<i32> = Vec::new();

// 2.编译器根据元素自动推断类型，须将 v 声明为 mut 后，才能进行修改。
let mut v2 = Vec::new();
v2.push(1);

// 3.使用宏 vec! 来创建数组，支持在创建时就给予初始化值
let v3 = vec![1, 2, 3];

// 4.使用 [初始值;长度] 来创建数组，默认值为 0，初始长度为 3
let v4 = vec![0; 3];  // v4 = [0, 0, 0];

// 5.使用from语法创建数组
let v5 = Vec::from([0, 0, 0]);
assert_eq!(v4, v5);
```

- 操作示例

```rust
fn main() {
    let mut v1 = vec![1, 2, 3, 4, 5];

    // 通过 [索引] 直接访问指定位置的元素
    let third: &i32 = &v1[2];
    println!("第三个元素是 {}", third);

    // 通过 .get() 方法访问，防止下标越界
    // match属于模式匹配，后续章节会有详细介绍
    match v1.get(2) {
        Some(third) => println!("第三个元素是 {third}"),
        None => println!("指定的元素不存在"),
    }

    // 迭代访问并修改元素
    for i in &mut v1 {
        // 这里 i 是数组 v 中元素的可变引用，通过 *i 解引用获取到值，并 + 10
        *i += 10
    }
    println!("v1 = {:?}", v1);    // v1 = [11, 12, 13, 14, 15]

    let mut v2: Vec<i32> = vec![1, 2];
    assert!(!v2.is_empty()); // 检查 v2 是否为空
    v2.insert(2, 3); // 在指定索引插入数据，索引值不能大于 v 的长度， v2: [1, 2, 3]
    assert_eq!(v2.remove(1), 2); // 移除指定位置的元素并返回, v2: [1, 3]
    assert_eq!(v2.pop(), Some(3)); // 删除并返回 v 尾部的元素，v2: [1]
    v2.clear(); // 清空 v2, v2: []
}
```


### HashMap集合

- 定义：一种集合理性，用于存储键值对（key-value)。
- `key`必须唯一。
- Hashmap的高效性来自于它的散列函数，这个函数能够将键转换成存储位置的索引，从而直接访问内存中的位置。
- 声明示例：

```rust
// 由于 HashMap 并没有包含在 Rust 的 prelude 库中，所以需要手动引入
use std::collections::HashMap;
fn main() {
    // 创建一个HashMap，用于存储学生成绩
    let mut student_grades = HashMap::new();
    student_grades.insert("Alice", 100);
    
    // 创建指定大小的 HashMap，避免频繁的内存分配和拷贝，提升性能。
    let mut student_grades2 = HashMap::with_capacity(3);
    student_grades2.insert("Alice", 100);
    student_grades2.insert("Bob", 99);
    student_grades2.insert("Eve", 59);
}
```

- 使用示例

```rust
use std::collections::HashMap;
fn main() {
    // 动态数组，类型为元组 (用户，余额)
    let user_list: Vec<(&str, i32)> = vec![
        ("Alice", 10000),
        ("Bob", 1000),
        ("Eve", 100),
        ("Mallory", 10),
    ];

    // 使用迭代器和 collect 方法把数组转为 HashMap
    let mut user_map: HashMap<&str, i32> = user_list.into_iter().collect();
    println!("{:?}", user_map);

    // 通过 hashmap[key] 获取对应的value
    let alice_balance = user_map["Alice"];
    println!("{:?}", alice_balance);

    // 通过 hashmap.get(key) 获取对应的value，返回值为 Option 枚举类型
    let alice_balance: Option<&i32> = user_map.get("Alice");
    println!("{:?}", alice_balance);

    // 不存在的key，返回值为 None，但不会报错
    let trent_balance: Option<&i32> = user_map.get("Trent");
    println!("{:?}", trent_balance);

    // 覆盖已有的值，insert 操作 返回旧值
    let old = user_map.insert("Alice", 20000);
    assert_eq!(old, Some(10000));

    // or_insert 如果存在则返回旧值的引用；如果不存在，则插入默认值，并返回其引用
    let v = user_map.entry("Trent").or_insert(1);
    assert_eq!(*v, 1); // 不存在，插入1

    // 验证Trent对应的值
    let v = user_map.entry("Trent").or_insert(2);
    assert_eq!(*v, 1); // 已经存在，因此2没有插入
}
```

