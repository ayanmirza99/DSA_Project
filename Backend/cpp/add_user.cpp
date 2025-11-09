#include "storage.hpp"
#include <iostream>
#include <sstream>

int main()
{
    loadData();

    User u;
    string classList;

    getline(cin, u.name);
    getline(cin, u.email);
    getline(cin, u.passwordHash);
    getline(cin, u.role);
    getline(cin, u.identifier); // new line in input
    getline(cin, classList);    // classIDs separated by ';' (can be empty)

    // check exists
    if (users.find(u.email) != users.end())
    {
        cout << "ERROR:EMAIL_EXISTS";
        return 0;
    }

    if (!classList.empty())
    {
        stringstream cl(classList);
        string cid;
        while (getline(cl, cid, ';'))
            if (!cid.empty())
                u.classIDs.push_back(stoi(cid));
    }

    u.id = nextUserID++;
    users[u.email] = u;
    saveData();

    cout << "SUCCESS:" << u.id;
    return 0;
}
