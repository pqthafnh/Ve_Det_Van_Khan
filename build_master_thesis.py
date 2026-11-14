# -*- coding: utf-8 -*-
"""
BUILD MASTER THESIS (.DOCX)
Tổng hợp toàn bộ các chương thành tệp Báo cáo tiểu luận hoàn chỉnh
"""

import os
from make_essay import init_doc
from essay_ch1_ch2 import build_preface, build_ch1, build_ch2
from essay_ch3_ch4_ch5 import build_ch3, build_ch4, build_ch5, build_references

def main():
    print("Bắt đầu khởi tạo cấu trúc tiểu luận học thuật...")
    doc = init_doc()
    
    print("1. Đang xây dựng Phần Mở đầu, Bìa, Mục lục, Danh mục viết tắt...")
    build_preface(doc)
    
    print("2. Đang xây dựng Chương 1: Tổng quan đề tài...")
    build_ch1(doc)
    
    print("3. Đang xây dựng Chương 2: Cơ sở lý thuyết và Công nghệ...")
    build_ch2(doc)
    
    print("4. Đang xây dựng Chương 3: Phân tích và Thiết kế hệ thống...")
    build_ch3(doc)
    
    print("5. Đang xây dựng Chương 4: Hiện thực và Kết quả thực nghiệm...")
    build_ch4(doc)
    
    print("6. Đang xây dựng Chương 5: Kết luận và Hướng phát triển...")
    build_ch5(doc)
    
    print("7. Đang xây dựng Danh mục Tài liệu tham khảo...")
    build_references(doc)
    
    output_filename = "Bao_Cao_Tieu_Luan_Web_Ban_Hang_Chatbot_AI.docx"
    output_path = os.path.join(os.getcwd(), output_filename)
    
    doc.save(output_path)
    file_size_kb = os.path.getsize(output_path) / 1024
    print(f"\n=======================================================")
    print(f"THÀNH CÔNG! Đã tạo báo cáo tiểu luận Word:")
    print(f"Tệp tin: {output_path}")
    print(f"Kích thước tệp: {file_size_kb:.2f} KB")
    print(f"=======================================================")

if __name__ == "__main__":
    main()
