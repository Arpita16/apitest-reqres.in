🛠️ **Installation (if needed)**__
- IDE: Visual Studio or WebStorm
- NodeJS
- Playwright installations
   npm init -y
   npm install -D playwright typescript @playwright/test
   npx playwright install
   npx tsc --init


📂**Folder Structure**
tests/
├─ api/
│  └─ login.spec.ts
playwright.config.ts
package.json
tsconfig.json

✅ **Steps Covered in tests:**
**Setup:** Install Playwright and TypeScript (if not already set up).
**Test Structure:** Use beforeAll to set up any preconditions, test to execute the request, and afterAll to handle post-test cleanup.
**API Automation:** Make a request to the endpoint.
**Assertions:** Verify status code and response body.
