---
title: Rust基础学习-后章
published: 2025-05-30
description: ''
image: ''
tags: ['Web3', 'Rust']
category: 'Rust'
draft: false 
lang: ''
---

Rust基础学习，学习了解模式匹配、Trait等概念及项目结构。

### 流程控制

- 常见控制语句`if`，`for`，`while`，`loop`
- 示例

```rust
fn main() {
    let condition = true;
    // if else 语法
    if condition {
        // do something
    } else {
        // do something else
    }

    // for循环
    for i in 1..=5 {
        println!("{}", i);
    }

    // while循环
    let mut m = 1;
    while m <= 5  {
        println!("{}!", m);
        m = m + 1;
    }

    // loop 循环
    let mut n = 1;
    loop {
        println!("{}!!", n);
        n = n + 1;
        if n > 5 {
            break;
        }
    }
}
```



### 模式匹配

- 定义：模式匹配允许我们将一个`target`值与一系列的**模式**像比较，并根据相匹配的模式执行对应的表达式。
- 常见模式匹配： `match` 和 `if let`
- `match`的匹配必须要**穷举出所有可能**， 用`_`代替未罗列出的所有可能性。
- 示例：

```rust
match target {
    模式1 => 表达式1,
    模式2 => {
        语句1;
        语句2;
        表达式2
    },
    _ => 表达式3
}
```

- 示例：`match`模式匹配：模式绑定、复制、解构用法; `if let`的简单匹配用法

```rust
enum Shape {
    Circle(f64),
    Rectangle(f64, f64),
    Square(f64),
}

fn calculate_area(shape: &Shape) -> f64 {
    match shape {
        // 从匹配的模式中取出绑定的值，如radiux、width、side        
        Shape::Circle(radius) => std::f64::consts::PI * radius * radius,
        Shape::Rectangle(width, height) => width * height,
        Shape::Square(side) => side * side,
    }
}
struct Point {
    x: i32,
    y: i32,
}

fn process_point(point: Point) {
    match point {
        Point { x: 0, y: 0 } => println!("坐标在原点"),
        Point { x, y } => println!("坐标在 ({}, {})", x, y),
    }
}

fn main() {
    let circle = Shape::Circle(3.0);
    let rectangle = Shape::Rectangle(4.0, 5.0);
    let square = Shape::Square(2.0);

    // 1、调用函数，输出各形状的面积
    println!("圆形的面积：{}", calculate_area(&circle));
    println!("矩形的面积：{}", calculate_area(&rectangle));
    println!("正方形的面积：{}", calculate_area(&square));

    // 2、match 模式匹配进行赋值
    let area = match circle {
        Shape::Circle(radius) => std::f64::consts::PI * radius * radius,
        Shape::Rectangle(width, height) => width * height,
        Shape::Square(side) => side * side,
    };
    println!("圆形的面积：{}", area);

    // 3、解构结构体
    let point1 = Point { x: 0, y: 0 };
    let point2 = Point { x: 3, y: 7 };
    process_point(point1);
    process_point(point2);

		// 4、if let简单匹配
    let some_u8_value = Some(3u8);
    match some_u8_value {
        Some(3) => println!("three"),
        // 这里还要考虑除 3 以外的其他值，以及None值
        _ => (),
    }
    
    // 只匹配数值 3 即可
    if let Some(3) = some_u8_value {
        println!("three");
    }
}
```



### 方法

- 定义：与结构体`structs`或枚举`enums`或特征对象`trait`等特定类型相关联的函数，它们允许你在这些类型上定义行为，并且支持像调用普通函数一样调用该行为。
- 表达关键字`fn`
- 示例

```rust
// 结构体定义
struct Rectangle {
    width: u32,
    height: u32,
}

// impl Rectangle {} 表示为 Rectangle 实现方法(impl 是实现 implementation 的缩写) 
impl Rectangle {
    // area方法的第一个参数为 &self，代表结构体实例本身
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

fn main() {
    let rect1 = Rectangle { width: 30, height: 50 };

    println!(
        "The area of the rectangle is {} square pixels.",
        // 这里调用结构体的area方法
        rect1.area()
    );
}
```

