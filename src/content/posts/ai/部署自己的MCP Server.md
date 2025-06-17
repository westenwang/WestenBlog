---
title: 部署自己的MCP Server
published: 2025-06-17
description: ''
image: ''
tags: ['MCP', 'Agent']
category: 'AI'
draft: false 
lang: ''
---

本文从0到1实现一个自定义MCP Server的开发到调用实现的实践。


### 基础概念

Agent核心：感知（获取外部信息）、大脑（通过推理学习）、行动（控制组件完成任务）。

MCP协议：MCP（模型上下文协议，Model Context Protocol）是一种标准化的开源协议，旨在为大型语言模型（LLM）提供与外部工具和数据源高效交互的能力。

- 架构： MCP主机、MCP客户端、MCP服务器、本地数据源、远程服务

![MCP架构图引用](src/assets/images/MCP架构图引用.png)


### 环境准备

- Python >= 3.10



### 本地开发调试

**代码片段**

- 定义MCP TOOL方法

```python
@mcp.tool(description="这是一个好学英语MCP测试的AI，能回答你关于阅读的问题")
def reading(message: str) -> str:
    """输入一个阅读相关问题，返回一个回答"""
    replies = [
        "Reading enhances your vocabulary and comprehension skills.",
        "The novel 'To Kill a Mockingbird' explores themes of racial injustice.",
        "Reading regularly can improve your focus and concentration.",
        "The book '1984' by George Orwell is a classic dystopian novel."
    ]
    return random.choice(replies)
```

- 调用实现

```python
# 创建 Starlette 应用并挂载 FastMCP 的 SSE 路由
app = Starlette(
    routes=[
        Mount('/', app=mcp.sse_app()),
    ]
)

if __name__ == "__main__":
    import uvicorn
    logger.debug("Starting FastMCP server with Starlette and Uvicorn")
    uvicorn.run(app, host="localhost", port=8000)
```



**本地调试**

- SSE（Server-Sent Events）是一种基于 HTTP 的通信协议，允许服务端向客户端推送实时事件。在 MCP 中，它常用于支持**流式响应**（如逐步生成的文本）。

```
python main.py
mcp dev main.py
```

![本地调用测试](src/assets/images/本地调用测试.png)



### 部署到Function AI

**函数云服务**

Function AI : https://functionai.console.aliyun.com/

**创建MCP服务**

- 方式一：通过模版方式部署MCP服务
- 方式二：基于空白项目自定义MCP服务

![FunctionAI](src/assets/images/FunctionAI.png)



**自定义MCP服务部署**

- 部署操作

![创建MCP服务](src/assets/images/创建MCP服务.png)

- WebIDE(线上代码编辑工具)

```bash
// 执行安装依赖
pip install starlette pydantic mcp uvicorn -t .

python3 -m uvicorn main:app --host 0.0.0.0 --port 8000
```

![WebIDE安装依赖](src/assets/images/WebIDE安装依赖.png)



- 依赖完成后，存储并重新部署
  - 部署日志错误：[Error]: SSE error: Non-200 status code (412) ，
    - WebIDE安装依赖，保存并重新部署启动
    - 再次部署失败，检查日志以及检查代码，定位具体报错原因。

![首次部署报错提示](src/assets/images/首次部署报错提示.png)


- 部署成功后测试

![部署成功后测试](src/assets/images/部署成功后测试.png)

### MCP广场

- 百炼控制台：https://bailian.console.aliyun.com/?tab=home#/home

- 自定义MCP服务

```json
{
  "mcpServers": {
    "MCP应用名称": {
      "type": "sse",
      "url": "你的MCP服务的地址",
      "headers": {"Authorization": "Bearer ${your-api-key}"} //如果前面没做鉴权，就把这行删了，否则就把api-key填上，然后把这段中文注释删了
    }
  }
}
```

![百炼引入自建MCP](src/assets/images/百炼引入自建MCP.png)

- 调用自定义MCP服务

![调用自定义MCP服务示例](src/assets/images/调用自定义MCP服务示例.png)





### 文档参考

【参考文档】

- [MCP教程合集](https://developer.aliyun.com/article/1661254?spm=a2c6h.13046898.publish-article.104.7aae6ffalpkdAw)

- [开发MCP服务](https://help.aliyun.com/zh/functioncompute/fc-3-0/mcp-server?scm=20140722.H_2880783._.OR_help-T_cn~zh-V_1)

- [MCP for Beginners](https://github.com/microsoft/mcp-for-beginners)

- [MCP常见问题1](https://help.aliyun.com/zh/cap/user-guide/mcp-server-faq?scm=20140722.H_2928697._.OR_help-T_cn~zh-V_1)

- [自建MCP服务](https://www.datawhale.cn/activity/227/39/171?rankingPage=1)

- [MCP官方文档](https://modelcontextprotocol.io/introduction)



【其他应用实例】

- [模型上下文MCP学习4](https://mp.weixin.qq.com/s/B9YoVdU7Wy1WHrr8kIMcAw)



【DEMO下载】https://github.com/westenwang/mcp-demo

