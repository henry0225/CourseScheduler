import requests
import json
from flask import Flask, render_template, request, json, jsonify
from flask_restful import Resource, Api, reqparse
from file_parser import openFile
from flask_cors import CORS
from algo import algo
app = Flask(__name__)
CORS(app)

@app.route('/')
def ping():
    return 'get pinged'

@app.route('/test', methods = ['GET', 'POST', 'OPTIONS'])
def test():
    if request.method == 'POST':
        data = request.get_json()
        num1 = str(data['num1'])
        courses = num1.split(',')
        courses_list = algo(courses)
        result = [''.join(x) for x in courses_list]

        response = {'status': 'OK', 'result': result}
        return jsonify(response)
    else:
        return jsonify({'status': 'Error', 'message': 'Invalid request method'})

if __name__ == '__main__':
    app.run(port=6969)

#testing2
# See PyCharm help at https://www.jetbrains.com/help/pycharm/