- 方法 VS 函数
  - 方法：与特定的类型（结构体、枚举、trait等）关联；在类型的impl块内定义，使用self参数来表示调用该方法的实例；使用点运算符来调用，类似于面向对象语言中的对象方法。
  - 函数：与特定类型无关，是独立存在的；可在任何地方定义，没有self参数，因为它们不与特定实例相关；直接通过函数名调用。
- 枚举中方法定义和使用，跟结构体类似



### 泛型

- 定义：一种强大的编程特性，允许编写可重用、通用的代码，而不必针对特定的数据类型进行硬编码。
- 核心思想：参数化类型。通过在定义时使用占位符来表示数据类型。
- 示例

```rust
// 1.结构体中使用泛型，所有成员的类型都为 T
struct Point1<T> {
    x: T,
    y: T,
}

// 2.结构体中使用泛型，成员可以拥有不同类型
struct Point2<T,U> {
    x: T,
    y: U,
}

// 3.枚举中使用泛型，Option枚举返回一个任意类型的值 Some(T)，或者没有值 None
enum Option<T> {
    Some(T),
    None,
}

// 4.方法中使用泛型，我们为结构体 Point1<T> 实现了方法 get_x，用于返回 x 成员的值
impl<T> Point1<T> {
    fn get_x(&self) -> &T {
        &self.x
    }
}

fn main() {
    // 1.结构体中使用泛型
    let int_point = Point1 { x: 5, y: 10 };
    let float_point = Point1 { x: 1.0, y: 4.0 };

    // 2.结构体中使用泛型
    let p = Point2{x: 1, y :1.1};

    // 3.枚举中使用泛型
    let option1 = Option::Some(1_i32);
    let option2 = Option::Some(1.00_f64);

    // 4.方法中使用泛型
    let x = int_point.get_x();
}
```





### Trait特征

- 定义：一种将方法签名组合起来的机制，目的是构建一个实现某些目的所必需的行为的集合。定义类型的共享行为并实现代码的抽象。
- 示例：

```rust
// trait 关键字 + MigrateBird 特征名
trait MigrateBird {
    // 定义该特征的方法，参数必须包含&self，因为它是该类型上的行为
    fn migrate(&self) -> String;
}

// 定义大雁结构体
struct WildGoose {
     color : String,
}

// 为 wild_goose 类型实现 migrate_bird 特征
impl MigrateBird for WildGoose {
     fn migrate(&self) -> String {
         "Geese fly in a V-shaped formation".to_string()
     }
}
```

- Trait特征的默认实现

  - Trait 是共享的行为，所以我们可以给它赋予默认行为，而类型在必要的时候进行覆盖，否则就使用默认的行为。
  - 示例

  ```rust
  // 定义特征，并赋予默认实现 default_migrate
  trait MigrateBird {
      fn default_migrate(&self) {
          println!("i am flying to the warm south");
      }
  }
  
  struct Swallow {
      color : String,
  }
  
  // 这里直接使用默认的实现
  impl MigrateBird for Swallow {}
  
  fn main() {
      let small_swallow = Swallow {
          color : String::from("black")
      };
      small_swallow.default_migrate();
  }
  ```



### 泛型和Trait

- 泛型单态化： 一种编译优化技术，它通过填充编译时使用的具体类型，将通过代码转换为特定代码。
- 单态化过程正是 Rust 泛型在运行时极其高效的原因。
- 示例

