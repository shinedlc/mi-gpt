![](https://raw.githubusercontent.com/idootop/mi-gpt/main/assets/demo.png)

# MiGPT：智能家居，从未如此贴心 ❤️

[![npm version](https://badge.fury.io/js/mi-gpt.svg)](https://www.npmjs.com/package/mi-gpt) [![Docker Image Version](https://img.shields.io/docker/v/idootop/mi-gpt?color=%23086DCD&label=docker%20image)](https://hub.docker.com/r/idootop/mi-gpt)

在这个数字化的世界里，家已不仅仅是一个居住的地方，而是我们数字生活的延伸。

`MiGPT` 通过将小爱音箱、米家智能设备，与 ChatGPT 的理解能力完美融合，让你的智能家居更懂你。

`MiGPT` 不仅仅是关于设备自动化，而是关于：**打造一个懂你、有温度、与你共同进化的家**。

未来，你的每个智能家居设备，从灯泡、插座，到扫地机器人、电视等，

都可以作为一个个独立的智能体 (Agent)，更智能、更贴心的响应你的指令。

这些独立的智能体，也可以彼此感知，彼此配合，构成一个更强大的协作网络。

而小爱音箱就像是你的智能家居专属管家，全心全意为你服务，释放智能家居的真正潜力。

## ⚡️ 项目预览

👉 查看完整演示视频：【[整活！将小爱音箱接入 ChatGPT 和豆包，改造成你的专属语音助手～](https://www.bilibili.com/video/BV1N1421y7qn/?share_source=copy_web&vd_source=5d4e78ff2a0dc6a661baa65f479199c1)】

<video src='https://github.com/idootop/mi-gpt/assets/35302658/dc336916-9087-418b-bc1b-04d5534dce8f'></video>

## ✨ 项目亮点

- **🎓 LLM 回答**。想象一下，你的小爱音箱变身聊天高手，可以使用 [ChatGPT](https://chat.openai.com) 等大模型来回答你的问题。
- **🎭 角色扮演**。一秒调教小爱，无论是成为你的完美伴侣，还是那个能听你倾诉心事的贴心闺蜜，都不在话下。
- **💬 流式响应**。爱情来得太快就像龙卷风，而你的小爱音箱也是，对你的爱意秒回，爱你不会让你等太久。
- **🧠 长短期记忆**。小爱音箱现在能记住你们之间的每一次对话，越聊越默契，就像是你身边的老朋友。
- **🔊 自定义 TTS**。厌倦了小爱同学的语音？帮你解锁[「豆包」](https://doubao.com)同款音色，就像真人在回你的消息。
- **🤖️ 智能家居 Agent**。心情不好？小爱立刻懂你，自动帮你播放喜欢的音乐，调节灯光，逗你开心。_TODO_

## 🚀 启动项目

`MiGPT` 有两种启动方式: [Docker](#docker) 和 [Node.js](#nodejs)。

### Docker

[![Docker Image Version](https://img.shields.io/docker/v/idootop/mi-gpt?color=%23086DCD&label=docker%20image)](https://hub.docker.com/r/idootop/mi-gpt)

对于电脑小白或者不想自己配置代码运行环境（Node）的同学，可以使用 Docker 启动方式。

请先按照[「配置参数」](#%EF%B8%8F-配置参数)章节，配置好你的 `.env` 和 `.migpt.js` 文件，然后使用以下命令启动 docker：

```shell
docker run -d  --env-file $(pwd)/.env \
    -v $(pwd)/.migpt.js:/app/.migpt.js \
    idootop/mi-gpt:latest
```

注意：在 Windows 终端下不支持使用 `$(pwd)` 获取当前工作路径，需要将配置文件路径替换为绝对路径。

### Node.js

[![npm version](https://badge.fury.io/js/mi-gpt.svg)](https://www.npmjs.com/package/mi-gpt)

如果你是一名前端 (Node) 开发者，也可以通过 NPM 安装 `mi-gpt` 启动 `MiGPT`。

```shell
npm install mi-gpt # 安装依赖
```

然后，创建并启动 `MiGPT` 实例。初始化参数的具体含义请看下面的[「配置参数」](#%EF%B8%8F-配置参数)章节。

```typescript
import { MiGPT } from "mi-gpt";

async function main() {
  const client = MiGPT.create({
    speaker: {
      userId: "987654321", // 注意：不是手机号或邮箱，请在「个人信息」-「小米 ID」查看
      password: "123456", // 账号密码
      did: "小爱音箱Pro", // 小爱音箱 ID 或在米家中设置的名称
    },
  });
  await client.start();
}

main();
```

注意：此模式下并不会主动读取 `.env` 和 `.migpt.json` 中的配置信息，你需要自己初始化 Node 环境变量，

并将 `.migpt.json` 中的参数作为 `MiGPT.create` 的初始化参数传入。👉 [示例代码](https://github.com/idootop/mi-gpt/blob/example/index.ts)

## ⚙️ 配置参数

### .migpt.js

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

### 环境变量

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

## 💬 常见问题

**Q：支持哪些型号的小爱音箱？**

大部分型号的小爱音箱都支持，推荐小爱音箱 Pro（完美运行）。部分机型的 MioT 接口开放能力并不完整，比如小米音箱 Play 增强版（L05C），将会导致 `MiGPT` 部分功能异常，相关 [issue](https://github.com/idootop/mi-gpt/issues/14)。

**Q：除了 OpenAI 还支持哪些模型，如何设置？**

理论上兼容 [OpenAI SDK](https://www.npmjs.com/package/openai) 的模型都支持，只需修改环境变量即可接入到 MiGPT。

比如：[通义千问](https://help.aliyun.com/zh/dashscope/developer-reference/compatibility-of-openai-with-dashscope/?spm=a2c4g.11186623.0.i1)、[零一万物](https://platform.01.ai/docs#making-an-api-request)、[Moonshot](https://platform.moonshot.cn/docs/api/chat)、[DeepSeek](https://platform.deepseek.com/api-docs/) 等，以 Moonshot 为例：

```shell
OPENAI_BASE_URL=https://api.moonshot.cn/v1
OPENAI_MODEL=moonshot-v1-8k
OPENAI_API_KEY=$MOONSHOT_API_KEY
```

**Q：什么是唤醒模式？**

`唤醒模式` 类似于小爱技能，可能让你在跟小爱互动的时候，无需每句话都要以“小爱同学”开头唤醒。

关于唤醒模式的更多细节，请查看这里：https://github.com/idootop/mi-gpt/issues/28

**Q：提示登录小米账号失败，无法正常启动**

1. **账号密码不正确**：小米 ID 并非手机号或邮箱，请在[「个人信息」-「小米 ID」](https://account.xiaomi.com/fe/service/account/profile)查看。
2. **网络环境异常**：如果你是在海外服务器等，非中国大陆网络环境下登录小米账号，需要先同意小米的「个人数据跨境传输」协议，然后按照提示验证手机号或邮箱，等待大约 30 分钟之后即可正常登录。[👉 相关教程](https://github.com/idootop/mi-gpt/issues/22#issuecomment-2150535622)

**Q：小爱音箱收到消息后，没有调用 AI 进行回复**

`MiGPT` 收到消息默认不会调用 AI 进行回复，只会回复以唤醒词开头的消息，比如：“请问 xxx”、“你 xxx” 等，你也可以自定义唤醒词（`callAIKeywords`）列表。

**Q：小爱音箱没有播放 AI 的回答，但控制台有打印 AI 的回复**

不同型号的小爱音箱 TTS 指令不同: [issues#5](https://github.com/idootop/mi-gpt/issues/5#issuecomment-2122881495)

请到 <https://home.miot-spec.com> 查询具体指令，并修改配置文件中的 `ttsCommand` 参数。

<details>
<summary>👉 查看教程</summary>

![](https://raw.githubusercontent.com/idootop/mi-gpt/main/assets/search.jpg)
![](https://raw.githubusercontent.com/idootop/mi-gpt/main/assets/command.jpg)

</details>

**Q：小爱音箱没有读完整个句子，总是戛然而止**

部分型号的小爱音箱不支持通过 Mina 获取设备播放状态，只能通过 MiOT 指令查询。

请到 <https://home.miot-spec.com> 查询具体指令，并修改配置文件中的 `playingCommand` 参数。

<details>
<summary>👉 查看教程</summary>

![](https://raw.githubusercontent.com/idootop/mi-gpt/main/assets/playing.png)

</details>

如果修改参数后问题仍然存在，说明你的设备不支持通过开放接口查询播放状态（比如：小米音箱 Play 增强版），**此问题无解**。建议更换其他型号的小爱音箱（推荐小爱音箱 Pro），相关 [issue](https://github.com/idootop/mi-gpt/issues/14)。

或者你也可以关闭配置文件中的流式响应（streamResponse）选项，确保小爱能够回复完整的句子。不过需要注意的是，关闭流式响应后，唤醒模式等功能将会失效。

**Q: 为什么小爱音箱会在 AI 回答之前抢话？**

与本项目的实现原理有关。本项目通过轮询小米接口获取最新的对话信息，当检测到小爱在回复的时候会通过播放静音音频等方式快速 mute 掉小爱原来的回复。

但是从小爱开始回复，到上报状态给小米服务云端，再到本项目通过小米云端接口轮训到这个状态变更，中间会有大约 1 -2 秒的延迟时间，无解。

这个问题，理论上需要通过刷机才能完美解决，可以参考下面的相关讨论：

- https://github.com/yihong0618/xiaogpt/issues/515#issuecomment-2121602572
- https://github.com/idootop/mi-gpt/issues/21#issuecomment-2147125219

**Q：启动 docker 提示 ERR_MODULE_NOT_FOUND，无法正常启动**

在 Windows 终端（比如：PowerShell、cmd）下，无法使用 `$(pwd)` 获取当前工作目录绝对路径，需要填写 `.env` 和 `.migpt.js` 文件的绝对路径。相关 [issue](https://github.com/idootop/mi-gpt/issues/26#issuecomment-2151381521)

<details>
<summary>👉 查看示例</summary>

请将下面的 `/绝对路径/` 替换为你当前目录的绝对路径：

```shell
docker run -d --env-file /绝对路径/.env \
    -v /绝对路径/.migpt.js:/app/.migpt.js \
    idootop/mi-gpt:latest
```

Windows PowerShell 终端

```shell
docker run -d --env-file $pwd\.env `
    -v $pwd\.migpt.js:/app/.migpt.js `
    idootop/mi-gpt:latest
```

Windows cmd 终端

```shell
docker run -d --env-file %cd%\.env ^
    -v %cd%\.migpt.js:/app/.migpt.js ^
    idootop/mi-gpt:latest
```

</details>

**Q：我 Clone 了这个仓库，但是本地启动失败**

如果你是通过 clone 本项目仓库的方式来运行，记得在 `start` 之前先 `build` 一下。

```shell
pnpm install && pnpm build && pnpm start
```

另外， `start` 命令默认没有注入 `.env` 文件里的环境变量。你可以在 VS Code 里按 F5 直接运行，会自动读取 `.env` ，或者将启动脚本改为：

```shell
node --env-file=.env app.js
```

**Q：怎样使用豆包的音色**

此功能需要豆包 TTS 接口支持，本项目暂不对外提供此服务。

**Q：我还有其他问题**

请在此处提交 [issue](https://github.com/idootop/mi-gpt/issues) 反馈，并提供详细的问题描述和相关错误截图。

## 🚨 免责声明

本项目仅供学习和研究目的，不得用于任何商业活动。用户在使用本项目时应遵守所在地区的法律法规，对于违法使用所导致的后果，本项目及作者不承担任何责任。
本项目可能存在未知的缺陷和风险（包括但不限于设备损坏和账号封禁等），使用者应自行承担使用本项目所产生的所有风险及责任。
作者不保证本项目的准确性、完整性、及时性、可靠性，也不承担任何因使用本项目而产生的任何损失或损害责任。
使用本项目即表示您已阅读并同意本免责声明的全部内容。

## ❤️ 鸣谢

- <https://github.com/yihong0618/xiaogpt>
- <https://github.com/inu1255/mi-service>
- <https://github.com/Yonsm/MiService>
