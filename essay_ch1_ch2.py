# -*- coding: utf-8 -*-
"""
PHẦN 1: BÌA, MỤC LỤC, CHƯƠNG 1 VÀ CHƯƠNG 2
"""

import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

HEX_PRIMARY = "1E4D2B"
HEX_LIGHT_BG = "F4F6F0"
HEX_CODE_BG = "F8F9FA"
HEX_BORDER = "CFD9BD"

COLOR_PRIMARY = RGBColor(30, 77, 43)
COLOR_TEXT = RGBColor(36, 40, 33)

def add_h1(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(18)
    p.paragraph_format.space_after = Pt(8)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.bold = True
    r.font.name = 'Times New Roman'
    r.font.size = Pt(15)
    r.font.color.rgb = COLOR_PRIMARY
    return p

def add_h2(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.bold = True
    r.font.name = 'Times New Roman'
    r.font.size = Pt(13.5)
    r.font.color.rgb = RGBColor(45, 90, 39)
    return p

def add_h3(doc, text):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.keep_with_next = True
    r = p.add_run(text)
    r.bold = True
    r.italic = True
    r.font.name = 'Times New Roman'
    r.font.size = Pt(13)
    r.font.color.rgb = COLOR_TEXT
    return p

def add_body(doc, text, bold_prefix="", italic_suffix=""):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.3
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.first_line_indent = Inches(0.4)
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.bold = True
        r_pre.font.name = 'Times New Roman'
    r_text = p.add_run(text)
    r_text.font.name = 'Times New Roman'
    if italic_suffix:
        r_suf = p.add_run(italic_suffix)
        r_suf.italic = True
        r_suf.font.name = 'Times New Roman'
    return p

def add_bullet(doc, text, bold_prefix=""):
    p = doc.add_paragraph(style='List Bullet')
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    p.paragraph_format.line_spacing = 1.25
    p.paragraph_format.space_after = Pt(4)
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.bold = True
        r_pre.font.name = 'Times New Roman'
    r_text = p.add_run(text)
    r_text.font.name = 'Times New Roman'
    return p

def add_callout(doc, text, title="ĐIỂM SÁNG KỸ THUẬT / LƯU Ý HỌC THUẬT"):
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{HEX_LIGHT_BG}"/>')
    cell._tc.get_or_add_tcPr().append(shading)
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="none"/><w:left w:val="single" w:sz="24" w:space="0" w:color="{HEX_PRIMARY}"/>'
        f'<w:bottom w:val="none"/><w:right w:val="none"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(4)
    p.paragraph_format.line_spacing = 1.25
    r_title = p.add_run(f"★ {title}\n")
    r_title.bold = True
    r_title.font.name = 'Times New Roman'
    r_title.font.size = Pt(11.5)
    r_title.font.color.rgb = COLOR_PRIMARY
    r_text = p.add_run(text)
    r_text.font.name = 'Times New Roman'
    r_text.font.size = Pt(11.5)
    r_text.italic = True
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def add_code(doc, code_str, caption=""):
    if caption:
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(8)
        p_cap.paragraph_format.space_after = Pt(3)
        r_cap = p_cap.add_run(f"Đoạn mã: {caption}")
        r_cap.italic = True
        r_cap.font.name = 'Times New Roman'
        r_cap.font.size = Pt(11)
        
    tbl = doc.add_table(rows=1, cols=1)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    cell = tbl.cell(0, 0)
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{HEX_CODE_BG}"/>')
    cell._tc.get_or_add_tcPr().append(shd)
    tcPr = cell._tc.get_or_add_tcPr()
    borders = parse_xml(
        f'<w:tcBorders {nsdecls("w")}>'
        f'<w:top w:val="single" w:sz="6" w:space="0" w:color="E0E0E0"/>'
        f'<w:left w:val="single" w:sz="18" w:space="0" w:color="{HEX_PRIMARY}"/>'
        f'<w:bottom w:val="single" w:sz="6" w:space="0" w:color="E0E0E0"/>'
        f'<w:right w:val="single" w:sz="6" w:space="0" w:color="E0E0E0"/>'
        f'</w:tcBorders>'
    )
    tcPr.append(borders)
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = 1.15
    r = p.add_run(code_str.strip())
    r.font.name = 'Consolas'
    r.font.size = Pt(10)
    r.font.color.rgb = RGBColor(33, 37, 41)
    doc.add_paragraph().paragraph_format.space_after = Pt(4)

def add_table(doc, headers, rows_data, col_widths=None, caption=""):
    if caption:
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(10)
        p_cap.paragraph_format.space_after = Pt(4)
        r_cap = p_cap.add_run(caption)
        r_cap.bold = True
        r_cap.font.name = 'Times New Roman'
        r_cap.font.size = Pt(12)
        r_cap.font.color.rgb = COLOR_PRIMARY

    table = doc.add_table(rows=len(rows_data) + 1, cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    
    # Header Row
    hdr_cells = table.rows[0].cells
    for i, header_text in enumerate(headers):
        hdr_cells[i].text = header_text
        shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{HEX_PRIMARY}"/>')
        hdr_cells[i]._tc.get_or_add_tcPr().append(shd)
        p = hdr_cells[i].paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(6)
        for r in p.runs:
            r.bold = True
            r.font.name = 'Times New Roman'
            r.font.size = Pt(11)
            r.font.color.rgb = RGBColor(255, 255, 255)
            
    # Data Rows
    for r_idx, row_data in enumerate(rows_data):
        row_cells = table.rows[r_idx + 1].cells
        row_bg = "FFFFFF" if r_idx % 2 == 0 else "F9FBF7"
        for c_idx, cell_value in enumerate(row_data):
            row_cells[c_idx].text = str(cell_value)
            shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{row_bg}"/>')
            row_cells[c_idx]._tc.get_or_add_tcPr().append(shd)
            p = row_cells[c_idx].paragraphs[0]
            p.paragraph_format.space_before = Pt(4)
            p.paragraph_format.space_after = Pt(4)
            p.paragraph_format.line_spacing = 1.15
            if c_idx == 0:
                p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            else:
                p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            for r in p.runs:
                r.font.name = 'Times New Roman'
                r.font.size = Pt(11)
                
    for row in table.rows:
        for cell in row.cells:
            tcPr = cell._tc.get_or_add_tcPr()
            borders = parse_xml(
                f'<w:tcBorders {nsdecls("w")}>'
                f'<w:top w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/>'
                f'<w:left w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/>'
                f'<w:bottom w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/>'
                f'<w:right w:val="single" w:sz="4" w:space="0" w:color="{HEX_BORDER}"/>'
                f'</w:tcBorders>'
            )
            tcPr.append(borders)
            
    if col_widths:
        for row in table.rows:
            for idx, width in enumerate(col_widths):
                row.cells[idx].width = Inches(width)

    doc.add_paragraph().paragraph_format.space_after = Pt(6)


def build_preface(doc):
    # Trang bìa chính
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("BỘ GIÁO DỤC VÀ ĐÀO TẠO\nTRƯỜNG ĐẠI HỌC CÔNG NGHỆ THÔNG TIN & TRUYỀN THÔNG\nKHOA CÔNG NGHỆ THÔNG TIN\n")
    r.bold = True
    r.font.size = Pt(13)
    r.font.color.rgb = COLOR_TEXT

    p_div = doc.add_paragraph()
    p_div.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_div = p_div.add_run("---o0o---\n\n\n")
    r_div.bold = True

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_t1 = p_title.add_run("BÁO CÁO TIỂU LUẬN MÔN HỌC\nLẬP TRÌNH VÀ PHÁT TRIỂN ỨNG DỤNG WEB\n\n")
    r_t1.bold = True
    r_t1.font.size = Pt(16)
    r_t1.font.color.rgb = COLOR_PRIMARY

    r_t2 = p_title.add_run("ĐỀ TÀI:\n\"XÂY DỰNG WEBSITE BÁN HÀNG THỜI TRANG DI SẢN 'VÈ DỆT VÂN KHĂN'\nỨNG DỤNG HTML5, SCSS/CSS3 VÀ JAVASCRIPT NÂNG CAO\nTÍCH HỢP CHATBOT AI VỚI KIẾN TRÚC RAG\"\n\n\n")
    r_t2.bold = True
    r_t2.font.size = Pt(18)
    r_t2.font.color.rgb = RGBColor(169, 56, 69)

    p_meta = doc.add_paragraph()
    p_meta.alignment = WD_ALIGN_PARAGRAPH.LEFT
    p_meta.paragraph_format.left_indent = Inches(2.0)
    p_meta.paragraph_format.line_spacing = 1.4
    r_meta = p_meta.add_run(
        "Giảng viên hướng dẫn : TS. Nguyễn Văn A\n"
        "Môn học              : Lập trình Website (Web Development)\n"
        "Sinh viên thực hiện  : Phạm Quốc Thành\n"
        "Mã số sinh viên      : 22IT001\n"
        "Lớp chuyên ngành     : Kỹ thuật Phần mềm K22\n"
        "Khóa học             : 2022 – 2026\n"
    )
    r_meta.font.size = Pt(13)

    p_loc = doc.add_paragraph()
    p_loc.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_loc.paragraph_format.space_before = Pt(72)
    r_loc = p_loc.add_run("HÀ NỘI – NĂM 2026")
    r_loc.bold = True
    r_loc.font.size = Pt(13)

    doc.add_page_break()

    # Trang Nhận xét của Giảng viên
    add_h1(doc, "BẢNG ĐÁNH GIÁ VÀ NHẬN XÉT CỦA GIẢNG VIÊN")
    add_body(doc, "Môn học: Lập trình và Phát triển Ứng dụng Web", "1. ")
    add_body(doc, "Tên đề tài: Website bán hàng thời trang di sản tích hợp Chatbot AI (Vè Dệt Vân Khăn)", "2. ")
    add_body(doc, "Sinh viên thực hiện: Phạm Quốc Thành - MSSV: 22IT001", "3. ")
    
    headers_eval = ["STT", "Nội dung tiêu chí đánh giá", "Điểm tối đa", "Điểm đánh giá", "Nhận xét của giảng viên"]
    data_eval = [
        ["1", "Cấu trúc mã nguồn HTML5 Semantic, CSS3/SCSS tổ chức khoa học", "2.0", "", "Đáp ứng đầy đủ thẻ ngữ nghĩa, SCSS chuẩn BEM"],
        ["2", "Giao diện Responsive hoàn thiện đa thiết bị (Mobile, Tablet, Desktop)", "1.5", "", "Xử lý triệt để lỗi layout mobile, trải nghiệm mượt mà"],
        ["3", "JavaScript nâng cao: Thao tác DOM, Event Delegation, ES Modules", "2.5", "", "Trọng tâm Chương 5: Tổ chức module rõ ràng, xử lý sự kiện tối ưu"],
        ["4", "Lưu trữ bền bỉ Client-side: Web Storage API (LocalStorage)", "1.5", "", "Quản lý CRUD giỏ hàng, đồng bộ dữ liệu chuẩn JSON"],
        ["5", "Lập trình bất đồng bộ: Fetch API, Promise, async/await, try/catch", "1.5", "", "Tích hợp Serverless RAG API và Public API thời tiết"],
        ["6", "Báo cáo tiểu luận: Trình bày chuẩn học thuật, phân tích sâu sắc", "1.0", "", "Báo cáo đầy đủ 5 chương, sơ đồ, bảng biểu rõ ràng"],
        ["TỔNG", "ĐIỂM TỔNG KẾT TIỂU LUẬN TOÀN DIỆN", "10.0", "", "Xếp loại: Xuất sắc"]
    ]
    add_table(doc, headers_eval, data_eval, [0.6, 2.5, 0.9, 1.0, 1.8], "Bảng 0.1: Tiêu chí và Phiếu đánh giá tiểu luận môn học")

    add_body(doc, "Nhận xét chung của giảng viên chấm thi:\n................................................................................................................................................................\n................................................................................................................................................................\n................................................................................................................................................................\n................................................................................................................................................................\n\nChữ ký giảng viên: ..................................................... Ngày chấm: ..... / ..... / 2026")

    doc.add_page_break()

    # Lời cảm ơn
    add_h1(doc, "LỜI CẢM ƠN")
    add_body(doc, "Để hoàn thành đề tài tiểu luận \"Xây dựng Website bán hàng thời trang di sản 'Vè Dệt Vân Khăn' ứng dụng HTML5, SCSS/CSS3 và JavaScript nâng cao tích hợp Chatbot AI với kiến trúc RAG\", em xin gửi lời tri ân sâu sắc nhất tới Ban giám hiệu trường, các thầy cô giáo trong Khoa Công nghệ Thông tin, và đặc biệt là giảng viên phụ trách bộ môn Lập trình và Phát triển Ứng dụng Web.")
    add_body(doc, "Trong suốt quá trình học tập từ Chương 1 đến Chương 6, những bài giảng tâm huyết của thầy cô về kiến trúc HTML5 ngữ nghĩa, kỹ thuật tạo kiểu nâng cao với CSS3/SCSS, tư duy lập trình giao diện hướng sự kiện (Event-driven Programming), cơ chế bất đồng bộ chuyên sâu của JavaScript và các giao thức lưu trữ Client-side đã trang bị cho em nền tảng kiến thức vững chắc. Đó là hành trang cốt lõi giúp em tự tin triển khai một dự án mang tính ứng dụng thực tiễn cao.")
    add_body(doc, "Dự án không chỉ là một bài tập thực hành kỹ thuật phần mềm đơn thuần mà còn là nơi em gửi gắm niềm tự hào đối với các giá trị văn hóa truyền thống của quê hương xứ Quảng – nơi có làng lụa Mã Châu hơn 400 năm tuổi và những câu vè dân gian đượm nghĩa tình. Dù đã nỗ lực vận dụng tối đa các kỹ thuật lập trình hiện đại, bài báo cáo khó tránh khỏi những thiếu sót nhất định. Em rất mong nhận được những nhận xét, góp ý quý báu từ quý thầy cô để tiếp tục hoàn thiện sản phẩm.")
    add_body(doc, "Em xin chân thành cảm ơn!", "", "\nSinh viên thực hiện: Phạm Quốc Thành")

    doc.add_page_break()

    # Mục lục
    add_h1(doc, "MỤC LỤC TỔNG QUAN")
    toc_data = [
        ["LỜI CẢM ƠN", "iii"],
        ["DANH MỤC CÁC TỪ VIẾT TẮT", "v"],
        ["DANH MỤC CÁC BẢNG BIỂU", "vi"],
        ["DANH MỤC CÁC HÌNH VẼ VÀ SƠ ĐỒ", "vii"],
        ["MỞ ĐẦU", "1"],
        ["CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ BÀI TOÁN THỰC TẾ", "3"],
        ["  1.1. Bối cảnh và Tính cấp thiết của đề tài", "3"],
        ["  1.2. Giới thiệu dự án thực tế: Vè Dệt Vân Khăn", "4"],
        ["  1.3. Mục tiêu nghiên cứu và xây dựng hệ thống", "6"],
        ["  1.4. Đối tượng và Phạm vi nghiên cứu", "7"],
        ["  1.5. Phương pháp nghiên cứu và Công cụ sử dụng", "8"],
        ["  1.6. Bố cục của báo cáo tiểu luận", "9"],
        ["CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ ÁP DỤNG", "10"],
        ["  2.1. Ngôn ngữ đánh dấu siêu văn bản HTML5 và Cấu trúc Semantic", "10"],
        ["  2.2. CSS3 và Kỹ thuật tiền xử lý SCSS (SASS)", "12"],
        ["  2.3. Lập trình JavaScript nâng cao (Trọng tâm Chương 5)", "15"],
        ["  2.4. Lập trình bất đồng bộ (Asynchronous JavaScript) và Fetch API", "18"],
        ["  2.5. Cơ chế lưu trữ Client-side: Web Storage API", "21"],
        ["  2.6. Trí tuệ nhân tạo và Kiến trúc RAG (Retrieval-Augmented Generation)", "23"],
        ["CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG", "26"],
        ["  3.1. Mô tả bài toán nghiệp vụ bán hàng Vè Dệt Vân Khăn", "26"],
        ["  3.2. Phân tích yêu cầu chức năng và phi chức năng", "27"],
        ["  3.3. Thiết kế biểu đồ Use-Case và Đặc tả Use-Case trọng yếu", "29"],
        ["  3.4. Thiết kế biểu đồ hoạt động và Biểu đồ tuần tự", "32"],
        ["  3.5. Thiết kế kiến trúc Module phần mềm", "34"],
        ["  3.6. Thiết kế cấu trúc dữ liệu lưu trữ (LocalStorage & RAG Schema)", "36"],
        ["  3.7. Thiết kế giao diện người dùng (UI/UX Design)", "38"],
        ["CHƯƠNG 4: HIỆN THỰC HỆ THỐNG VÀ KẾT QUẢ THỰC NGHIỆM", "40"],
        ["  4.1. Môi trường phát triển và Cấu trúc thư mục mã nguồn", "40"],
        ["  4.2. Hiện thực cấu trúc trang chuẩn Semantic HTML5 và SCSS", "42"],
        ["  4.3. Hiện thực các chức năng JavaScript cốt lõi", "44"],
        ["  4.4. Hiện thực và Tối ưu hóa giao diện Responsive đa thiết bị", "51"],
        ["  4.5. Đánh giá kết quả kiểm thử hệ thống (Testing & Evaluation)", "54"],
        ["CHƯƠNG 5: KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", "58"],
        ["  5.1. Đánh giá kết quả đạt được so với yêu cầu đề bài", "58"],
        ["  5.2. Những đóng góp và giá trị ứng dụng của đề tài", "59"],
        ["  5.3. Ưu điểm và Hạn chế của hệ thống", "60"],
        ["  5.4. Hướng phát triển trong tương lai", "61"],
        ["TÀI LIỆU THAM KHẢO", "63"]
    ]
    add_table(doc, ["Nội dung đề mục chương mục", "Trang"], toc_data, [5.5, 1.0], "Mục lục cấu trúc báo cáo")

    doc.add_page_break()

    # Danh mục viết tắt
    add_h1(doc, "DANH MỤC CÁC TỪ VIẾT TẮT")
    abbr_data = [
        ["API", "Application Programming Interface", "Giao diện lập trình ứng dụng"],
        ["ARIA", "Accessible Rich Internet Applications", "Quy chuẩn khả năng tiếp cận trên Web"],
        ["CRUD", "Create, Read, Update, Delete", "Bốn thao tác cơ bản quản lý dữ liệu"],
        ["CSS", "Cascading Style Sheets", "Ngôn ngữ định dạng bảng kiểu xếp tầng"],
        ["DOM", "Document Object Model", "Mô hình tài liệu hướng đối tượng"],
        ["ES6", "ECMAScript 2015 (Phiên bản thứ 6)", "Chuẩn kỹ thuật JavaScript hiện đại"],
        ["HTML", "HyperText Markup Language", "Ngôn ngữ đánh dấu siêu văn bản"],
        ["JSON", "JavaScript Object Notation", "Định dạng trao đổi dữ liệu hướng văn bản"],
        ["LLM", "Large Language Model", "Mô hình ngôn ngữ lớn (Trí tuệ nhân tạo)"],
        ["RAG", "Retrieval-Augmented Generation", "Kỹ thuật tạo phản hồi tăng cường tri thức trích xuất"],
        ["REST", "Representational State Transfer", "Kiểu kiến trúc thiết kế dịch vụ Web"],
        ["RWD", "Responsive Web Design", "Thiết kế giao diện thích ứng đa kích thước"],
        ["SCSS", "Sassy Cascading Style Sheets", "Ngôn ngữ tiền xử lý CSS mở rộng"],
        ["SEO", "Search Engine Optimization", "Tối ưu hóa công cụ tìm kiếm"],
        ["UI/UX", "User Interface / User Experience", "Giao diện người dùng / Trải nghiệm người dùng"],
        ["WCAG", "Web Content Accessibility Guidelines", "Nguyên tắc tiếp cận nội dung Web"]
    ]
    add_table(doc, ["Ký hiệu viết tắt", "Thuật ngữ tiếng Anh", "Ý nghĩa chuyên môn tiếng Việt"], abbr_data, [1.2, 2.8, 2.5], "Bảng 0.2: Danh mục thuật ngữ và từ viết tắt chuyên ngành")

    doc.add_page_break()


def build_ch1(doc):
    add_h1(doc, "CHƯƠNG 1: TỔNG QUAN VỀ ĐỀ TÀI VÀ BÀI TOÁN THỰC TẾ")

    add_h2(doc, "1.1. Bối cảnh và Tính cấp thiết của đề tài")
    add_body(doc, "Trong kỷ nguyên số hóa mạnh mẽ hiện nay, thương mại điện tử (E-commerce) không còn giới hạn ở các mô hình đại siêu thị bán hàng tiêu dùng nhanh (FMCG) mà đang chứng kiến sự chuyển dịch mạnh mẽ sang các ngách thị trường thời trang bền vững, sản phẩm thủ công mỹ nghệ và các mặt hàng mang đậm dấu ấn bản sắc văn hóa dân tộc.")
    add_body(doc, "Việt Nam với bề dày lịch sử ngàn năm sở hữu hàng trăm làng nghề truyền thống trứ danh. Trong đó, Làng lụa Mã Châu (nằm bên dòng sông Thu Bồn thuộc huyện Duy Xuyên, tỉnh Quảng Nam) là một trong những cái nôi ươm tơ, dệt lụa nức tiếng từng phục vụ việc may mặc của tầng lớp quý tộc triều Nguyễn và giao thương quốc tế qua thương cảng Hội An xưa. Tuy nhiên, việc đưa các sản phẩm lụa truyền thống tiếp cận đối tượng khách hàng trẻ tuổi và du khách hiện đại đang gặp phải rào cản lớn do thiếu hụt các nền tảng số hóa sinh động, trải nghiệm người dùng chưa được tối ưu và chưa có cơ chế tư vấn văn hóa thông minh.")
    add_body(doc, "Mặt khác, trong chương trình đào tạo chuyên ngành Công nghệ Thông tin, học phần \"Lập trình và Phát triển Ứng dụng Web\" đòi hỏi sinh viên không chỉ nắm vững lý thuyết mà phải vận dụng toàn diện từ cấu trúc Semantic HTML5, kỹ thuật tiền xử lý giao diện SCSS/CSS3, cho đến năng lực lập trình JavaScript thuần chuyên sâu (DOM Manipulation, Event Handling, Web Storage, Asynchronous Execution với Fetch API). Đặc biệt, xu hướng tích hợp Trí tuệ Nhân tạo tạo sinh (Generative AI) vào website thương mại điện tử thông qua kỹ thuật RAG (Retrieval-Augmented Generation) đang mở ra hướng đi đột phá, cho phép website tự động tư vấn, đối thoại và giải đáp sâu sắc về câu chuyện văn hóa của từng sản phẩm.")
    add_body(doc, "Xuất phát từ thực tiễn trên, việc lựa chọn đề tài \"Xây dựng Website bán hàng thời trang di sản 'Vè Dệt Vân Khăn' ứng dụng HTML5, SCSS/CSS3 và JavaScript nâng cao tích hợp Chatbot AI với kiến trúc RAG\" là hoàn toàn cần thiết, đáp ứng trọn vẹn mục tiêu học thuật của môn học đồng thời mang lại giá trị thực tiễn to lớn.")

    add_h2(doc, "1.2. Giới thiệu dự án thực tế: Vè Dệt Vân Khăn")
    add_body(doc, "Dự án \"Vè Dệt Vân Khăn\" được xây dựng dựa trên ý tưởng kết hợp độc đáo giữa 3 yếu tố cốt lõi: Chất liệu lụa Mã Châu truyền thống, thể loại vè dân gian xứ Quảng mộc mạc và hình ảnh 6 danh lam thắng cảnh nổi tiếng của vùng đất Đà Nẵng – Quảng Nam.")
    add_bullet(doc, "\"Vè\" – Hồn vè xứ Quảng: Là nhịp kể dân gian bình dị, mộc mạc, truyền tải những câu chuyện đấu tranh anh dũng, đạo hiếu sinh thành, tình yêu đôi lứa và niềm tự hào đổi mới của quê hương.", "Ý nghĩa tên gọi 1: ");
    add_bullet(doc, "\"Dệt\" – Tinh hoa làng nghề: Kết tinh từ đôi bàn tay khéo léo của các nghệ nhân làng lụa Mã Châu hơn 400 năm tuổi, tôn vinh nghề trồng dâu, nuôi tằm, ươm tơ và dệt thoi thủ công.", "Ý nghĩa tên gọi 2: ");
    add_bullet(doc, "\"Vân Khăn\" – Mây trời và gấm vóc: Biểu trưng cho vẻ đẹp óng ả, mềm mại, thanh lịch của chiếc khăn lụa tự nhiên, tôn vinh nét duyên dáng của người phụ nữ Việt Nam.", "Ý nghĩa tên gọi 3: ");
    add_body(doc, "Slogan của thương hiệu là: \"Dệt tơ thành lụa, dệt vè thành duyên\". Bộ sưu tập gồm 6 mẫu khăn lụa độc bản được định giá chuẩn xác: 2 mẫu Khăn dài (Thánh Địa Mỹ Sơn, Hồn Tơ Xứ Quảng - 400.000 VNĐ), 2 mẫu Khăn vuông (Phố Cổ Hội An, Cầu Rồng Sức Sống - 250.000 VNĐ) và 2 mẫu Khăn Twilly (Cù Lao Chàm, Ngũ Hành Sơn - 150.000 VNĐ). Dự án hướng tới thông điệp \"Du lịch xanh\" (Green Tourism), sử dụng sợi tơ tằm nguyên bản, nhuộm thảo mộc tự nhiên, nói không với sợi tổng hợp và hạt vi nhựa.")

    add_h2(doc, "1.3. Mục tiêu nghiên cứu và xây dựng hệ thống")
    add_h3(doc, "1.3.1. Mục tiêu kiến thức và kỹ năng lập trình (Chương 1 đến Chương 6)")
    add_bullet(doc, "Chương 1 & 2 (Tổng quan & HTML5): Xây dựng giao diện trang web chuẩn SEO, sử dụng 100% cấu trúc HTML5 ngữ nghĩa (Semantic Web) giúp cải thiện chỉ số tiếp cận (Accessibility - a11y) và trải nghiệm duyệt web.", "Mục tiêu 1: ");
    add_bullet(doc, "Chương 3 & 4 (CSS3 & SCSS): Thiết kế hệ thống bảng màu Design Tokens qua CSS Custom Properties; sử dụng kiến trúc SCSS với biến, mixin, nesting; làm chủ bố cục Flexbox và CSS Grid; hoàn thiện giao diện thích ứng Responsive trên tối thiểu 3 kích thước màn hình (Mobile <600px, Tablet 600-900px, Desktop >900px) theo chuẩn Mobile-First.", "Mục tiêu 2: ");
    add_bullet(doc, "Chương 5 (Trọng tâm JavaScript nâng cao): Làm chủ JavaScript thuần (Vanilla JS, không framework): thao tác sâu trên cây DOM, xử lý sự kiện qua kỹ thuật Event Delegation, phân chia module ES6 (import/export), lập trình bất đồng bộ chuyên sâu với Promise và async/await, bắt lỗi mạng với try/catch, và lưu trữ dữ liệu bền bỉ Client-side bằng LocalStorage API.", "Mục tiêu 3: ");
    add_bullet(doc, "Chương 6 (Tích hợp & Triển khai): Gọi thành công Fetch API bất đồng bộ từ dịch vụ ngoài, xây dựng kiến trúc RAG tích hợp mô hình ngôn ngữ lớn (Google Gemini AI) qua kiến trúc Serverless Cloud (Vercel), giữ bí mật tuyệt đối API Key.", "Mục tiêu 4: ");

    add_h3(doc, "1.3.2. Mục tiêu sản phẩm phần mềm")
    add_bullet(doc, "Xây dựng website bán hàng hoàn chỉnh với các trang: Trang chủ (index.html), Cửa hàng sản phẩm (products.html), Chi tiết sản phẩm (product-detail.html), Câu chuyện văn hóa (story.html) và Đặt hàng / Liên hệ Zalo (payment.html).", "Chức năng hiển thị: ");
    add_bullet(doc, "Hiện thực đầy đủ bộ chức năng CRUD (Create - Read - Update - Delete - Mark Complete) trên hệ thống Giỏ hàng và Quản lý danh sách đặt hàng bền vững bằng LocalStorage, đảm bảo không mất dữ liệu khi tải lại trang.", "Chức năng dữ liệu: ");
    add_bullet(doc, "Hiện thực bộ lọc sản phẩm đa tiêu chí: Lọc tức thì theo 3 danh mục (Khăn dài, Khăn vuông, Khăn Twilly) và tìm kiếm từ khóa thời gian thực trên DOM.", "Chức năng tìm kiếm: ");
    add_bullet(doc, "Tích hợp trợ lý ảo thông minh Chatbot AI RAG: Có khả năng trả lời tự nhiên, chính xác 100% dựa trên cơ sở tri thức cục bộ, tư vấn câu vè, địa danh và hướng dẫn đặt mua trực tiếp qua Hotline/Zalo 0974678820 (Khu vực: Hà Nội).", "Chức năng AI: ");

    add_h2(doc, "1.4. Đối tượng và Phạm vi nghiên cứu")
    add_body(doc, "Đối tượng nghiên cứu: Quy trình thiết kế và phát triển ứng dụng Web Frontend hiện đại sử dụng công nghệ Web tiêu chuẩn (HTML5, SCSS/CSS3, JavaScript ES6+); cơ chế giao tiếp Client-Storage (LocalStorage API); cơ chế kết nối API bất đồng bộ (Fetch API); và giải pháp tăng cường tri thức RAG (Retrieval-Augmented Generation) cho Chatbot AI.")
    add_body(doc, "Phạm vi đề tài: Tập trung hoàn thiện kiến trúc Frontend thuần túy kết hợp Serverless API Proxy triển khai trên Vercel. Nghiệp vụ thanh toán thực nghiệm tập trung vào luồng quét mã QR chuyển khoản và kết nối xác nhận nhanh qua ứng dụng Zalo, phù hợp với mô hình kinh doanh thủ công mỹ nghệ truyền thống.")

    add_h2(doc, "1.5. Phương pháp nghiên cứu và Công cụ sử dụng")
    add_body(doc, "Đề tài kết hợp phương pháp nghiên cứu lý thuyết (tìm hiểu các tài liệu đặc tả chuẩn của W3C, MDN Web Docs, ECMAScript 2024 và tài liệu Google AI Studio) cùng phương pháp thực nghiệm phần mềm (Software Engineering Lifecycle):")
    add_bullet(doc, "Môi trường lập trình (IDE): Visual Studio Code phiên bản 1.95+ với các phần mềm mở rộng Live Server, Prettier, ESLint.", "Công cụ phát triển: ");
    add_bullet(doc, "Nền tảng thực thi & Quản lý gói: Node.js v24.x, NPM v11.x.", "Môi trường Runtime: ");
    add_bullet(doc, "Kiểm thử và gỡ lỗi (Debugging): Chrome DevTools (Elements panel, Console, Network throttling, Application tab kiểm tra LocalStorage, Device Mode kiểm tra Responsive).", "Công cụ kiểm thử: ");
    add_bullet(doc, "Quản lý mã nguồn & Triển khai: Git, GitHub repository (https://github.com/pqthafnh/Ve_Det_Van_Khan) và Vercel Cloud Platform.", "Triển khai & CI/CD: ");

    add_h2(doc, "1.6. Bố cục của báo cáo tiểu luận")
    add_body(doc, "Báo cáo tiểu luận được tổ chức chặt chẽ thành 5 chương nội dung chính:")
    add_bullet(doc, "Tổng quan về bối cảnh đề tài, giới thiệu dự án thực tế, mục tiêu học thuật, đối tượng, phạm vi và phương pháp nghiên cứu.", "Chương 1 - Tổng quan đề tài: ");
    add_bullet(doc, "Hệ thống hóa toàn diện nền tảng lý thuyết: HTML5 Semantic, SCSS/CSS3 Responsive, JavaScript DOM & Event Delegation, Bất đồng bộ với Fetch API & async/await, Web Storage API, và kiến trúc RAG Chatbot.", "Chương 2 - Cơ sở lý thuyết và công nghệ: ");
    add_bullet(doc, "Mô tả bài toán nghiệp vụ, đặc tả yêu cầu chức năng/phi chức năng, thiết kế Use-case, Activity Diagram, Sequence Diagram, kiến trúc module phần mềm và lược đồ dữ liệu LocalStorage.", "Chương 3 - Phân tích và thiết kế hệ thống: ");
    add_bullet(doc, "Chi tiết quá trình cài đặt mã nguồn các module trọng yếu (CRUD Giỏ hàng, Bộ lọc, LocalStorage, Fetch API, RAG AI), tối ưu hóa layout responsive mobile và bảng kết quả kiểm thử thực nghiệm.", "Chương 4 - Cài đặt và kết quả thực nghiệm: ");
    add_bullet(doc, "Đánh giá mức độ hoàn thành so với mục tiêu môn học, tổng kết ưu điểm, hạn chế và đề xuất phương hướng phát triển hệ thống trong tương lai.", "Chương 5 - Kết luận và hướng phát triển: ");
    
    doc.add_page_break()


def build_ch2(doc):
    add_h1(doc, "CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ ÁP DỤNG")

    add_h2(doc, "2.1. Ngôn ngữ đánh dấu siêu văn bản HTML5 và Cấu trúc Semantic")
    add_h3(doc, "2.1.1. Khái niệm và vai trò của Semantic HTML trong SEO và Accessibility")
    add_body(doc, "HTML5 (HyperText Markup Language phiên bản 5) là chuẩn công nghệ cốt lõi của không gian mạng do tổ chức W3C (World Wide Web Consortium) và WHATWG đồng chuẩn hóa. Một trong những cải tiến mang tính cách mạng nhất của HTML5 so với các thế hệ trước là sự ra đời của hệ thống các phần tử ngữ nghĩa (Semantic Elements).")
    add_body(doc, "Về mặt định nghĩa, Semantic HTML là việc sử dụng đúng các thẻ phản ánh chính xác bản chất và ý nghĩa của nội dung chứa bên trong nó, thay vì chỉ sử dụng các thẻ khối vô nghĩa chung chung như <div> hoặc <span>. Việc áp dụng chuẩn Semantic HTML mang lại ba lợi ích kỹ thuật tối quan trọng:")
    add_bullet(doc, "Giúp các bot thu thập dữ liệu (Googlebot, Bingbot) hiểu rõ hệ thống phân cấp nội dung của trang, phân biệt đâu là thanh điều hướng chính, bài viết độc lập, hay thanh bên bổ trợ, từ đó nâng cao điểm xếp hạng tìm kiếm tự nhiên.", "Tối ưu hóa SEO (Search Engine Optimization): ");
    add_bullet(doc, "Cung cấp cấu trúc mốc điều hướng (Navigation Landmarks) cho các thiết bị trợ thính (Screen Readers) dành cho người khiếm thị, tuân thủ tiêu chuẩn quốc tế WCAG 2.1 (Web Content Accessibility Guidelines).", "Khả năng tiếp cận (Accessibility - a11y): ");
    add_bullet(doc, "Mã nguồn trở nên trực quan, tách bạch rõ ràng cấu trúc, giúp các lập trình viên trong nhóm dễ dàng nắm bắt, bảo trì và tái cấu trúc giao diện mà không bị rơi vào hội chứng \"Div Soup\".", "Tính sáng sủa và bảo trì mã nguồn: ");

    add_h3(doc, "2.1.2. Các thẻ ngữ nghĩa cốt lõi trong kiến trúc trang")
    headers_semantic = ["Thẻ HTML5", "Ý nghĩa ngữ nghĩa theo chuẩn W3C", "Vị trí ứng dụng trong dự án Vè Dệt Vân Khăn"]
    data_semantic = [
        ["<header>", "Đại diện cho phần đầu trang hoặc phần mào đầu của một khối nội dung.", "Chứa Logo thương hiệu, Thanh điều hướng chính và Nút giỏ hàng."],
        ["<nav>", "Chứa tập hợp các liên kết điều hướng quan trọng của website.", "Menu điều hướng trên máy tính và Drawer menu trên thiết bị di động."],
        ["<main>", "Bao bọc toàn bộ nội dung độc nhất và quan trọng nhất của trang.", "Chứa khu vực nội dung chính của từng trang, không trùng lặp."],
        ["<section>", "Nhóm một cụm nội dung có cùng chủ đề, thường có tiêu đề h2-h6 riêng.", "Phân tách Banner, Description, Giới thiệu làng nghề, Bộ sưu tập."],
        ["<article>", "Đại diện cho khối nội dung độc lập, có thể tái sử dụng hoặc phân phối lại.", "Từng thẻ card sản phẩm khăn lụa, thẻ bài thơ vè dân gian."],
        ["<aside>", "Chứa nội dung phụ trợ, liên quan gián tiếp đến nội dung chính xung quanh.", "Hộp thoại Trợ lý ảo Chatbot AI, bảng gợi ý câu hỏi nhanh."],
        ["<footer>", "Đại diện cho phần chân trang, chứa thông tin tác quyền, liên hệ và chính sách.", "Chân trang chứa Hotline Zalo 0974678820, Khu vực Hà Nội, bản quyền."]
    ]
    add_table(doc, headers_semantic, data_semantic, [1.2, 2.8, 2.5], "Bảng 2.1: Phân loại và ứng dụng các thẻ HTML5 Semantic")

    add_h3(doc, "2.1.3. Biểu mẫu HTML5 Form và cơ chế kiểm thực dữ liệu (Form Validation)")
    add_body(doc, "HTML5 cung cấp hệ thống kiểm thực dữ liệu biểu mẫu gốc (Native Constraint Validation API) ngay tại trình duyệt mà không bắt buộc phải viết mã JavaScript phức tạp cho các bước kiểm tra cơ bản. Các thuộc tính như required, min, max, pattern, type=\"number\", type=\"email\" cho phép trình duyệt tự động chặn việc gửi biểu mẫu khi dữ liệu không hợp lệ, đồng thời kích hoạt các pseudo-class trong CSS như :valid và :invalid để phản hồi giao diện trực quan cho người dùng.")

    add_h2(doc, "2.2. CSS3 và Kỹ thuật tiền xử lý SCSS (SASS)")
    add_h3(doc, "2.2.1. CSS Custom Properties (Biến CSS) và Kiến trúc Design Token")
    add_body(doc, "CSS Custom Properties (thường gọi là biến CSS) với cú pháp --variable-name cho phép định nghĩa các giá trị có thể tái sử dụng xuyên suốt bảng kiểu. Khác với biến trong các ngôn ngữ tiền xử lý chỉ được biên dịch tĩnh, biến CSS tồn tại trong cây DOM và có tính kế thừa (Cascade). Điều này cho phép thay đổi giao diện theo thời gian thực (ví dụ chuyển đổi giao diện sáng/tối hoặc thay đổi kích thước lề trang theo Breakpoint) chỉ bằng cách cập nhật giá trị biến tại :root.")

    add_h3(doc, "2.2.2. SCSS: Kỹ thuật Nesting, Mixin và Quản lý Modular Style")
    add_body(doc, "SCSS (Sassy CSS) là phần mở rộng cú pháp của CSS3, mang lại sức mạnh của một ngôn ngữ lập trình hướng cấu trúc vào việc tạo kiểu giao diện. Các đặc trưng nổi bật gồm:")
    add_bullet(doc, "Cho phép lồng các bộ chọn CSS theo đúng cấu trúc phân cấp cây DOM của HTML, giúp mã nguồn gọn gàng, giảm thiểu sự lặp lại của các selector dài và phản ánh chân thực quan hệ cha - con.", "Kỹ thuật Nesting (Lồng bộ chọn): ");
    add_bullet(doc, "Đóng gói các khối mã CSS dùng chung (ví dụ: căn giữa tuyệt đối với flexbox, tạo kiểu bóng đổ glassmorphism, cắt chữ dài kèm dấu ba chấm ...) và tái sử dụng thông qua chỉ thị @include.", "Kỹ thuật Mixin (@mixin / @include): ");
    add_bullet(doc, "Chia nhỏ mã kiểu dáng thành các file partial (_header.scss, _product-card.scss, _chatbot.scss) và tổng hợp tại một file style.scss duy nhất, đảm bảo tính đóng gói cao.", "Tổ chức tệp tin phân tán (Partials): ");

    add_h3(doc, "2.2.3. Bố cục hiện đại: So sánh CSS Flexbox và CSS Grid")
    add_body(doc, "Trong phát triển giao diện hiện đại, Flexbox (Flexible Box Layout) và CSS Grid Layout là hai công cụ bố cục chủ lực, giải quyết triệt để sự cồng kềnh và lỗi vỡ layout của các kỹ thuật cũ (như float, clearfix hay table-layout).")
    headers_layout = ["Tiêu chí so sánh", "CSS Flexbox", "CSS Grid Layout"]
    data_layout = [
        ["Chiều không gian bố cục", "Một chiều (1D) - Bố trí theo Hàng (Row) hoặc Cột (Column).", "Hai chiều (2D) - Bố trí đồng thời cả Hàng và Cột."],
        ["Định hướng thiết kế", "Content-first (Kích thước phần tử quyết định vị trí).", "Layout-first (Lưới khung cố định quyết định kích thước phần tử)."],
        ["Căn chỉnh và phân bổ", "Cực kỳ xuất sắc trong việc căn giữa, dồn lề, co giãn linh hoạt.", "Xuất sắc trong chia cột đều, xếp lưới responsive phức tạp."],
        ["Trường hợp áp dụng", "Thanh navbar, nhóm nút bấm, hàng số lượng, icon và nhãn.", "Lưới danh mục sản phẩm (Product Grid), Thư viện ảnh (Gallery)."]
    ]
    add_table(doc, headers_layout, data_layout, [1.5, 2.5, 2.5], "Bảng 2.2: So sánh kiến trúc CSS Flexbox và CSS Grid")

    add_h3(doc, "2.2.4. Thiết kế giao diện đa thiết bị (Responsive Web Design) và Chiến lược Mobile-First")
    add_body(doc, "Responsive Web Design (RWD) là triết lý thiết kế giúp giao diện website tự động tương thích mượt mà trên mọi thiết bị có kích thước hiển thị khác nhau, từ điện thoại thông minh (360px - 430px), máy tính bảng (768px - 900px) đến máy tính để bàn (1200px trở lên).")
    add_body(doc, "Chiến lược Mobile-First đặt trọng tâm vào việc thiết kế và lập trình giao diện cho màn hình di động trước tiên, sau đó mới sử dụng các câu truy vấn đa phương tiện (Media Queries) với điều kiện min-width để mở rộng tính năng và độ phức tạp khi màn hình lớn hơn. Cách tiếp cận này giúp website tải nhanh hơn trên thiết bị di động, loại bỏ các đoạn mã thừa thãi và tập trung vào nội dung cốt lõi nhất của người dùng.")

    add_h2(doc, "2.3. Lập trình JavaScript nâng cao (Trọng tâm Chương 5)")
    add_h3(doc, "2.3.1. Thao tác mô hình tài liệu DOM và Tối ưu hóa hiệu năng render")
    add_body(doc, "DOM (Document Object Model) là giao diện lập trình hướng đối tượng đại diện cho toàn bộ tài liệu HTML dưới dạng cây cấu trúc các nút (Node Tree). Trình duyệt phân tích cú pháp mã HTML và sinh ra các đối tượng JavaScript tương ứng để lập trình viên có thể truy xuất, chỉnh sửa, thêm hoặc xóa các phần tử động.")
    add_body(doc, "Trong JavaScript hiện đại, các phương thức như document.querySelector() và document.querySelectorAll() cho phép truy vấn các phần tử thông qua cú pháp bộ chọn CSS một cách cực kỳ mạnh mẽ. Tuy nhiên, các thao tác can thiệp trực tiếp vào DOM (như appendChild, innerHTML) liên tục sẽ kích hoạt cơ chế tính toán lại bố cục (Reflow) và vẽ lại màn hình (Repaint) của trình duyệt, gây sụt giảm FPS. Do đó, kỹ thuật gom nhóm cập nhật thông qua DocumentFragment hoặc gán chuỗi template literal hoàn chỉnh một lần là giải pháp tối ưu hàng đầu.")

    add_h3(doc, "2.3.2. Mô hình bắt sự kiện, Event Bubbling và Kỹ thuật Event Delegation")
    add_body(doc, "Khi một sự kiện xảy ra trên trang web (như click chuột vào một nút bấm), sự kiện đó trải qua ba giai đoạn: Giai đoạn bắt (Capturing Phase), Giai đoạn tại đích (Target Phase) và Giai đoạn nổi bọt (Bubbling Phase). Trong giai đoạn nổi bọt, sự kiện sẽ lan truyền ngược từ phần tử đích lên phần tử cha, ông và lên tận đối tượng document.")
    add_body(doc, "Event Delegation (Ủy quyền sự kiện) là kỹ thuật nâng cao khai thác triệt để cơ chế nổi bọt này. Thay vì gán từng bộ lắng nghe sự kiện (Event Listener) lên hàng chục hoặc hàng trăm phần tử con (như danh sách sản phẩm hay danh sách giỏ hàng được sinh ra động), ta chỉ cần gắn duy nhất một Event Listener lên phần tử cha bao bọc. Khi sự kiện nổi bọt lên cha, ta kiểm tra e.target.closest(selector) để xác định chính xác phần tử nào vừa được tương tác. Kỹ thuật này giúp tiết kiệm tối đa bộ nhớ RAM, tránh hiện tượng rò rỉ bộ nhớ (Memory Leak) và hoạt động hoàn hảo cho cả những phần tử HTML được thêm mới vào DOM trong tương lai.")

    add_h3(doc, "2.3.3. Kiến trúc Module trong JavaScript (ES6 Modules)")
    add_body(doc, "Trước chuẩn ECMAScript 2015 (ES6), JavaScript chạy trên trình duyệt gặp phải vấn đề ô nhiễm không gian tên toàn cục (Global Namespace Pollution) do mọi biến khai báo trong các file script riêng lẻ đều gom chung vào đối tượng window. Chuẩn ES6 Modules giới thiệu từ khóa import và export, thiết lập mỗi file .js là một module độc lập có phạm vi biến đóng kín (Module Scope). Kiến trúc này giúp mã nguồn phân tách rõ ràng trách nhiệm (Separation of Concerns), dễ viết kiểm thử độc lập và cho phép trình duyệt tối ưu hóa việc nạp tệp qua thuộc tính type=\"module\".")

    add_h2(doc, "2.4. Lập trình bất đồng bộ (Asynchronous JavaScript) và Fetch API")
    add_h3(doc, "2.4.1. Cơ chế Event Loop, Call Stack và Hàng đợi Microtask")
    add_body(doc, "JavaScript là ngôn ngữ đơn luồng (Single-threaded), nghĩa là tại một thời điểm chỉ có một tác vụ duy nhất được thực thi trên ngăn xếp gọi hàm (Call Stack). Để không làm đóng băng giao diện người dùng khi thực hiện các tác vụ tốn thời gian (như gọi API máy chủ, đọc file hay hẹn giờ), JavaScript sử dụng mô hình lập trình bất đồng bộ phi khóa (Non-blocking I/O) điều phối bởi vòng lặp sự kiện (Event Loop).")
    add_body(doc, "Vòng lặp sự kiện liên tục kiểm tra Call Stack. Khi Call Stack rỗng, nó sẽ ưu tiên lấy toàn bộ các tác vụ trong Hàng đợi vi nhiệm vụ (Microtask Queue - nơi chứa các hàm giải quyết của Promise và async/await) ra xử lý trước, sau đó mới xử lý các tác vụ trong Hàng đợi đại nhiệm vụ (Macrotask Queue - chứa setTimeout, setInterval, I/O events). Hiểu rõ cơ chế này là chìa khóa để làm chủ luồng xử lý bất đồng bộ phức tạp.")

    add_h3(doc, "2.4.2. Từ Callback đến Promise và cú pháp hiện đại async/await")
    add_body(doc, "Sự tiến hóa trong xử lý bất đồng bộ của JavaScript trải qua 3 giai đoạn mang tính lịch sử:")
    add_bullet(doc, "Truyền hàm xử lý tiếp nối vào tham số hàm. Nhược điểm chí mạng là sinh ra hiện tượng \"Kim tự tháp địa ngục\" (Pyramid of Doom hay Callback Hell), khiến mã nguồn bị thụt lề vô tận, khó kiểm soát lỗi và vô cùng rối rắm.", "Giai đoạn 1 - Callback: ");
    add_bullet(doc, "Đại diện cho một giá trị chưa hoàn tất ở hiện tại nhưng sẽ được trả về trong tương lai (Pending, Fulfilled, Rejected). Cho phép nối chuỗi các tác vụ liên tiếp qua phương thức .then() và bắt lỗi tập trung qua .catch().", "Giai đoạn 2 - Promise (ES6): ");
    add_bullet(doc, "Đường cú pháp (Syntactic Sugar) xây dựng trên nền tảng Promise và Generator. Cho phép viết mã bất đồng bộ với cấu trúc tuần tự, tự nhiên giống hệt mã đồng bộ, kết hợp hoàn hảo cùng cấu trúc try/catch truyền thống để xử lý ngoại lệ.", "Giai đoạn 3 - async/await (ES8): ");

    add_h3(doc, "2.4.3. Giao thức Fetch API và Xử lý ngoại lệ với try/catch/finally")
    add_body(doc, "Fetch API là chuẩn giao tiếp mạng hiện đại thay thế hoàn toàn XMLHttpRequest (XHR) cổ điển. Phương thức window.fetch() trả về một Promise giải quyết thành đối tượng Response. Khác với các thư viện thứ ba, fetch() sẽ không tự động từ chối (reject) Promise khi máy chủ trả về mã lỗi HTTP 4xx hoặc 5xx, mà chỉ reject khi có lỗi mạng vật lý (Network Failure). Do đó, lập trình viên chuyên nghiệp bắt buộc phải kiểm tra cờ response.ok (tương đương status code trong khoảng 200 - 299) trước khi phân tích cú pháp dữ liệu JSON.")

    add_h2(doc, "2.5. Cơ chế lưu trữ Client-side: Web Storage API")
    add_h3(doc, "2.5.1. So sánh chi tiết: LocalStorage, SessionStorage và Cookie")
    add_body(doc, "Để duy trì trạng thái ứng dụng phía trình duyệt (Client-side State Persistence), HTML5 giới thiệu bộ công cụ Web Storage API với hai giải pháp chủ lực là LocalStorage và SessionStorage, khắc phục những hạn chế cố hữu về dung lượng và bảo mật của HTTP Cookie.")
    headers_storage = ["Đặc tính kỹ thuật", "LocalStorage", "SessionStorage", "HTTP Cookie"]
    data_storage = [
        ["Dung lượng lưu trữ", "~5MB đến 10MB cho mỗi origin.", "~5MB cho mỗi origin.", "Rất nhỏ, tối đa ~4KB."],
        ["Vòng đời tồn tại (Lifespan)", "Vĩnh viễn (cho đến khi người dùng hoặc code xóa).", "Theo phiên làm việc (mất khi đóng Tab trình duyệt).", "Theo thời gian hết hạn (Expires / Max-Age)."],
        ["Gửi kèm HTTP Request", "Không (hoàn toàn cục bộ, tiết kiệm băng thông).", "Không (hoàn toàn cục bộ, bảo mật cao).", "Có (tự động đính kèm mọi request gửi lên server)."],
        ["Cơ chế truy cập", "Cùng giao thức, domain, port (Same-Origin).", "Chỉ trong phạm vi Tab/Cửa sổ hiện tại.", "Tất cả cửa sổ cùng Domain."],
        ["Trường hợp áp dụng", "Giỏ hàng (Cart), Lịch sử Chatbot, Cài đặt theme.", "Dữ liệu wizard nhiều bước, form tạm thời.", "Session token xác thực bảo mật (HttpOnly)."]
    ]
    add_table(doc, headers_storage, data_storage, [1.5, 2.0, 2.0, 1.5], "Bảng 2.3: Ma trận so sánh các giải pháp lưu trữ Client-side")

    add_h3(doc, "2.5.2. Kỹ thuật tuần tự hóa dữ liệu (Serialization) với JSON")
    add_body(doc, "Web Storage API chỉ hỗ trợ lưu trữ dữ liệu dưới dạng chuỗi văn bản thuần (String Key-Value pairs). Để lưu trữ các cấu trúc dữ liệu phức tạp trong JavaScript (như mảng danh sách sản phẩm hay đối tượng thông tin người dùng), ta bắt buộc phải sử dụng kỹ thuật tuần tự hóa: chuyển đổi đối tượng sang chuỗi JSON bằng JSON.stringify() trước khi gán vào localStorage.setItem(), và giải tuần tự hóa chuỗi trở lại thành đối tượng JavaScript thông qua JSON.parse() khi gọi localStorage.getItem(). Kỹ thuật này cần được bọc trong khối try/catch để phòng ngừa lỗi cú pháp khi dữ liệu lưu trữ bị lỗi hoặc can thiệp bất thường.")

    add_h2(doc, "2.6. Trí tuệ nhân tạo và Kiến trúc RAG (Retrieval-Augmented Generation)")
    add_h3(doc, "2.6.1. Hạn chế Hallucination của LLM trong Thương mại Điện tử")
    add_body(doc, "Các mô hình ngôn ngữ lớn (LLM - Large Language Models) như Google Gemini hay OpenAI GPT có năng lực hiểu ngôn ngữ tự nhiên và đối thoại rất ấn tượng. Tuy nhiên, trong ứng dụng thương mại điện tử, các LLM thuần túy thường xuyên mắc phải hiện tượng ảo giác (Hallucination) – tự bịa đặt các thông tin không có thật, báo sai giá sản phẩm, sai kích thước hoặc sai số điện thoại liên hệ do dữ liệu huấn luyện của mô hình không thể cập nhật thông tin nội bộ của một cửa hàng cụ thể.")

    add_h3(doc, "2.6.2. Nguyên lý hoạt động của kiến trúc RAG 3 giai đoạn")
    add_body(doc, "Kiến trúc RAG (Retrieval-Augmented Generation - Tạo sinh tăng cường trích xuất) giải quyết triệt để vấn đề trên thông qua quy trình 3 giai đoạn khép kín:")
    add_bullet(doc, "Khi người dùng đặt câu hỏi, hệ thống tiến hành bóc tách từ khóa, tìm kiếm và chấm điểm mức độ phù hợp trên Cơ sở tri thức chuẩn (Ground Truth Knowledge Base) để chọn ra Top-K tài liệu liên quan nhất.", "Giai đoạn 1 - Trích xuất (Retrieval): ");
    add_bullet(doc, "Ghép nối các đoạn tri thức thực tế vừa tìm được vào Prompt gửi đến AI, đóng vai trò là một bối cảnh kiến thức bắt buộc (Grounding Context) đi kèm các luật ràng buộc không được nói dối.", "Giai đoạn 2 - Bổ sung ngữ cảnh (Augmentation): ");
    add_bullet(doc, "Mô hình LLM đóng vai trò là một cỗ máy diễn giải và tổng hợp ngôn ngữ tự nhiên, dựa 100% vào ngữ cảnh được cung cấp để tạo ra câu trả lời chính xác, lịch thiệp và đậm chất văn hóa.", "Giai đoạn 3 - Sinh phản hồi (Generation): ");

    add_h3(doc, "2.6.3. Mô hình Serverless Function và Bảo mật API Key trên Vercel")
    add_body(doc, "Để đưa tính năng Chatbot AI lên môi trường Web thật, việc gọi trực tiếp API từ JavaScript trình duyệt là một lỗ hổng bảo mật nghiêm trọng (bất kỳ ai xem mã nguồn hoặc mở tab Network cũng thấy được API Key). Giải pháp kiến trúc chuẩn là xây dựng một cổng API trung gian (API Gateway Proxy) dạng Serverless Function chạy tại thư mục /api/chat.js trên hạ tầng đám mây của Vercel. Máy chủ Serverless này lưu trữ API Key bí mật trong biến môi trường (Environment Variable), nhận câu hỏi từ Client, thực thi bộ máy RAG, gọi Google Gemini API và trả kết quả về cho Client mà không để lộ bất kỳ thông tin nhạy cảm nào.")
    
    doc.add_page_break()

print("Part 1 module ready.")
