import webview
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def main_window(request: Request):
    return templates.TemplateResponse("main.html", {"request": request})

@app.get("/hello", response_class=HTMLResponse)
async def hello_window(request: Request):
    return templates.TemplateResponse("hello.html", {"request": request})

@app.get("/calculator", response_class=HTMLResponse)
async def calculator_window(request: Request):
    return templates.TemplateResponse("calculator.html", {"request": request})

@app.get("/job_application", response_class=HTMLResponse)
async def job_application_window(request: Request):
    return templates.TemplateResponse("job_application.html", {"request": request})

if __name__ == "__main__":
    webview.create_window("Main Window", "http://localhost:8000")
    webview.start()