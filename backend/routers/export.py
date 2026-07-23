import io
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from services.docgen import generate_docx, generate_pdf
import datetime

router = APIRouter()

class ExportRequest(BaseModel):
    content: str
    format: str

@router.post("/")
async def export_resume(req: ExportRequest):
    if req.format not in ["docx", "pdf"]:
        raise HTTPException(status_code=400, detail={"error": "Invalid format", "hint": "Format must be 'docx' or 'pdf'."})
    
    date_str = datetime.date.today().isoformat()
    filename = f"Resume_Tailored_{date_str}.{req.format}"
    
    try:
        if req.format == "docx":
            file_bytes = generate_docx(req.content)
            media_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        else:
            file_bytes = generate_pdf(req.content)
            media_type = "application/pdf"
            
        return StreamingResponse(
            io.BytesIO(file_bytes),
            media_type=media_type,
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail={"error": "Export Error", "hint": str(e)})