```rust
// 重新实例化为 i32类型的函数
fn largest_for_i32(list: &[i32]) -> i32 {
    let mut largest = list[0];
    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}

// 重新实例化为 i64 类型的函数
fn largest_for_i64(list: &[i64]) -> i64 {
    let mut largest = list[0];
    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

- 特征约束（Trait bound)

  - 定义：参数的泛型类型限制为Trait类型的。
  - 示例：

  ```rust
  // trait特征
  trait MigrateBird {
      fn migrate(&self) -> String;
  }
  
  // 为大雁实现 Trait特性的 migrate 方法
  impl MigrateBird for WildGoose {
      fn migrate(&self) -> String {
          "Geese fly in a V-shaped formation".to_string()
      }
  }
  
  // 为燕子实现 Trait特性的 migrate 方法
  impl MigrateBird for Swallow {
      fn migrate(&self) -> String {
          "swallow fly fast, but have to rest frequently".to_string()
      }
  }
  
  // 泛型类型限制为MigrateBird
  fn fly<T: MigrateBird>(item: T) {
  		println!("i am flying to the warm south");
  }
  ```



### Trait的关联类型

- 在Rust中，关联类型允许我们在trait中使用类型参数`type`, 该类型可以在实现trait的时候具体化。
- 通过关联类型，我们可以在 trait 中使用抽象的类型，而在实现 trait 时再具体指定这些类型。
- 示例：

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
}

impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        // --snip--
    }
}
```

- 关联类型 VS  泛型参数
  - 在 trait 中使用泛型参数，可以实现与关联类型类似的灵活性。
  - 关联类型相对于泛型参数相比，**语法更简洁**
  - 使用关联类型时，不需要在每个 impl 语句中指定具体的类型参数。
  - 泛型参数更适用于**函数**中，当函数需要适用于多个不同类型时，使用泛型参数可以提供更大的灵活性。
  - **关联类型**更适合**与 trait 相关的类型抽象**



### 悬垂引用

- 定义：尝试使用离开作用域的值的引用。
- 引用值本身超出其作用域后，就会被 Rust 内存管理器释放掉（drop），此时如果还尝试使用该引用，就会发生悬垂引用，引发错误。
- 示例

```rust
{
    let r;
    {
        let x = 5;
        // 引用值
        r = &x;
    }
    // 变量x释放，r的引用值不存在。
    println!("r: {}", r);
}
```

- 借用检测器：比较作用域来确保所有的借用都是有效的。



### 生命周期

- Rust中每一个引用都有其生命周期，即引用保持有效的作用域。
- 生命周期标注：只是描述多个引用生命周期相互的关系，便于编译器进行引用的分析，不影响生命周期。目的是避免悬垂引用。
- 生命周期标注语法：
  - 生命周期参数名称必须以撇号`'`开头，其名称全是小写。
  - 生命周期参数标注位于引用的`&`之后，并有一个空格来将引用类型与生命周期标注分开
- 示例

```rust
// 'a: 生命周期标注
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

- longest函数处理不同生命周期的引用
  - longest 函数返回值的生命周期是传入参数中较小的那个变量的生命周期。



### 错误处理

- 分类：不可恢复错误panic 和 可恢复错误Result
- `Panic`： 
  - 一种非正常的程序终止，通常表示发生了无法恢复的错误，例如数组越界、除零等。
  - `panic!`宏函数显示触发
  - panic发生时，程序会打印错误信息，并在栈展开过程中清理资源，最终退出程序。
- `Result`: 
  - 一种更为正常和可控的错误处理方式，例如文件操作、网络请求等可能发生错误的场景。
  - `Result<T, E>`: 返回类型，T是成功时的返回类型，E是错误是返回的类型。
- 示例

```rust
/*
 * Result的定义如下，
 * 
 * enum Result<T, E> {
 *    Ok(T),
 *	  Err(E),
 * }
 */

// 两数相除
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(String::from("Cannot divide by zero!"))
    } else {
        Ok(a / b)
    }
}

// 不可恢复错误
fn main1() {
    // 人为制造一个 panic 的场景，程序运行到此处会中断，不再往下执行
    panic!("This is a panic situation!");
}

