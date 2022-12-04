#!/opt/pwn.college/python

import os
import pathlib
import tempfile
import contextlib
import urllib
import subprocess
import sqlite3
import ctypes

from flask import Flask, request, session, redirect
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


flag = open("./key").read().strip()
# config = (pathlib.Path(__file__).parent / ".config").read_text()
level = 10
challenge_host = "localhost"
hacker_host = "localhost"
app = Flask(__name__)
CORS(app)

class TemporaryDB:
    def __init__(self):
        self.db_file = tempfile.NamedTemporaryFile("x", suffix=".db")

    def execute(self, sql, parameters=()):
        connection = sqlite3.connect(self.db_file.name)
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()
        result = cursor.execute(sql, parameters)
        connection.commit()
        return result


db = TemporaryDB()


def html(code):
    return f"<html><body>{code}</body></html>\n"


def form(inputs):
    def form_input(**fields):
        return f"<input " + " ".join(f'{k}="{v}"' for k, v in fields.items() if v) + ">"
    inputs_html = "".join(form_input(name=name, type="text", placeholder=name) for name in inputs)
    submit_html = form_input(id="submit", type="submit", value="Submit")
    return html(f'<form method="POST">{inputs_html}{submit_html}</form>')


@contextlib.contextmanager
def run_browser():
    options = FirefoxOptions()
    options.add_argument("--headless")

    service = FirefoxService(log_path="/dev/null")
    driver = webdriver.Firefox(service=service, options=options)

    try:
        yield driver
    finally:
        driver.quit()


def level10():
    timezone = request.args.get("timezone", "UTC")
    return subprocess.check_output(f"TZ={timezone} date", shell=True, encoding="latin")


# @app.before_request
# def before_request():
#     if request.host != challenge_host:
#         return "Service Unavailable\n", 503


@app.route("/", methods=["GET", "POST"])
@app.route("/<path:path>", methods=["GET", "POST"])
def catch_all(path=""):
    challenge = globals()[f"level{level}"]
    return challenge()


# @app.after_request
# def after_request(response):
#     response.headers["Server"] = "pwn.college"
#     del response.headers["Content-Type"]
#     return response


# @app.errorhandler(AssertionError)
# def assertion_handler(error):
#     print(f"{error}\n")
#     return f"{error}\n", 400


# @app.errorhandler(Exception)
# def exception_handler(error):
#     import traceback
#     print(traceback.format_exc())
#     return traceback.format_exc(), 500


def challenge():
    # os.environ.clear()
    # os.environ["PATH"] = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
    os.setuid(os.geteuid())

    app.secret_key = flag
    app.run(challenge_host, 8888)


challenge()