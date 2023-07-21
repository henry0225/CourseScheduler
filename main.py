import requests
import json
from flask import Flask, render_template, request, json, jsonify
from flask_restful import Resource, Api, reqparse
from file_parser import openFile
from flask_cors import CORS
from algo import algo
from file_parser import convert_to_164hr
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
        course_info = str(data['courseList'])
        earliest_time = str(data['earliest'])
        latest_time = str(data['latest'])
        custom_time = str(data['custom'])
        start_time_str, end_time_str = custom_time.split('-')
        # Step 2: Remove any leading/trailing whitespaces from the start and end time strings
        start_time_str = start_time_str.strip()
        end_time_str = end_time_str.strip()
        timeLimits = {}
        if custom_time != '':
            timeLimits['custom'] = [
                [start_time_str, end_time_str, 'M'],
                [start_time_str, end_time_str, 'T'],
                [start_time_str, end_time_str, 'W'],
                [start_time_str, end_time_str, 'R'],
                [start_time_str, end_time_str, 'F'],
                [start_time_str, end_time_str, 'S'],
                [start_time_str, end_time_str, 'U'],
            ]
        if earliest_time != '' and latest_time != '':
            timeLimits['TimeConstraints'] = [
                ['12:00AM', earliest_time, 'M'], [latest_time, '11:59PM', 'M'], 
                ['12:00AM', earliest_time, 'T'], [latest_time, '11:59PM', 'T'], 
                ['12:00AM', earliest_time, 'W'], [latest_time, '11:59PM', 'W'], 
                ['12:00AM', earliest_time, 'R'], [latest_time, '11:59PM', 'R'], 
                ['12:00AM', earliest_time, 'F'], [latest_time, '11:59PM', 'F'], 
                ['12:00AM', earliest_time, 'S'], [latest_time, '11:59PM', 'S'], 
                ['12:00AM', earliest_time, 'U'], [latest_time, '11:59PM', 'U']
            ]
        #additional_course_info = {'custom1': [[1, 2], [10,12]], 'custom2': [[2,3]], 'custom3': [[3,4]]}
        # additional_course_keys = str(data['num2'])
        # additional_course_start_times = str(data['num3'])
        # additional_course_end_times = str(data['num4'])
        # additional_course_keys = additional_course_keys.split(',')
        # additional_course_start_times = additional_course_start_times.split(',')
        # additional_course_end_times = additional_course_end_times.split(',')
        # additional_courses = defaultdict(list)
        # for i in range(len(additional_course_keys)):
        #     additional_courses[additional_course_keys[i]].append([additional_course_start_times[i], additional_course_end_times[i]])
        courses = course_info.split(',')
        courses_list = algo(courses, additional_courses=timeLimits)
        result = courses_list

        print(result, " result")
        response = {'status': 'OK', 'result': result}
        return jsonify(response)
    else:
        return jsonify({'status': 'Error', 'message': 'Invalid request method'})

if __name__ == '__main__':
    app.run(port=6969)

#testing2
# See PyCharm help at https://www.jetbrains.com/help/pycharm/
