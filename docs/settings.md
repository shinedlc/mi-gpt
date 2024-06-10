# ⚙️ 配置参数

## .migpt.js

重命名本项目根目录下的 [.migpt.example.js](https://github.com/idootop/mi-gpt/blob/main/.migpt.example.js) 文件为 `.migpt.js`。

然后，将里面的配置参数修改成你自己的，参数含义如下：

| 参数名称                     | 描述                                                                                       | 示例                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| **bot**                      |                                                                                            |                                                    |
| `name`                       | 对方名称（小爱音箱）                                                                       | `"傻妞"`                                           |
| `profile`                    | 对方的个人简介/人设                                                                        | `"性别女，性格乖巧可爱，喜欢搞怪，爱吃醋。"`       |
| **master**                   |                                                                                            |                                                    |
| `name`                       | 主人名称（我自己）                                                                         | `"陆小千"`                                         |
| `profile`                    | 主人的个人简介/人设                                                                        | `"性别男，善良正直，总是舍己为人，是傻妞的主人。"` |
| **room**                     |                                                                                            |                                                    |
| `name`                       | 会话群名称                                                                                 | `"魔幻手机"`                                       |
| `description`                | 会话群简介                                                                                 | `"傻妞和陆小千的私聊"`                             |
| **speaker**                  |                                                                                            |                                                    |
| `userId`                     | [小米 ID](https://account.xiaomi.com/fe/service/account/profile)（注意：不是手机号或邮箱） | `"987654321"`                                      |
| `password`                   | 账户密码                                                                                   | `"123456"`                                         |
| `did`                        | 小爱音箱 ID 或名称                                                                         | `"小爱音箱 Pro"`                                   |
| `ttsCommand`                 | 小爱音箱 TTS 指令（[可在此查询](https://home.miot-spec.com)）                              | `[5, 1]`                                           |
| `wakeUpCommand`              | 小爱音箱唤醒指令（[可在此查询](https://home.miot-spec.com)）                               | `[5, 3]`                                           |
| **speaker 其他参数（可选）** |
| `callAIKeywords`             | 当消息以关键词开头时，会调用 AI 来响应用户消息                                             | `["请", "傻妞"]`                                   |
| `wakeUpKeywords`             | 当消息以关键词开头时，会进入 AI 唤醒状态                                                   | `["召唤傻妞", "打开傻妞"]`                         |
| `exitKeywords`               | 当消息以关键词开头时，会退出 AI 唤醒状态                                                   | `["退出傻妞", "关闭傻妞"]`                         |
| `onEnterAI`                  | 进入 AI 模式的欢迎语                                                                       | `["你好，我是傻妞，很高兴认识你"]`                 |
| `onExitAI`                   | 退出 AI 模式的提示语                                                                       | `["傻妞已退出"]`                                   |
| `onAIAsking`                 | AI 开始回答时的提示语                                                                      | `["让我先想想", "请稍等"]`                         |
| `onAIReplied`                | AI 结束回答时的提示语                                                                      | `["我说完了", "还有其他问题吗"]`                   |
| `onAIError`                  | AI 回答异常时的提示语                                                                      | `["出错了，请稍后再试吧！"]`                       |
| `playingCommand`             | 查询小爱音箱是否在播放中指令（[可在此查询](https://home.miot-spec.com)）                   | `[3, 1, 1]`                                        |
| `streamResponse`             | 是否启用流式响应（部分小爱音箱型号不支持查询播放状态，此时需要关闭流式响应）               | `true`                                             |
| `exitKeepAliveAfter`         | 无响应一段时间后，多久自动退出唤醒模式（单位秒，默认 30 秒）                               | `30`                                               |

## 环境变量

重命名本项目根目录下的 [.env.example](https://github.com/idootop/mi-gpt/blob/main/.env.example) 文件为 `.env`。

然后，将里面的环境变量修改成你自己的，参数含义如下：

| 环境变量名称           | 描述                                                                                        | 示例                                 |
| ---------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------ |
| **OpenAI**             |                                                                                             |                                      |
| `OPENAI_API_KEY`       | OpenAI API 密钥                                                                             | `abc123`                             |
| `OPENAI_MODEL`         | 使用的 OpenAI 模型                                                                          | `gpt-4o`                             |
| `OPENAI_BASE_URL`      | 可选，OpenAI API BaseURL                                                                    | `https://api.openai.com/v1`          |
| `AZURE_OPENAI_API_KEY` | 可选，[Microsoft Azure OpenAI](https://www.npmjs.com/package/openai#microsoft-azure-openai) | `abc123`                             |
| **提示音效（可选）**   |                                                                                             |                                      |
| `AUDIO_SILENT`         | 静音音频链接                                                                                | `"https://example.com/slient.wav"`   |
| `AUDIO_BEEP`           | 默认提示音链接                                                                              | `"https://example.com/beep.wav"`     |
| `AUDIO_ACTIVE`         | 唤醒提示音链接                                                                              | `"https://example.com/active.wav"`   |
| `AUDIO_ERROR`          | 出错提示音链接                                                                              | `"https://example.com/error.wav"`    |
| **豆包 TTS（可选）**   |                                                                                             |                                      |
| `TTS_DOUBAO`           | 豆包 TTS 接口                                                                               | `"https://example.com/tts.wav"`      |
| `SPEAKERS_DOUBAO`      | 豆包 TTS 音色列表接口                                                                       | `"https://example.com/tts-speakers"` |
