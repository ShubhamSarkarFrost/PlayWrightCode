const {test, expect} = require('@playwright/test');



test('verify title of automation practice website', async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    // get - title - assertions 
   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
})

test('Verify Incorrect Username and Password error message is displayed', async({page}) => {
    const Username = page.locator('#username');
    const CardTitles = page.locator(".card-body a")
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //CSS 
    await Username.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await page.locator("#signInBtn").click();
    //await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    //to clear the Textbox 
    await Username.fill("");
    await Username.fill("rahulshettyacademy");
    await page.locator("#signInBtn").click();
    const firstElement = await CardTitles.nth(1);
    await expect(firstElement).toContainText("Samsung Note 8")
    const allTitles = await CardTitles.allTextContents();



})