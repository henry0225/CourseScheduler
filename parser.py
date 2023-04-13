import csv

def openFile(fileName):
    rows = []
    with open(fileName, 'r') as file:
        csvreader = csv.reader(file)
        header = next(csvreader)
        for row in csvreader:
            rows.append(row)
    return (rows, header)

def writeFile(fileName, rows, header):
    with open(fileName, 'w') as f:
        # using csv.writer method from CSV package
        write = csv.writer(f)
        write.writerow(header)
        write.writerows(rows)

def parse(arr, header):
    arr_copy = [header]
    for row in arr:
        if "-" in row[5]:
            arr_copy.append(row)
    result = []
    for row in arr_copy:
        total_split_times = []
        split_time = row[5].split()
        for j in range(len(split_time) // 4):
            session = []
            for index in range(4):
                if index != 1:
                    session.append(split_time[j * 4 + index])

            for day in session[2]:
                separated_time = session[:-1]
                separated_time.append(day)
                total_split_times.append(separated_time)
        temp = row
        temp[5] = total_split_times
        result.append(temp)
    return result

def change_times(arr):
    result = []
    for row in arr:
        new_row = row
        times = []
        for time in row[5]:
            times.append(convert_to_164hr(time))
        new_row[5] = times
        result.append(new_row)
    return result
def convert_to_164hr(time):
    times = {'M': 0, 'T': 1440, 'W': 2880, 'R': 4320, 'F': 5760, 'S': 5200, 'U': 8640}
    start = [time[0][0:-5], time[0][-4:-2], time[0][-2:]]
    start_mins = int(start[1])
    start_mins += int(start[0]) * 60
    end = [time[1][0:-5], time[1][-4:-2], time[1][-2:]]
    end_mins = int(end[1])
    end_mins += int(end[0]) * 60
    day = time[2]
    if start[2] == "PM" and start[0] != "12":
        start_mins += 720
    if end[2] == "PM" and end[0] != "12":
        end_mins += 720
    print(time, start_mins + times[day], end_mins + times[day])
    return [start_mins + times[day], end_mins + times[day]]
rows, header = openFile("course_data_fall_2023.csv")[0], openFile("course_data_fall_2023.csv")[1]
modified = parse(rows, header)
writeFile("course_data_164hr.csv", modified[1:], header)