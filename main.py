import requests
import json
from flask import Flask, render_template, request, json
from flask_restful import Resource, Api, reqparse
from file_parser import openFile

app = Flask(__name__)
api = Api(app)

@app.route('/ping')
def ping():
    return 'get pinged'

@app.route('/signUpUser', methods=['POST'])
def get_courses():
    user =  request.form['username'];
    password = request.form['password'];
    return json.dumps({'status':'OK','user':user,'pass':password});

if __name__ == '__main__':
    app.run()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
