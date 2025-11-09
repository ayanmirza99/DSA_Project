#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <sstream>

using namespace std;

struct Student
{
    string name;
    int grade;
    int roll;
};

string toJSON(const vector<Student> &students)
{
    string json = "[";
    for (size_t i = 0; i < students.size(); ++i)
    {
        json += "{\"name\":\"" + students[i].name + "\","
                                                    "\"grade\":" +
                to_string(students[i].grade) + ","
                                               "\"roll\":" +
                to_string(students[i].roll) + "}";
        if (i != students.size() - 1)
            json += ",";
    }
    json += "]";
    return json;
}

int main()
{
    cerr << "Program started..." << endl;
    vector<Student> students;
    string line;

    // Read all lines until EOF
    while (getline(cin, line))
    {
        if (line.empty())
            continue; // skip blanks instead of breaking
        istringstream iss(line);
        string name;
        int grade;
        int roll;
        if (!(iss >> name >> grade >> roll))
            continue; // skip malformed lines
        students.push_back({name, grade, roll});
    }

    if (students.empty())
    {
        cerr << "No student data received.\n";
        cout << "[]"; // return empty array safely
        return 0;
    }

    sort(students.begin(), students.end(), [](const Student &a, const Student &b)
         { return a.roll < b.roll; });

    cout << toJSON(students);
    return 0;
}
