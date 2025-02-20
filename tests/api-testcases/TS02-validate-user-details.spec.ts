import { test,expect } from "@playwright/test";

     const baseURL="https://reqres.in";

     //GET request to /api/users/2 and verifies the response
test("GET/Verify details of a specific user", async ({ request }) => {
  
    const resp = await request.get(`${baseURL}/api/users/2`)


    expect(resp.status()).toBe(200)
    expect(resp.ok()).toBeTruthy()

    const body=await resp.json()
    const userData= await body.data
    console.log(userData)
    expect(userData).toHaveProperty('id');
    expect(userData).toHaveProperty('email');
    expect(userData).toHaveProperty('first_name');
    expect(userData).toHaveProperty('last_name');
    expect(userData).toHaveProperty('avatar');
    //validate userdata is not empty
    expect(userData).toBeDefined()
});