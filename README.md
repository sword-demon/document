# Document Management System

一个基于 AdonisJS 6 的文档管理系统，使用 TypeScript 开发，提供用户认证、分类管理等功能。

## 技术栈

- **框架**: AdonisJS 6
- **语言**: TypeScript
- **数据库**: MySQL
- **认证**: AdonisJS Auth
- **ORM**: Lucid
- **验证**: VineJS

## 项目结构

```
/
├── app/
│   ├── controllers/        # 控制器
│   ├── exceptions/         # 异常处理
│   ├── middleware/         # 中间件
│   └── models/             # 数据模型
├── bin/                    # 可执行文件
├── config/                 # 配置文件
├── database/               # 数据库相关
│   ├── factories/          # 数据工厂
│   └── migrations/         # 数据库迁移
├── start/                  # 启动文件
├── tests/                  # 测试文件
├── .env.example            # 环境变量示例
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

- `GET /api/categories` - 获取所有分类
- `POST /api/categories` - 创建新分类
- `GET /api/categories/:id` - 获取单个分类
- `PUT /api/categories/:id` - 更新分类
- `DELETE /api/categories/:id` - 删除分类

### 用户认证

- `POST /api/auth/register` - 注册新用户
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/me` - 获取当前用户信息

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
