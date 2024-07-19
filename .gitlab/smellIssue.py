import os
import sys
import requests
import csv
from csv2md import table

def create_smell_issue(commit, smell_file_name, smell_file_content):
    headers = {
        "PRIVATE-TOKEN": "glpat-7bFzpRGRgnMs78UF1nLz"
    }
    title = f"{smell_file_name} for commit - {commit}"
    query_params = f"title={title}&labels=quality"
    body = {
        "description": {smell_file_content}
    }
    gitlab_output = requests.post(
        f"https://git.cs.dal.ca/api/v4/projects/{77379}/issues?{query_params}", headers=headers, data=body)

def get_smell_files(path):
    return [f for f in os.listdir(path) if os.path.join(path, f) and f.strip().endswith(".csv")]

def read_csv(file_path):
    with open(file_path) as csv_file:
        return list(csv.reader(csv_file))

def main(commit, smells_files_path):
    smell_files = get_smell_files(smells_files_path)

    for smell_file in smell_files:
        smell_file_content = table.Table(read_csv(os.path.join(smells_files_path, smell_file))).markdown()
        create_smell_issue(commit, smell_file, smell_file_content)

if __name__ == "__main__":
    main(sys.argv[1], "smells/")