#pragma once
#include <string>
#include <vector>
using namespace std;

struct Class {
    int id;
    string name;
    int teacherID;
    vector<int> studentIDs;
    vector<int> pendingInvites;
    vector<string> materials;
};
