# Health Forum Website

*Nguyên Văn Tấn Đạt – MSSV: 170124525 – Lớp: DK24TTC5*  
*nvtdat68@gmail.com*
*0384919086*

Diễn đàn sức khoẻ cộng đồng xây dựng trên kiến trúc **Decoupled MVC** hiện đại.

- `frontend/` — Next.js 16 (React 19) + TailwindCSS v3 + Framer Motion
- `backend/`  — ASP.NET Core (.NET 10) RESTful API + Entity Framework Core 10
- `database/` — MySQL 8.0 schema & seed scripts
- `docs/`     — Báo cáo chuyên đề kỹ thuật (`baocao.md`)

---

## Công nghệ sử dụng

| Tầng | Công nghệ |
|---|---|
| Frontend | Next.js 16, React 19, TailwindCSS 3.4, Framer Motion 12 |
| Backend | .NET 10, ASP.NET Core, EF Core 10, JWT, BCrypt |
| Database | MySQL 8.0 (Pomelo / MySql.EntityFrameworkCore) |
| Triển khai | Docker 27, Docker Compose |

---

## Cấu trúc dự án

```text
health-forum-website/
├── frontend/               # Next.js App Router
│   ├── app/
│   │   ├── (routes)/       # Các trang chính
│   │   │   ├── articles/   # Danh sách, chi tiết, tạo, chỉnh sửa bài viết
│   │   │   ├── fitness/    # Chuyên đề Thể hình
│   │   │   ├── mental-health/ # Chuyên đề Sức khoẻ tâm lý
│   │   │   └── nutrition/  # Chuyên đề Dinh dưỡng
│   │   ├── auth/           # Đăng nhập / Đăng ký / Quên mật khẩu
│   │   └── profile/        # Hồ sơ cá nhân (protected)
│   ├── components/         # UI Components tái sử dụng
│   ├── hooks/              # Custom React Hooks
│   ├── services/           # HTTP service calls tới Backend API
│   ├── store/              # State management
│   ├── types/              # TypeScript type definitions
│   └── lib/                # Utility functions
├── backend/                # ASP.NET Core API
│   ├── Controllers/        # ArticlesController, AuthController, ...
│   ├── DTOs/               # Request & Response data transfer objects
│   ├── Models/             # User, Article, ArticleComment, Category
│   ├── Services/           # Business logic layer
│   ├── Repositories/       # Data access layer
│   ├── Data/               # EF Core DbContext & Migrations
│   └── Middlewares/        # JWT & custom middleware
├── database/
│   ├── schema.sql          # Schema khởi tạo
│   └── scripts/seed.sql    # Dữ liệu mẫu
├── docs/
│   └── baocao.md           # Báo cáo chuyên đề đầy đủ
├── docker-compose.yml
├── .env.example
└── health-forum-website.sln
```

---

## Khởi động nhanh (Local Development)

### 1. Clone & cấu hình môi trường

```bash
git clone <repo-url>
cd health-forum-website
cp .env.example .env
```

### 2. Khởi động MySQL bằng Docker

```bash
docker compose up -d mysql
```

Database chạy trên cổng `3406` (host) → `3306` (container).

### 3. Chạy Backend

```bash
cd backend
dotnet restore
dotnet run
```

| Endpoint | URL |
|---|---|
| API Base | `http://localhost:8080/api` |
| Health check | `http://localhost:8080/api/health` |
| Swagger UI | `http://localhost:8080/swagger` |

### 4. Chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:3000`

---

## Triển khai toàn bộ stack bằng Docker

```bash
docker compose up -d --build
```

Lệnh này khởi động đồng thời 3 services:

| Service | Container | Cổng |
|---|---|---|
| MySQL 8.0 | `health-forum-mysql` | `3406` |
| .NET 10 API | `health-forum-backend` | `8080` |
| Next.js App | `health-forum-frontend` | `3000` |

---

## Các trang Frontend

| Route | Trang | Mô tả |
|---|---|---|
| `/` | Trang chủ | Hero, thống kê, bài viết nổi bật, chuyên đề |
| `/auth/login` | Đăng nhập | JWT lưu vào localStorage |
| `/auth/register` | Đăng ký | Tạo tài khoản mới |
| `/auth/forgot-password` | Quên mật khẩu | Khôi phục qua email |
| `/articles` | Danh sách bài viết | Lọc danh mục, sắp xếp, phân trang |
| `/articles/[slug]` | Chi tiết bài viết | Nội dung + bình luận (tối đa 5) |
| `/articles/create` | Tạo bài viết | Yêu cầu đăng nhập |
| `/articles/edit/[slug]` | Chỉnh sửa bài viết | Yêu cầu đăng nhập + là tác giả |
| `/fitness` | Thể hình | Chuyên đề Thể hình |
| `/mental-health` | Tâm lý | Chuyên đề Sức khoẻ tâm lý |
| `/nutrition` | Dinh dưỡng | Chuyên đề Dinh dưỡng |
| `/profile` | Hồ sơ cá nhân | Protected route |

---

## API Endpoints chính

| Method | Route | Mô tả | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Đăng ký tài khoản | ❌ |
| `POST` | `/api/auth/login` | Đăng nhập, trả về JWT | ❌ |
| `GET` | `/api/articles` | Danh sách bài viết (có filter `authorId`, `category`) | ❌ |
| `GET` | `/api/articles/{slug}` | Chi tiết bài viết theo slug | ❌ |
| `POST` | `/api/articles` | Tạo bài viết mới | ✅ |
| `PUT` | `/api/articles/{slug}` | Cập nhật bài viết | ✅ (tác giả) |
| `DELETE` | `/api/articles/{slug}` | Xóa bài viết | ✅ (tác giả) |
| `GET` | `/api/articles/{id}/comments` | Lấy bình luận bài viết | ❌ |
| `POST` | `/api/articles/{id}/comments` | Đăng bình luận | ✅ |
| `GET` | `/api/categories` | Danh sách danh mục | ❌ |
| `GET` | `/api/profile` | Thông tin người dùng hiện tại | ✅ |
| `GET` | `/api/health` | Health check | ❌ |

---

## Database Schema (4 bảng cốt lõi)

```
Users           — Tài khoản người dùng (Username, Email, PasswordHash, Avatar, ...)
Categories      — Danh mục (Tâm lý, Dinh dưỡng, Thể hình)
Articles        — Bài viết (Slug unique, AuthorId → Users, Category)
ArticleComments — Bình luận (ArticleId → Articles, AuthorId → Users)
```

---

## Biến môi trường

Xem `.env.example` để biết các biến cần thiết:

```env
MYSQL_ROOT_PASSWORD=your_password
```

Frontend sử dụng biến `NEXT_PUBLIC_API_URL` (mặc định: `http://localhost:8080/api`).

---


