import { test,expect } from "@playwright/test";

const baseURL="https://reqres.in";

async function fetchUsersByPage(request, page: number) {
    const response = await request.get(`${baseURL}/api/users?page=${page}`)
    expect(response.status()).toBe(200); 
    return await response.json();
}

//GET request to /api/users?page=2  
test("GET/page user details and has unique users", async ({ request }) => {
   // Fetches page 2 contains
    const page2Data=await fetchUsersByPage(request,2)
    console.log(page2Data)

    //verifies the correct number of users is returned

    const userCount = page2Data.data.length;
    console.log(`Total users on page 2: ${userCount}`);

    expect(userCount).toBe(6)
     
//Validates that the page, per_page, total, and total_pages fields in the response accurate values.

    expect(page2Data.page).toBe(2)
    expect(page2Data.per_page).toBe(6)
    expect(page2Data.total).toBe(12)
    expect(page2Data.total_pages).toBe(2)
   
      // Fetches page 1 contains
    const page1Data = await fetchUsersByPage(request, 1);
    //Fetches page 1 ids
    const page1Users =page1Data.data.map(user => user.id);
    
    console.log(page1Users)
     ////Fetches page 1 ids
    const page2Users = page2Data.data.map(user => user.id);
    console.log(page2Users)
   
//Verifies the users from the two pages are unique
   expect(page1Data).not.toContain(page2Data)
   expect(page1Users).not.toContain(page2Users)
});