// 可恢复错误，使用 Result 类型来处理潜在的错误
fn main2() {
	
    // divide(1, 0) 返回值为 Result 类型，这里通过 match 进行模式匹配，分别处理成功和失败这2种情况
    match divide(1, 0) {
        Ok(result) => println!("Result: {}", result),
        Err(err) => println!("Error: {}", err),
    }
}
```



### 宏（Macro)

- 一种元编程的工具，使得开发者能够编写能够生成代码的代码，从而提高代码的灵活性和重用性。
- 声明式宏：
  - 允许开发者使用宏规则创建模式匹配和替换规则，根据匹配到的模式进行代码替换。
  - 一种基于文本的宏，仅仅是简单的文本替换，并没有对语法树进行操作。
- 过程宏：
  - 允许开发者在代码生成阶段使用Rust代码来处理输入并生成输出。
  - 过程宏有三种主要类型：派生宏、属性式宏、函数式宏
  - 过程宏允许编译期间生成和操作AST。
- 示例

```rust
// 日志打印宏 println!
println!("hello, micro");

// 动态数组创建宏 vec!
let _dyc_arr = vec![1, 2, 3];

// 断言宏 assert!，判断条件是否满足
let x = 1;
let y = 2;
assert!(x + y == 3, "x + y should equal 3");

// 格式化字符串的宏 format!
let name = "world";
let _message = format!("Hello, {}!", name);
```

- 宏 VS 函数
  - 同：宏和函数都是用于代码重用的工具
  - 异：
    - 宏是一种**编译时**工具，函数是一种**运行时**工具
    - 宏可以接受任意数量和类型的参数，并且可以在编译时生成任意类型的代码。
    - 宏还可以使用Rust的元编程功能。
    - 宏可以在编译时进行更多的优化和检查，从而提高程序的性能和安全性。





### 声明式宏

- 采用了类似`match`的机制（见4.2节模式匹配），允许开发者使用宏规则`macro_rules!`创建**模式匹配和替换规则，根据匹配到的模式进行代码替换**
- 关键字`macro_rules!`
- 示例

```rust
// 宏的定义
macro_rules! add {
		// 匹配 2 个参数，如add!(1,2), add!(2,3)
    ($a:expr,$b:expr) => {
        // macro 宏展开的代码
        {
            // 表达式相加
            $a + $b
        }
    };

		// 匹配 1 个参数，如 add!(1), add!(2)
    ($a:expr) => {{
        $a
    }};
}

fn main() {
		let x = 0;
    // 宏的使用
    add!(1, 2);
    add!(x);
}

// 宏展开的代码如下
fn main() {
	{
		1 + 2
	}
}
```

- 宏中的Token概念

  - Token是Rust代码的最小单元，是源代码中的一个元素，代表了语法的一部分。
  - Token可以是关键字、标识符、运算符、符号等。

  ```rust
  macro_rules! add {
  	  // 以$开头，:后表示该参数的类型，参数类型通常被称为Token
      ($a:expr,$b:expr) => {{
          $a + $b
      }};
  }
  ```

  - 常见Token类型
    - 表达式`expr`:  例如`x+y`、`if condition {ture} else {false}`等
    - 语句`stmt`：例如`let x = 1;` 、`println!('Hello, world!')`等
    - 类型`ty`： `i32`、`bool`、`String`等
    - 标识符`ident`: 例如变量名、函数名、结构体名等
    - 通用Token`tt`: 可以用于匹配和生成任意类型的Token。





**过程宏-派生宏**

- 通常用于为`struct`、`enum`、`union`实现`Trait`特征。使用时通过`#[derive(CustomMacro)]`这样的语法，允许用户轻松地为自定义类型提供一些通用的实现。
- 过程宏的工作方式：**使用 Rust 的源代码作为输入参数，基于代码进行一系列操作后，再输出一段全新的代码。**
- 示例

