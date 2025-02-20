import { test,expect } from "@playwright/test";
       
const baseURL="https://reqres.in";

//POST request with valid name and job fields and validates the response
test("POST/Create user with job details", async ({ request }) => {
    const apiURL = `${baseURL}/api/users`;
    const response = await request.post(apiURL, {
        
        data: {
            name: "John",
            job: "developer"
        }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    console.log(body)
}
); 

//POST request with valid name and phone number and validates the response
test("POST/Create user with phone no", async ({ request }) => {
    const apiURL = `${baseURL}/api/users`;
    const response = await request.post(apiURL, {
        
        data: {
            name: "John",
            phoneno: "0761668693"
        }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    console.log(body)
   
}
);