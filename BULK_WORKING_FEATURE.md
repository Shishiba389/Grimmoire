# Bulk Working — Tính năng mới trong GRIMOIRE

## Tổng quan

**Bulk Working** là tab độc lập mới trong GRIMOIRE, cho phép xử lý hàng loạt nhiều folder EAN cùng lúc với kanban board, CLIP AI auto-classification, và batch renaming. Trước đây Bulk Working được nhúng bên trong EAN Renamer dưới dạng toggle mode — nay đã tách ra thành tab riêng với giao diện và luồng xử lý tối ưu hơn.

---

## Giao diện

### Layout 2 panel

| Panel trái (340px) | Panel phải (workspace) |
|---|---|
| Sidebar chứa danh sách box cards | Kanban board + output bar + preview |

### Panel trái — Sidebar

- **Toolbar**: Choose folder, Rescan, Master Data, Import Map, Naming mode selector
- **Stats bar**: Folders / Ready / Missing / Done counters
- **Box card list**: Scroll danh sách các folder con, mỗi card hiển thị:
  - Tên folder + số lượng ảnh
  - 4 thumbnail preview
  - EAN input (editable)
  - Product Name input (editable)
  - Buttons: Open / Skip
  - Badge trạng thái: pending / active / done / skipped
  - Match tier badge (EAN/CODE/NAME) nếu có master data

### Panel phải — Workspace

Khi chưa chọn box nào: hiển thị placeholder text.

Khi đã chọn 1 box (click Open):

#### Header 2 dòng
- **Dòng 1**: Tên folder, số ảnh, CLIP status badge, action buttons (Preview / Copy|Rename / Done / Next)
- **Dòng 2**: EAN input, Product Name input, Naming mode, Action mode (Copy/Rename), Cancel AI button

#### CLIP AI Status Badge
- **Đang chạy**: Badge tím với dot nhấp nháy, hiển thị "Classifying X/Y" hoặc "Loading model…"
- **Hoàn tất**: Badge xanh lá "AI classified X/Y"

#### CLIP Summary Strip
Sau khi AI phân loại xong, hiển thị thanh tổng kết với badge màu cho từng category:
- Packshot (xanh lá)
- Lifestyle/Human (xanh dương)
- Lifestyle/Normal (vàng)
- Artwork (tím)
- Unsorted (xám)

#### Output Bar
Thanh chọn output folder cho từng category (Packshot, Human, Lifestyle, Artwork). Click để chọn folder đích.

#### Kanban Board
- 5 cột ngang: Unsorted, Packshot, Lifestyle/Human, Lifestyle/Normal, Artwork
- Mỗi cột có header (tên + count badge) và scrollable body
- Image cards hiển thị: thumbnail 64x48, filename, file size, AI confidence badge (AI 45%, v.v.)
- Drag & drop giữa các cột
- Drop hint "Drop here" khi kéo vào cột trống
- Visual feedback: cột đích highlight khi drag over, cột nguồn có border khác

#### Preview Panel
- Bảng preview kết quả rename trước khi apply
- Hiển thị old name → new name, status (rename/skip/conflict)
- Summary card: renamed / skipped / conflicts count

#### Hover Preview
Di chuột lên image card → popup lớn hiển thị ảnh full (320x360), filename, metadata.

---

## Luồng xử lý

### 1. Chọn root folder
- Click "Choose folder" → chọn folder chứa nhiều subfolder EAN
- Hệ thống scan tất cả subfolder, tạo box card cho mỗi folder con
- Tự động extract EAN từ tên folder

### 2. Master Data (tùy chọn)
- Click "Master Data" → chọn file Excel/CSV chứa danh sách sản phẩm
- Hệ thống auto-match từng folder với master data (theo EAN, code, hoặc tên)
- EAN và Product Name tự động điền vào box cards

### 3. Mở box
- Click "Open" trên box card → workspace hiển thị kanban board
- CLIP AI tự động chạy phân loại ảnh vào các category
- Nếu có master data: auto-match image names

### 4. Chỉnh sửa phân loại
- Drag & drop ảnh giữa các cột nếu AI phân loại sai
- Chỉnh EAN / Product Name trong header
- Chọn output folder cho từng category

### 5. Preview & Apply
- Click "Preview" → xem bảng rename plan
- Click "Copy" hoặc "Rename" → thực hiện copy/rename file
- Click "Done" → đánh dấu box hoàn tất, tự động mở box tiếp theo

### 6. Lặp lại
- Xử lý từng box cho đến khi tất cả done/skipped
- Khi hết box → thông báo "All boxes complete"

---

## Tính năng từ EAN Sorter → Bulk Working

Sau khi EAN Sorter scan và phát hiện duplicate groups, có thể chuyển thẳng sang Bulk Working:
- Navigate tự động với `{ source: "sorter", folder }` state
- Bulk Working nhận folder path và auto-scan

---

## Tính năng kỹ thuật

| Tính năng | Chi tiết |
|---|---|
| **CLIP AI** | Auto-classify ảnh vào Packshot/Lifestyle-Human/Lifestyle-Normal/Artwork |
| **Master Data** | Match folder names/EAN với Excel/CSV master data |
| **Import Map** | Import legacy mapping file (.txt/.csv/.tsv/.xlsx) |
| **Drag & Drop** | Kéo thả ảnh giữa kanban columns, hỗ trợ multi-select |
| **Batch Actions** | Preview → Copy/Rename cho toàn bộ box |
| **Naming Modes** | Per Category / Continuous / Prefixed |
| **Product + Category naming** | Optional checkbox: `{EAN}_{PRODUCT_NAME}_{CATEGORY}_{NUMBER}` with numbering restarted per category |
| **Output Modes** | Copy to folder / Rename in-place |
| **State Preservation** | Trạng thái box (active/done/skipped) được lưu |
| **Hover Preview** | Xem ảnh lớn khi hover |

---

## Files chính

| File | Mô tả |
|---|---|
| `frontend/src/components/bulk-working/BulkWorkingView.tsx` | Component chính (~800 lines) |
| `frontend/src/components/bulk-working/bulk-working.css` | CSS layout với prefix `.blk-*` |
| `frontend/src/components/ean-renamer/shared.css` | CSS dùng chung (cards, output bar, CLIP, hover) |
| `frontend/src/App.tsx` | Route `/bulk-working`, nav item, shortcut key `8` |
| `frontend/src/components/ToolViews.tsx` | Export BulkWorkingView |

---

## Phím tắt

- **8**: Mở Bulk Working tab (từ bất kỳ đâu trong app)

---

## Thay đổi liên quan

### EAN Renamer (cleanup)
- Đã xóa toàn bộ bulk state và functions khỏi EanRenamerView
- TopBar: bỏ toggle Single/Bulk, thêm Master Data button
- Footer: đơn giản hóa chỉ còn Preview/Copy/Undo

### EAN Sorter
- Thêm Duplicate Detection sub-view (3-tier: EAN → Code → Basename)
- Sau khi sort xong có thể navigate sang Bulk Working

### Folder Dialog Fix
- Sửa bug path jumping khi mở folder dialog
- C# desktop shell truyền `initialDir` đúng cách
