import { test,expect } from "@playwright/test";

const baseURL="https://reqres.in";

async function fetchUsersByPage(request, page: number) {
    const response = await request.get(`${baseURL}/api/users?page=${page}`)
    expect(response.status()).toBe(200); 
    return await response.json();
}
async function validateUserFields(user: any) {
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('first_name');
    expect(user).toHaveProperty('last_name');
    expect(user).toHaveProperty('avatar');

}



test('Validate list user data, data count,no duplicate users', async ({ request }) => {

   
   //GET request to /api/users?page=1 and validate that the response
    const page1Data = await fetchUsersByPage(request, 1);
    const page1Users = page1Data.data;

    page1Users.forEach(user => validateUserFields(user));
   
    

    //GET request to /api/users?page=2 and validate that the response

    const page2Data = await fetchUsersByPage(request,2);
    const page2Users = page2Data.data;
    page2Users.forEach(user => validateUserFields(user));

    //Ensuring that no id from the user list on page 1 appears in the user list from page 2
    
    const page2UserIds = page2Data.data.map(user => user.id);
    console.log(page2UserIds)
    const page1UserIds =page1Data.data.map(user => user.id);
    console.log(page1UserIds)

    expect(page1UserIds).not.toEqual(page2UserIds)



   //Verify that the total number of users per page matches the per_page field in the response
    expect(page1Data.per_page).toBe(page1Data.data.length);
    expect(page2Data.per_page).toBe(page2Data.data.length);

    // Verify user IDs are sequential within a page
  for (let i = 1; i < page1UserIds.length; i++) {
    expect(page1UserIds[i]).toBeGreaterThan(page1UserIds[i - 1]);
  }
  for (let i = 1; i < page2UserIds.length; i++) {
    expect(page2UserIds[i]).toBeGreaterThan(page2UserIds[i - 1]);
  }
});

