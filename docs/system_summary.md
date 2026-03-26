# System Summary & Architecture: Health Forum Website

## 1. Tổng quan dự án (Project Overview)
**Health Forum Website** là một nền tảng diễn đàn về sức khỏe, được xây dựng theo kiến trúc **Monorepo** với sự phân tách rõ ràng giữa máy khách (Client), máy chủ (Server) và Cơ sở dữ liệu (Database). Hệ thống cũng tích hợp hệ sinh thái AI Agents để tự động hóa quy trình phát triển từ thiết kế Figma, lập trình Backend, xây dựng UI, cho tới tự động kiểm thử QA.

**Repository:** [https://github.com/datvan68/health_forum_website](https://github.com/datvan68/health_forum_website)

---

## 2. Công nghệ Cốt lõi (Tech Stack)

### 2.1. Frontend (Thư mục `frontend/`)
- Môi trường: Máy chủ Dev ở cổng `3000`.
- Framework: Next.js 15 (App Router).
- Ngôn ngữ: TypeScript (`.ts`, `.tsx`).
- Giao diện (Styling): Tailwind CSS.
- Quản lý Component: Phân tách minh bạch giữa Client Component (`"use client"`) và Server Component.
- Tối ưu UI: Sử dụng `Suspense` cho tính năng Skeleton Loading.

### 2.2. Backend (Thư mục `backend/`)
- Môi trường: Phục vụ API ở cổng `8080`.
- Framework nền: ASP.NET Core API (.NET 10.0).
- Kiến trúc mẫu: `Controller -> Service -> Repository`.
- ORM: Entity Framework Core (dự kiến tích hợp) + T-SQL Syntax.

### 2.3. Cở sở dữ liệu (Database & Docker)
- Hệ quản trị CSDL: Microsoft SQL Server 2022 (Docker container).
- Quản lý Container hóa: `docker-compose.yml` (Đóng gói Frontend, Backend và SQL Server).
- Quản lý dữ liệu (Thư mục `database/`):
  - Chứa tài liệu khởi tạo cấu trúc CSDL (`schema.sql`).
  - Dữ liệu mẫu khởi tạo (`seed.sql`).
  - Stored Procedures cơ bản (`sp_GetForumTopics.sql`).

---

## 3. Hệ thống Tác tử AI (AI Agents Ecosystem)
Hệ thống sử dụng các MCP Servers cục bộ (Figma, GitHub, NotebookLM, Shadcn) và chia nhỏ nhiệm vụ cho các chuyên gia AI Agents (đặt tại thư mục `agents/`):

1. **Orchestrator Agent (`agents/orchestrator/`)**: Điều phối trung tâm dựa trên file thiết kế Figma. Phân tách tác vụ, giới hạn ranh giới phạm vi, và ràng buộc chất lượng (Ví dụ: Không đọc toàn bộ file Figma, chỉ lấy node ID cần thao tác).
2. **Design Agent (`agents/design/`)**: Xử lý giao tiếp với Figma API thông qua các script (`fetch_and_process.js`, `check_comments.js`) nhằm bóc tách cấu trúc UI, label cần thiết thay vì làm thừa hoặc tái thiết kế.
3. **Backend Agent**: Trách nhiệm sinh các C# Controllers mẫu, ViewModel, hay bổ sung thành phần vào sơ đồ DbContext.
4. **UI Agent**: Sinh mã nguồn React/Next.js tương thích bản vẽ ở tầng giao diện, quản lý Loading State và SSR.
5. **QA Agent**: Thực hiện Checklist tự động đối chiếu các trường trong API với luồng dữ liệu của bản vẽ UI, đảm bảo tuân thủ tuyệt đối phạm vi node_id (tránh sinh thêm các tính năng ảo giác/hallucinations).

---

## 4. Quản lý Môi trường Bảo mật (Environment & Secrets)
- Tất cả token cá nhân và cấu hình API thật (như *Figma Personal Access Token*, *GitHub Personal Access Token*, *Mật khẩu SQL Server Database*) đều được cô lập ở thư mục môi trường cục bộ (tại `.mcp/figma-config.json` hay `.env`) và đã được khai báo vào `.gitignore` để không bị lộ lọt (push) lên trên GitHub Codebase.
