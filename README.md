# Document Management System

一个基于 AdonisJS 6 的文档管理系统，使用 TypeScript 开发，提供用户认证、分类管理等功能。

## 技术栈

- **框架**: AdonisJS 6
- **语言**: TypeScript
- **数据库**: MySQL
- **认证**: AdonisJS Auth
- **ORM**: Lucid
- **验证**: VineJS

## 核心特性

### FormValidator 表单验证器

`app/validators/zh/form_validator.ts` 封装了动态表单验证功能，支持中文字段名和验证消息：

- **链式调用**: 支持 `.messages()` 自定义消息、`.fields()` 自定义字段名
- **动态规则**: 通过回调函数根据 `HttpContext` 动态生成验证规则
- **中文化**: 内置中文验证消息和字段名配置
- **类型推断**: 泛型自动推断验证结果类型

```typescript
// 使用示例
FormValidator.rules((ctx) => ({
  name: vine.string(),
  email: vine.email(),
})).messages({
  'name.required': '名称不能为空',
}).fields({
  name: '用户名',
}).validate(ctx)
```

## 项目结构

```
/
├── app/
│   ├── controllers/        # 控制器
│   │   ├── auth_controller.ts      # 认证控制器
│   │   ├── bases_controller.ts      # 基础控制器
│   │   └── categories_controller.ts # 分类控制器
│   ├── exceptions/         # 异常处理
│   ├── middleware/         # 中间件
│   ├── models/             # 数据模型
│   │   ├── category.ts     # 分类模型
│   │   └── user.ts         # 用户模型
│   └── validators/         # 验证器
│       ├── category.ts     # 分类验证器
│       └── zh/             # 中文验证器
│           ├── form_validator.ts # 表单验证器
│           └── lang.ts      # 语言验证器
├── bin/                    # 可执行文件
├── config/                 # 配置文件
├── database/
│   └── migrations/         # 数据库迁移
├── start/                  # 启动文件
│   ├── env.ts              # 环境变量
│   ├── kernel.ts           # HTTP 内核
│   ├── routes.ts           # 路由定义
│   └── validator.ts        # 验证器配置
├── tests/                  # 测试文件
├── adonisrc.ts             # AdonisJS 配置
├── package.json            # 项目依赖
└── tsconfig.json           # TypeScript 配置
```

## 快速开始

### 安装依赖

```bash
npm install
```

### 配置环境变量

复制 `.env.example` 文件并命名为 `.env`，然后根据你的环境配置相应的变量：

```bash
cp .env.example .env
```

### 数据库迁移

运行数据库迁移命令来创建表结构：

```bash
node ace migration:run
```

### 启动开发服务器

```bash
npm run dev
```

服务器将在 `http://localhost:3333` 启动。

## 环境变量配置

主要环境变量配置：

- `NODE_ENV`: 运行环境 (development, production)
- `PORT`: 服务器端口
- `APP_KEY`: 应用密钥
- `DB_CONNECTION`: 数据库连接类型
- `DB_HOST`: 数据库主机
- `DB_PORT`: 数据库端口
- `DB_USER`: 数据库用户名
- `DB_PASSWORD`: 数据库密码
- `DB_DATABASE`: 数据库名称

## 数据库迁移

### 运行所有迁移

```bash
node ace migration:run
```

### 回滚迁移

```bash
node ace migration:rollback
```

### 创建新迁移

```bash
node ace make:migration <migration_name>
```

## 运行测试

```bash
npm test
```

## 脚本命令

| 命令                | 描述                     |
| ------------------- | ------------------------ |
| `npm start`         | 启动生产服务器           |
| `npm run dev`       | 启动开发服务器（热重载） |
| `npm run build`     | 构建项目                 |
| `npm run test`      | 运行测试                 |
| `npm run lint`      | 运行 ESLint 检查         |
| `npm run format`    | 格式化代码               |
| `npm run typecheck` | 运行 TypeScript 类型检查 |

## API 路由

### 分类管理

| 方法   | 路径                      | 描述           |
|--------|--------------------------|----------------|
| GET    | /category                | 获取所有分类     |
| POST   | /category                | 创建新分类       |
| GET    | /category/:id            | 获取单个分类     |
| PUT    | /category/:id            | 更新分类         |
| DELETE | /category/:id            | 删除分类         |

### 用户认证

| 方法   | 路径              | 描述           |
|--------|------------------|----------------|
| POST   | /auth/register   | 注册新用户       |
| POST   | /auth/login      | 用户登录         |

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 操作命令

```bash
node ace migration:fresh --seed
```

## 许可证

本项目使用 UNLICENSED 许可证。
