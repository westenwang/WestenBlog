---
title: Next.js框架学习系列之一
published: 2025-05-09
description: ''
image: ''
tags: ['Next.js']
category: 'React'
draft: false 
lang: ''
---

Next.js框架学习系列，从0到1了解基础概念及知识。

### Learn NextJS

**Chapter 1**

- 文件结构
  - `/app` 包含所有路由、组件和应用程序逻辑
  - `/app/lib` 包含您应用程序中使用的函数
  - `/app/ui`: 包含您应用程序的所有UI组件
  - `/public` 包含您应用程序的所有静态资源
  - `config files`: next.config.ts的配置文件

**Chapter 2 CSS Styling**

- Global Styles
  - global.css
- Tailwind CSS框架，允许您直接在React代码中快速编写实用类来加速开发过程。
- CSS Modules, 允许您通过自动创建唯一的类名来将CSS作用域限定到组件，无需担心样式冲突

- Tailwind 和 CSS 模块是 Next.js 应用程序中最常见的两种样式化方式.
- `clsx` 轻松切换类名的库
- 其他样式解决方案：
  - Sass允许您导入.css和.scss文件
  - CSS-in-JS库，如styled-jsx、styled-components和emotion

**Chapter 3 Optimizing Fonts and Images**

- 累积布局偏移是谷歌用来评估网站性能和用户体验的指标。
- `next/font` nextjs会自动优化应用程序中的字帖。
- 添加主字体
  - `/app/ui`创建`fonts.ts`管理新字体
- 添加次要字体
- `next/image`优化图像
- 图片优化文档
  - 大小优化：为每个设备自动提供正确尺寸的图片，使用现代图片格式
  - 图像稳定性：当图像加载时自动防止布局偏移
  - 加速页面加载：仅当图像进入视口时加载图像，使用原生浏览器懒加载。
  - 资产灵活性：按需调整图像大小

**Chapter 4 Creating Layouts and Pages**

- 嵌套路由

**Chater 5 Navigating Between Pages**

- `next/link`
- `usePathname()`
- 为了改善导航体验，Next.js 会自动按路由段拆分您的应用程序。
- 在生产环境中，每当 `<Link>`元件出现在浏览器的视口中时，Next.js 都会在后台**自动预取**链接路由的代码

**Chapter 6 Setting Up Your Database**

- 安装创建postgresql数据库

```
// 安装
brew install postgresql
// 检查是否安装成功
brew list postgresql
// 初始化
 initdb /usr/local/var/postgres
// 启动服务
brew services start postgresql
// 连接数据库
psql postgres
// 创建数据库
CREATE DATABASE "nextjs-dashboard-postgres";
// 修改用户密码
ALTER USER wangshiquan PASSWORD 'yourpassword';
// 连接数据库测试
psql -h localhost -U wangshiquan -d nextjs-dashboard-postgres
// 查看所有用户角色
psql -l

```



- `.env.local` 配置数据库连接信息
- 将运行种子脚本以使用初始数据集填充数据库，该脚本使用 **SQL** 创建表，并使用 `placeholder-data.ts` 文件中的数据在创建表后填充表。成功创建后`Database seeded successfully`

**Chapter 7 Fetching Data**

- API Layer: 
  - 使用提供API的三方服务
  - 从客户端获取数据，服务器运行API层
- 数据库查询
  - 创建API终端节点，需要编写逻辑与数据库交互
  - 在服务器上获取数据，跳过API层直接查询数据
- Server Components
  - 服务器组件支持JavaScript Promises，为异步任务提供解决方案
  - 服务器组件在服务器上运行，将数据获取和逻辑保留在服务器上
  - 服务器组件运行在服务器上，可以跳过API直接查询数据库
- 请求瀑布流
  - 希望在发出下一个请求之前满足条件。接口有依赖关系，需要依赖上一个接口的数据。
- 并行数据获取
  - Promise.all() 或 Promise.allSettled() 同时启动所有Promise。



**Chapter 8 Static and Dynamic Rendering**

- 静态渲染：数据获取和渲染**在构建时（部署时）**或**重新验证数据时**， **在服务器上**进行。
  - 更快的网站。
  - 减少服务器负载。
  - SEO，对搜索引擎友好。
  - 静态渲染对于**没有数据**或**用户之间共享的**UI非常有用。例如静态博客文章或产品页面。
- 动态渲染： 在**请求时**为每个用户渲染服务器上的内容。
  - 实时数据： 允许应用程序显示实时数据或经常更新数据。
  - 特定于用户的内容：提供个性化内容，根据用户交互更新数据。
  - 请求时间信息： 允许访问只能在请求时知道信息，如Cookie 或 URL 搜索参数。
  - 使用动态渲染时， **应用程序的速度仅与最慢的数据获取速度一样快**



**Chapter 9 Streaming**

- 流式传输： 一种数据传输技术，允许您将路由分解为更小的“块”，并在它们准备就绪时逐步将它们从服务器流式传输到客户端。
- 通过流式传输，您可以防止慢速数据请求阻塞整个页面。
- Next.js中，两种流失处理
  - 页面级别，使用`loading.tsx`文件创建`<Suspense>`
  - 组件级别，使用`<Suspense>`进行更精细控制。
