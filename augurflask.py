from flask import Flask, request, send_from_directory, render_template
app = Flask(__name__, template_folder='.', static_folder='static')

import os
dir_path = os.path.dirname(os.path.realpath(__file__))

@app.route('/')
def hello_world():
    return render_template("welcome.html")

@app.route('/static/<path>')
def send_static(path):
    return send_from_directory('/static/', path)

@app.route('/risk/<owner>/<repo>')
def tab(owner, repo):
    return render_template("RiskCard2.html", owner=owner, repo=repo)

@app.route('/risk/<owner>/scans/<file>')
def getjson(owner, file):
    return render_template("static/js/scans/" + file)

@app.route('/risk/<owner>/static/<wd>/<file>')
def getload(owner, file, wd):
    return render_template("static/" + wd + "/" + file)

if __name__ == '__main__':
    app.run(debug=True)
    #app.run(debug=True, host="192.168.86.105")
