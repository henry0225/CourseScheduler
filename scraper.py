import requests
import pandas as pd
from bs4 import BeautifulSoup

url = "https://courses.rice.edu/courses/!SWKSCAT.cat?p_action=NARROW&p_term=202410&p_onebar=&p_mode=AND&p_submit=&as_fid=f38e77cee3757c49fb5b4b82ce8ffe2cda2607cd"
r = requests.get(url)
#print(r)

soup = BeautifulSoup(r.text, 'lxml')

table = soup.find("table", class_ = "table table-condensed")
headers = table.find_all("th")
titles = []

for i in headers:
    title = i.text
    titles.append(title)

df = pd.DataFrame(columns=titles)

rows = table.find_all("tr")

for i in rows[1:]:
    data = i.find_all("td")
    row = [tr.text for tr in data]
    l = len(df)
    df.loc[l] = row
    
#print(df)

df.to_csv("course_data_fall_2023.csv")