- Streaming a Component
  - Suspense 允许你推迟渲染应用程序的某些部分，直到满足某些条件（例如，加载数据）
  - 决定`Suspense`边界放置位置取决于：
    - 希望用户页面流式传输时如何体验页面
    - 要优先考虑的内容
    - 组件依赖于数据获取
    - 放置 Suspense 边界的位置会因您的应用程序而异。一般来说，最好将你的数据获取向下移动到需要它的组件，然后将这些组件包装在 Suspense 中。

**Chapter 10 Partial Prerendering**

- 安装`pnpm install next@canary`
- 静态路由与动态路由
  - Next.js装那个，如果在路由中调用动态函数，则整个路由将变为动态。
  - 静态路由：组件不依赖于数据，也不针对用户进行个性化设置。
  - 动态路由：组件依赖于经常更改的数据，并且会针对用户进行个性化设置。
- 部分渲染
  - 定义：允许您在同一路由中结合静态和动态渲染的优势。
  - 漏洞是动态内容在请求时异步加载的位置。
- 部分预渲染工作原理
  - 原理：部分预渲染使用React的`Suspense`来推迟渲染应用程序的某些部分，直到满足某些条件（例如，数据被加载）。
- 实现部分预渲染
  - `next.config.ts`中添加启用`ppr`。`experimental: {ppr: 'incremental'}`
  - incremental: 允许为特定路由采用PPR



**Chapter 11 Adding Search and Pagination**

- 使用URL搜索参数的好处
  - 可添加数钱和可共享URL
  - 服务端渲染
  - 分析和跟踪
- 实现搜索功能
  - `useSearchParams`: 允许访问当前URL的参数。例如, URL `/dashboard/invoices?page=1&query=pending`的搜索参数将得到： `{page： '1'， query： 'pending'}`
  - `usePathname`: 允许读取当前URL的路径名。例如，对于路由 `/dashboard/invoices，usePathname` 将返回 `'/dashboard/invoices'`
  - `useRouter`: 编程方式在客户端组件的路由之间启用导航。
- 安装`use-debounce`, 处理防抖



**Chapter 12 Mutating Data**

- React Server Actions: React Server Actions 允许你直接在服务器上运行异步代码。Server Actions 的用武之地。它们包括加密闭包、严格输入检查、错误消息哈希、主机限制等功能，所有这些功能共同作用，可显著提高应用程序的安全性。
- 使用React Server Actions改变数据
  - 与表单结合使用
  - 当通过 Server Action 提交表单时，您不仅可以使用该作来更改数据，还可以使用 `revalidatePath` 和 `revalidateTag` 等 API 重新验证关联的缓存。
- 使用表单和Server Components



**Chapter 13 Handing Errors**

- try catch
- error错误页面处理
- next/navigation的notFound()



**Chapter 14 Improving Accessibility**

- 辅助功能：指设计和实现每个人都可以使用的Web应用程序，包括残障人士。涵盖许多领域，例如键盘导航、语义HTML、图像、颜色、视频等。参考[Learn Acessibility](https://web.dev/learn/accessibility/)
- 使用插件：`eslint-plugin-jsx-a11y`, 帮助检查发现项目问题。terminal运行`pnpm lint`检查
- 改进表单中的辅助功能
  - 语义HTML：使用语义元素(`<input>`、`<option>`等)而不是`<div>`.
  - 标签：包括`<label>`和`htmlFor`属性可确保每个表单都有一个描述性文本标签。
  - 焦点轮廓
- 表单验证
- 客户端验证
- 服务端验证
- 添加Aria标签



**Chapter 15 Adding Authentication**

- 身份认证和授权：身份验证会验证您的身份，而授权会确定您可以访问的内容。
- NextAuth.js添加身份验证
  - `openssl rand -base64 32`生成测试密钥，添加到`.env`的`AUTH_SECRET`
  - 根目录创建`auth.config.ts`
  - 使用Next.js中间件保护路由，根目录创建`middleware.ts`
  - 密码哈希处理，创建`auth.ts`, 添加凭证
  - 实现登录功能
  - 实现注销功能



**Chapter 16 Adding MetaData**

- 元数据：提供有关网页的其他详细信息，对访问的用户不可见。

- 元数据在增强SEO方面发挥着重要作用，使其更易于搜索引擎和社交媒体平台访问和理解。

  - 标题元数据`<title></title>`
  - 描述元数据`<meta name="description" content="A brief description of the page content." />`
  - 关键字元数据`<meta name="keywords" content="keyword1, keyword2, keyword3" />`
  - 开放图元数据

  ```
  <meta property="og:title" content="Title Here" />
  <meta property="og:description" content="Description Here" />
  <meta property="og:image" content="image_url_here" />
  ```

  - 网站图标元数据`<link rel="icon" href="path/to/favicon.ico" />`

- Next.js提供两种方法添加元数据
  - 基于配置: 导出静态元数据对象或动态generateMetadata函数到layout.js或page.js文件中
  - 基于文件
    - `favicon.ico`、`apple-icon.jpg` 和 `icon.jpg`：用于网站图标和图标
    - `opengraph-image.jpg` 和 `twitter-image.jpg`：用于社交媒体图像
    - `robots.txt`：提供搜索引擎爬网的说明
    - `sitemap.xml`：提供有关网站结构的信息


【参考链接】[Learn Next.js](https://nextjs.org/learn/dashboard-app)

【DEMO下载】[dashboard-app](https://github.com/westenwang/nextjs-dashboard)

