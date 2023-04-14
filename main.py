import requests
import json
from flask import Flask, render_template, request, json, jsonify
from flask_restful import Resource, Api, reqparse
from file_parser import openFile
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def ping():
    return 'get pinged'

@app.route('/test', methods = ['GET', 'POST', 'OPTIONS'])
def test():
    if request.method == 'POST':
        data = request.get_json()
        num1 = int(data['num1'])
        num2 = int(data['num2'])
        result = num1 + num2
        response = {'status': 'OK', 'result': result}
        return jsonify(response)
    else:
        return jsonify({'status': 'Error', 'message': 'Invalid request method'})

if __name__ == '__main__':
    app.run(port=6969)

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
