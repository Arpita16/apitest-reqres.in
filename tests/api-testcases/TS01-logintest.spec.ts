import { test,expect,request} from "@playwright/test";


const baseURL="https://reqres.in"
//POST request with valid credential
test("POST/login with valid credential", async ({ request }) => {
    const apiURL = `${baseURL}/api/login`;
    const response = await request.post(apiURL, {
        headers: {
           
            "token": "QpwL5tke4Pnpja7X4",
        },
        data: {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeTruthy();
});

//POST request with invalid credentials

test("POST/login with missing data", async ({ request }) => {
    const apiURL = `${baseURL}/api/login`;
    const response = await request.post(apiURL, {
        headers: {
           
            "token": "QpwL5tke4Pnpja7X4",
        },
        data: {
           
            password: "cityslicka"
        }
    });
    console.log(await response.json())
    expect(response.status()).toBe(400);
    const body = await response.json();
    
});

//POST request missing authorization
test("POST/login with valid data & without authorization", async ({ request }) => {
    const apiURL = "https://reqres.in/api/login";
    const response = await request.post(apiURL, {
        
        data: {
           
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }
    });
    console.log(await response.json())
    expect(response.status()).toBe(200);
    const body = await response.json();
    
});


