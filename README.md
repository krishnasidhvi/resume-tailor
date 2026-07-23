# Resume Tailor

A local web application that tailors your master resume to job descriptions without inventing information.

## Setup & Run
1. Install Python 3.11+ and Node 18+.
2. Install the `agy` CLI and make sure you are authenticated.
3. Run `start.bat` (Windows) or `start.sh` (Mac/Linux) to start both frontend and backend.

## Usage
1. Open the app at http://localhost:3000.
2. If this is your first time, go to the Editor page and import your existing PDF/DOCX resume.
3. On the Home page, paste a Job Description and click "Tailor My Resume".
4. Review the tailored resume, see the matching skills, and download as DOCX or PDF.

## Note on AI Engine
This app uses the locally installed `agy` CLI via a file-handoff pattern to ensure reliable output.
