import requests
import json
from flask import Flask, render_template, request, json, jsonify
from flask_restful import Resource, Api, reqparse
from file_parser import openFile
from flask_cors import CORS
from algo import algo
from collections import defaultdict
app = Flask(__name__)
CORS(app)

@app.route('/')
def ping():
    return 'get pinged'

@app.route('/test', methods = ['GET', 'POST', 'OPTIONS'])
def test():
    if request.method == 'POST':
        data = request.get_json()
        course_info = str(data['num1'])
        additional_course_keys = str(data['num2'])
        additional_course_start_times = str(data['num3'])
        additional_course_end_times = str(data['num4'])
        additional_course_keys = additional_course_keys.split(',')
        additional_course_start_times = additional_course_start_times.split(',')
        additional_course_end_times = additional_course_end_times.split(',')
        additional_courses = defaultdict(list)
        for i in range(len(additional_course_keys)):
            additional_courses[additional_course_keys[i]].append([additional_course_start_times[i], additional_course_end_times[i]])
        courses = course_info.split(',')
        courses_list = algo(courses, additional_courses)
        result = courses_list

        response = {'status': 'OK', 'result': result}
        return jsonify(response)
    else:
        return jsonify({'status': 'Error', 'message': 'Invalid request method'})

if __name__ == '__main__':
    app.run(port=6969)

#testing2
# See PyCharm help at https://www.jetbrains.com/help/pycharm/
