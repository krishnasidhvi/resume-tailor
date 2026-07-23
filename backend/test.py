import requests
import docx

doc = docx.Document()
doc.add_paragraph('Hello world')
doc.save('test.docx')

with open('test.docx', 'rb') as f:
    res = requests.post('http://localhost:8000/api/resume/import', files={'file': ('test.docx', f, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')})
    print(res.status_code)
    print(res.text)
