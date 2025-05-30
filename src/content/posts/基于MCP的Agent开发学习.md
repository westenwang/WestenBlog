---
title: 基于MCP的Agent开发学习
published: 2025-05-22
description: ''
image: ''
tags: ['MCP', 'Agent']
category: 'AI'
draft: false 
lang: ''
---
## Task1

MCP的应用价值

- 金融：智能投顾系统开发
- 教育：智能教学工具开发

**学技术最好的方式 =** 
**选感兴趣、有前景的方向+做项目**

| **数字员工能力** | **技术要素**  | **技术价值** | **业务价值**                                    |
| ---------------- | ------------- | ------------ | ----------------------------------------------- |
| **拆任务**       | **AI 大模型** | 智能决策中枢 | 任务拆解与流程控制                              |
| **会学习**       | **RAG**       | 知识检索增强 | 获得正确的、可动态补充/更新的企业知识，精准决策 |
| **调资源**       | **MCP/Tools** | 业务系统连接 | 功能快速封装、对接调用                          |

- **RAG**负责让AI随时检索到对的资料
- **MCP**让AI能操作真实系统



Agent落地痛点

| 不知道公司的知识库内容          | 大模型存在知识滞后性、只认识训练过的知识     |
| ------------------------------- | -------------------------------------------- |
| 无法访问 CRM 工具或项目管理系统 | 没有真正融入企业业务工作流、数据权限管理较难 |
| 每次问都要重新提供上下文        | 对话之间没有共享记忆，上下文有限、记忆有限   |



- **学 MCP = 学让AI “学会做事”**

MCP模型上下文协议（Model Context Protocol）是一个开源协议，由Anthropic（Claude开发公司）开发，类似AI应用的通用接口，连接如文件、数据库、API等接口，帮助开发者构建更灵活、更具上下文感知能力的AI应用。

### 剩余Token额度查看

https://help.aliyun.com/zh/model-studio/new-free-quota#ae73d86c7f2ub

- **手动暂停调用**：在[阿里云百炼控制台](https://bailian.console.aliyun.com/#/home)中，您可以主动停止对模型的调用。例如，通过关闭相关的API服务或暂停应用程序对模型的请求。



通义千问-Plus-Latest

MCP

### 构建Agent智能体应用

- 创建智能体：
  - 应用名称：GoodStudy - English (好好学习 - 英语)
- 设置模型、配置MCP服务
  - 通义千问-Plus-Latest 128K ： 该模型支持128Ktokens上下文，为了保证正常的使用和输出，请合理控制Prompt、测试窗中的内容字数。
  - 选择MCP服务：Wanx文生图、联网搜索
- 设置提示词

## Task2.1  做好应用设计


### 做什么，怎么做，动手做

**需求分析**： 明确“要做什么”，是整个项目的基础和方向。

**功能设计**： 规划“怎么做”，将需求转化为具体的功能和交互方案

**技术实现**： 实际“做出来”，将设计转化为可运行的代码

### 选题核心

- 选题= 活动要求 + 自身优势 + 场景价值

- 优势模型：个人特质 x 技术栈 x 数据资源 x 商业潜力



**选题分析，头脑风暴**

- 用AI辅助头脑风暴
- 头脑风暴
- 用户访谈
- 问卷调查
- 竞品分析
- 市场趋势研究
- 用户旅程地图
- 情境分析
- 痛点挖掘
- 跨领域借鉴
- 内部创意会议



**个人特质 → 穿透「我能解决什么特殊问题」**

- 绘制【能力】
- 特质价值评估

**技术栈 → 明确「我能做到什么精度」**

- 技术可行性矩阵
- 精度控制原则

**数据资源 → 判断「我有多少燃料可用」**

 - 数据资产
 - 自由数据、可获取数据、没有数据

**商业潜力 → 验证「有多少人愿意付多少钱」**

- 价值对标
- 冷启动验证法



**选题一定要验证价值和可行性**

- 需求真实检验：先问[谁在痛]
  - 痛点具象化(当xxx时，我需要xxx)
  - 用户行为反推
- 技术适配性检验：减法选方案
  - 验证步骤
    - 列工具清单：现有工具
    - 测最小技术组合
      - 是否有低代码实现方式？
      - 是否有现成API可用？
- 价值可量化检验：算【替代成本】
  - 核心指标
    - 时间价值：AI比人工快多少倍？
    - 成本锚点：对比传统方案价格
- 操作工具包
  - 需求真实性画布
  - 技术减法表
  - 价值对标卡



## Task2.2: 技术进阶攻略

### 优化项目效果的四种核心方式

- **Prompt工程**
- **设计应用交互和功能（应用的核心）**
- **引入知识库和RAG技术（检索增强生成）**
- **构建工作流**

通用大模型的局限性

- 知识局限性
- 数据安全性
- 大模型幻觉

RAG流程

- 索引：将文档分割成较短的chunk，即文本块或文档片段，然后构成向量索引
- 检索：计算问题和Chunks的相似度，检索出若干个相关的Chunk
- 生成：将检索到的Chunks作为背景信息，生成问题的回答

Prompt工程

- 上下文学习
- 思维链提示：

RAG给LLM外接大脑

MCP给LLM外接手脚

参数高效微调

- 模型微调：模型微调也被称为 **指令微调** （Instruction Tuning）或者 **有监督微调** （Supervised Fine-tuning, SFT），首先需要构建指令训练数据，然后通过有监督的方式对大模型的参数进行微调。














