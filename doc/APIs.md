### POST /application/run/{app_id}

**运行指定的智能应用 / Agent 应用**

启动一个已注册的应用，并以 Server-Sent Events (SSE) 方式流式返回执行结果。

#### 请求路径参数 (Path Parameters)

| 参数名      | 类型   | 是否必填 | 说明                      |
|----------|--------|----------|-------------------------|
| app_name | string | 是       | 指定应用的名字                 |
| option   | string | 是       | 指定参数，参数可变，主要需要指定起点的代理名称 |

#### 请求体 (Body) - application/json

```json
{
  "option":  {
     "prompt": "列出2023-2025的数据"
  },
  "app_name": "公估报告智数问答",
  "agent_name": "问题解析",
  "new_ctx": false
}
```


#### 返回说明

从流中读取结果，结果为json body的序列：

| 字段              | 取值格式                                                         | 定义                       | 例子                      | 备注                                                                                |
| --------------- | ------------------------------------------------------------ | ------------------------ | ----------------------- | --------------------------------------------------------------------------------- |
| channel         | prompt                                                       | 做什么事，做事过程中需要用户知道的，执行中间状态 |                         |                                                                                   |
| progress        | 思考过程                                                         |                          |                         |
| response        | 最终回答内容                                                       |                          |                         |
| ui_control      | 需要前端UI响应交互的                                                  |                          |                         |
| control         | 流程控制                                                         |                          |                         |
| command         | append                                                       |                          |                         |                                                                                   |
| anchor_start    |                                                              |                          |                         |
| rewind          |                                                              |                          |                         |
| end             |                                                              |                          |                         |
| role            | agent:节点名称                                                   |                          | agent:case_retrive_node | 具体名称可为空                                                                           |
| llm:大模型名称       |                                                              | llm:glm-4.7              |
| user:用户名        |                                                              | user:xelers              |
| tool:工具名称       |                                                              | tool:案件检索                |
| system:消息类型     | warning/error/info                                           | system:error             |
| data<br>（json）  | type                                                         | markdown                 |                         | {"type":"markdown","content":"xxxxxxxx"}<br>{"type": "tree", "content": "白板"}<br> | 部分不关注数据输出时，取值 1<br>如:command取值end时 |
| tree            | 标识前端如何显示，data只返回父节点名,<br>前端通过/api/get_data接口请求具体tree/graph数据 |
| graph           |
| image           |                                                              |
| file            | data返回文件key，前端通过/api/filestream预览，通过/api/download 下载         |
| chart           | data返回json字符串，前端通过图表插件渲染                                     |
| user_query_box  |                                                              |
| file_upload_box |                                                              |
| ...             |                                                              |
| content         | str/json                                                     |                          |
| thread          | str                                                          |                          | thread-198              |                                                                                   |