```rust
struct Foo { x: i32, y: i32 }

// 方式一
impl Copy for Foo { ... }
impl Clone for Foo { ... }
impl Ord for Foo { ... }
impl PartialOrd for Foo { ... }
impl Eq for Foo { ... }
impl PartialEq for Foo { ... }
impl Debug for Foo { ... }
impl Hash for Foo { ... }

// 方式二
#[derive(Copy, Clone, Ord, PartialOrd, Eq, PartialEq, Debug, Hash, Default)]
struct Foo { x: i32, y: i32 }
```



### 过程宏-属性式宏&函数式宏

- 属性式宏：定义了可添加到标记对象的新外部属性。通过`#[attr]` 或`#[attr(...)]` 方式调用，其中`...`是标记具体属性（可选）
  - 属性式宏有两个输入参数。
- 示例: 

```rust
use proc_macro::TokenStream;

// 这里标记宏的类型
// input: 属性名称后面的带分隔符的标记项。
// annotated_item: 标记的代码项本身的 Token 流，它可以是被标记的字段、结构体、函数等
#[proc_macro_attribute]
pub fn custom_attribute(input: TokenStream, annotated_item: TokenStream) -> TokenStream {
    annotated_item
}

// 常见属性式宏
// 1、用于根据条件选择性地包含或排除代码
#[cfg(feature = "some_feature")]
fn conditional_function() {
    // 仅在特定特性启用时才编译此函数
}

// 2、用于标记测试函数的属性宏
#[test]
fn my_test() {
    // 测试函数
}

// 3、用于控制编译器的警告级别
#[allow(unused_variables)]
fn unused_variable() {
    // 允许未使用的变量
}
```

- 函数式宏
  - 函数式宏采用`proc_macro!`关键字定义，通过`custom_fn_macro!(…)`的方式来调用。
  - 函数宏则更像是常规的函数调用，可以使用各种 Rust 语法，包括条件语句、循环、模式匹配等，使得它更加灵活和强大。
- 示例：

```rust
// vec! 用于创建Vec的宏。
let my_vector = vec![1, 2, 3];

// println! 和 format! 用于格式化字符串的宏。
let name = "World";
println!("Hello, {}!", name);

let formatted_string = format!("Hello, {}!", name);

// assert! 和 assert_eq! 用于编写断言的宏。
assert!(true);
assert_eq!(2 + 2, 4);


// panic! 用于在程序中引发Panic异常的宏。
panic!("Something went wrong!");

// env! 用于在编译时获取环境变量的宏。
let current_user = env!("USER");
println!("Current user: {}", current_user);


// declare_id! 是 anchor 框架中用于声明程序ID的宏
declare_id!("3Vg9yrVTKRjKL9QaBWsZq4w7UsePHAttuZDbrZK3G5pf");
```



### 项目结构

- ` module` : 用于组织和封装代码的单元。关键字`mod`创建模块，并且模块可以嵌套形成模块树。
- `crate`: 编译单元，可以是库crate 或 二进制crate。 一个crate可以包含一个或多个模块
- `package`: 一个包含一个或多个相关crate的项目工程。
  - `Cargo.toml`: 包含有关项目的元信息、依赖关系以及其他配置选项。
- 库Crate
  - 通过`cargo new --lib 库名`创建
  - 构建库：目的是提供可供其他程序引用的功能性代码。
  - 代码通常是一些通用的、可复用的功能。
  - 组织方式
    - 一个库crate的代码通常位于一个名为`lib.rs`文件中，包含crate的主模块。
    - 库crate的代码可以由其他crate引用，通过在`Cargo.toml`文件中添加相关依赖。

- 二进制Crate
  - 通过`cargo new 项目名`创建
  - 可执行程序：目的是构建可执行的程序
  - 可以包含多个模块，其中一个模块被指定为主入口点，例如`main.rs`
  - 组织方式
    - 一个二进制crate的代码通常包含在一个名为`main.rs`的文件中，该文件包含程序的主函数`main()`

- 库crate和二进制crate可以在Rust项目中同时使用。
