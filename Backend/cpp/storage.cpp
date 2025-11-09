#include "storage.hpp"
#include <fstream>
#include <sstream>
#include <algorithm>

std::unordered_map<std::string, User> users;
std::unordered_map<int, Class> classes;

int nextUserID = 1;
int nextClassID = 1;

void loadData()
{
    // Load Users
    ifstream userFile("./db/users.db");
    string line;
    if (userFile.is_open())
    {
        while (getline(userFile, line))
        {
            stringstream ss(line);
            User u;
            string classList;

            getline(ss, line, ',');
            u.id = stoi(line);
            getline(ss, u.name, ',');
            getline(ss, u.email, ',');
            getline(ss, u.passwordHash, ',');
            getline(ss, u.role, ',');
            getline(ss, u.identifier, ',');
            getline(ss, classList);

            stringstream cl(classList);
            string cid;
            while (getline(cl, cid, ';'))
                if (!cid.empty())
                    u.classIDs.push_back(stoi(cid));

            users[u.email] = u; // key by email
            nextUserID = max(nextUserID, u.id + 1);
        }
        userFile.close();
    }

    // Load Classes
    ifstream classFile("./db/classes.db");
    if (classFile.is_open())
    {
        while (getline(classFile, line))
        {
            stringstream ss(line);
            Class c;
            string studentList, inviteList, materialList;

            getline(ss, line, ',');
            c.id = stoi(line);
            getline(ss, c.name, ',');
            getline(ss, line, ',');
            c.teacherID = stoi(line);
            getline(ss, studentList, ',');
            getline(ss, inviteList, ',');
            getline(ss, materialList);

            // parse student IDs
            stringstream s1(studentList);
            while (getline(s1, line, ';'))
                if (!line.empty())
                    c.studentIDs.push_back(stoi(line));

            // parse pending invites
            stringstream s2(inviteList);
            while (getline(s2, line, ';'))
                if (!line.empty())
                    c.pendingInvites.push_back(stoi(line));

            // parse materials
            stringstream s3(materialList);
            while (getline(s3, line, ';'))
                if (!line.empty())
                    c.materials.push_back(line);

            classes[c.id] = c;
            nextClassID = max(nextClassID, c.id + 1);
        }
        classFile.close();
    }
}

void saveData()
{
    // Save Users
    ofstream userFile("./db/users.db", ios::trunc);
    if (userFile.is_open())
    {
        for (auto &p : users)
        {
            User &u = p.second;
            userFile << u.id << "," << u.name << "," << u.email << "," << u.passwordHash << "," << u.role << "," << u.identifier << ",";

            for (size_t i = 0; i < u.classIDs.size(); i++)
            {
                userFile << u.classIDs[i] << (i + 1 < u.classIDs.size() ? ";" : "");
            }
            userFile << "\n";
        }
        userFile.close();
    }

    // Save Classes
    ofstream classFile("./db/classes.db", ios::trunc);
    if (classFile.is_open())
    {
        for (auto &p : classes)
        {
            Class &c = p.second;
            classFile << c.id << "," << c.name << "," << c.teacherID << ",";

            // students
            for (size_t i = 0; i < c.studentIDs.size(); i++)
                classFile << c.studentIDs[i] << (i + 1 < c.studentIDs.size() ? ";" : "");
            classFile << ",";

            // pending invites
            for (size_t i = 0; i < c.pendingInvites.size(); i++)
                classFile << c.pendingInvites[i] << (i + 1 < c.pendingInvites.size() ? ";" : "");
            classFile << ",";

            // materials
            for (size_t i = 0; i < c.materials.size(); i++)
                classFile << c.materials[i] << (i + 1 < c.materials.size() ? ";" : "");

            classFile << "\n";
        }
        classFile.close();
    }
}
