import copy
import csv
import ast

def parse_csv_file(file_path):
    courses = {}
    crn_info = {}
    sections_info = {}
    with open(file_path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            if len(row) != 0:
                section = row[1]
                course_name = row[2]
                time_slots_str = row[5]
                course_name = course_name[:-4]
                # Parse the time slots string into a list of lists of integers using ast.literal_eval()
                time_slots = ast.literal_eval(time_slots_str)

                # If the course name is not in the courses, add it with an empty dictionary as the value
                if course_name not in courses:
                    courses[course_name] = []
                # Add the section as key and time slots as value in the inner dictionary
                courses[course_name].append(section)
                sections_info[section] = course_name
                crn_info[section] = time_slots

    return courses, crn_info, sections_info

# Example usage
courses_info, crn_info, sections_info = parse_csv_file("course_data_164hr.csv")
original_crn_info = parse_csv_file("course_data_modified.csv")[1]
#additional_course_info = {'custom1': [[1, 2], [10,12]], 'custom2': [[2,3]], 'custom3': [[3,4]]}
#print(courses_info)
def parse_additional_courses(additional_dict):
    for course in additional_dict.keys():
        courses_info[course] = [course]
        crn_info[course] = additional_dict[course]
    pass

#parse_additional_courses(additional_course_info)
#print(courses_info, crn_info)

def check_compatible(crns):
    times = []
    for crn in crns:
        for time in crn_info[crn]:
            times.append(time)
    
    times.sort(key=lambda x: int(x[0]))

    for i in range(1, len(times)):
        if int(times[i - 1][1]) > int(times[i][0]):
            return False
        
    return True
def generate_combinations(courses):
    course_list = copy.deepcopy(courses)
    if not courses:
        return [[]]

    course_name = course_list.pop()
    sections = courses_info[course_name]
    remaining_combinations = generate_combinations(course_list)
    combinations = []
    for section in sections:
        for remaining_combination in remaining_combinations:
            new_combination = [section] + remaining_combination
            if check_compatible(new_combination):
                combinations.append(new_combination)

    return combinations
def algo(course_list, additional_courses):
    parse_additional_courses(additional_courses)
    courses = copy.deepcopy(course_list)
    for key in additional_courses:
        courses.append(key)
    combinations = generate_combinations(courses)
    res = []
    for combo in combinations:
         temp_combo = []
         for crn in combo:
             temp = sections_info[crn] + " CRN: " + crn
             temp_combo.append((temp, original_crn_info[crn]))
         res.append(temp_combo)
    #print(combinations)
    #return combinations
    return res
course_list = ['COMP 182', 'MATH 355', 'ELEC 220']
#additional_courses = ['custom1', 'custom2', 'custom3']
print(algo(course_list, {}))

