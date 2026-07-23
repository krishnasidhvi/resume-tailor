import io

def parse_document(content: bytes, filename: str) -> str:
    if filename.lower().endswith(".pdf"):
        import pdfplumber
        text_pages = []
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    text_pages.append(text)
        return "\n\n".join(text_pages)
    elif filename.lower().endswith(".docx"):
        import docx
        doc = docx.Document(io.BytesIO(content))
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        return "\n\n".join(paragraphs)
    else:
        raise ValueError("Unsupported file format")
