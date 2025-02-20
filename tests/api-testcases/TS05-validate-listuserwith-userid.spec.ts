import { test,expect } from "@playwright/test";

const baseURL="https://reqres.in";

//Validate that data from api/users
async  function fetchUserList(request) {
    const response = await request.get(`${baseURL}/api/users`);
    expect(response.status()).toBe(200);
    return await response.json();
}
//Validate that data from api/users/{id}
async function fetchUserById(request, Id: number) {
    const response = await request.get(`${baseURL}/api/users/${Id}`);
    expect(response.status()).toBe(200);
    return await response.json();
}

test('Validate user data between lists and single user API', async ({ request }) => {  
    
    const listData = await  fetchUserList(request);
    

    const selectedUser = listData.data[0];

    const userData = await fetchUserById(request, selectedUser.id);

    //Verify user details matches with selected user details
    expect(userData.data).toEqual(selectedUser);
    expect(userData.data.id).toBe(selectedUser.id);
    expect(userData.data.email).toBe(selectedUser.email);
    expect(userData.data.first_name).toBe(selectedUser.first_name);
    expect(userData.data.last_name).toBe(selectedUser.last_name);
    expect(userData.data.avatar).toBe(selectedUser.avatar);

    
});

//
