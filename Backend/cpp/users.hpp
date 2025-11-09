// users.hpp
#pragma once
#include <string>
#include <vector>
using namespace std;

struct User {
    int id;
    string name;
    string email;
    string passwordHash;
    string role;            // "TEACHER" or "STUDENT"
    string identifier;      // employee id or roll no (empty if none)
    vector<int> classIDs;   // classes this user belongs to
};
