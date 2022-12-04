import os
import pathlib
import tempfile
import contextlib
import urllib
import subprocess
import ctypes

from flask import Flask, request, session, redirect
from flask_cors import CORS

level = 10
challenge_host = "localhost"
hacker_host = "localhost"
app = Flask(__name__)
CORS(app)

def level10():
    timezone = request.args.get("timezone", "UTC")
    return subprocess.check_output(f"TZ={timezone} date", shell=True, encoding="latin")


@app.route("/", methods=["GET", "POST"])
@app.route("/<path:path>", methods=["GET", "POST"])
def catch_all(path=""):
    challenge = globals()[f"level{level}"]
    return challenge()


def challenge():
    app.run(challenge_host, 8888)


challenge()