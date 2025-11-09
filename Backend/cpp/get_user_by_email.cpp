#include "storage.hpp"
#include <iostream>
using namespace std;

int main()
{
    loadData();

    string email;
    getline(cin, email);

    auto it = users.find(email);
    if (it == users.end())
    {
        cout << "ERROR:NOT_FOUND";
        return 0;
    }

    User &u = it->second;

    // Build class list string
    string classList;
    for (size_t i = 0; i < u.classIDs.size(); ++i)
    {
        if (i)
            classList += ";";
        classList += to_string(u.classIDs[i]);
    }

    // Return all fields including passwordHash (node will compare using bcrypt)
    cout << "SUCCESS:" << u.id << "," << u.name << "," << u.email << "," << u.role << "," << u.identifier << "," << classList << "," << u.passwordHash;
    return 0;
}
