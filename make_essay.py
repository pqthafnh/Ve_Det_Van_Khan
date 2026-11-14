# -*- coding: utf-8 -*-
"""
CHƯƠNG TRÌNH TẠO TIỂU LUẬN HỌC THUẬT HOÀN CHỈNH (20 - 40 TRANG)
Đề tài: "Xây dựng Website bán hàng thời trang di sản 'Vè Dệt Vân Khăn'
        ứng dụng HTML5, SCSS/CSS3 và JavaScript nâng cao tích hợp Chatbot AI với kiến trúc RAG"
Môn học: Lập trình và Phát triển Ứng dụng Web
"""

import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def init_doc():
    doc = Document()
    
    # Chuẩn lề trang văn bản học thuật (Top 2cm, Bottom 2cm, Left 3cm, Right 2cm)
    for section in doc.sections:
        section.top_margin = Inches(0.79)     # 2.0 cm
        section.bottom_margin = Inches(0.79)  # 2.0 cm
        section.left_margin = Inches(1.18)    # 3.0 cm (đóng gáy tiểu luận)
        section.right_margin = Inches(0.79)   # 2.0 cm
        section.page_width = Inches(8.27)     # A4
        section.page_height = Inches(11.69)   # A4
        
    # Typography chuẩn
    normal = doc.styles['Normal']
    normal.font.name = 'Times New Roman'
    normal.font.size = Pt(13)
    normal.font.color.rgb = RGBColor(36, 40, 33)
    normal.paragraph_format.line_spacing = 1.3
    normal.paragraph_format.space_after = Pt(6)
    
    return doc

print("Init module ready.")
