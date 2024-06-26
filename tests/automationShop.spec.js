import { faker } from '@faker-js/faker/locale/en';
const {test, expect} = require('@playwright/test');


test('Verify Shoping Page Registration and Login Functionality', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/client/");

    const registerButton = page.locator("a.btn1");
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const emailAddress = page.locator("#userEmail");
    const phoneNumber = page.locator("#userMobile");
    const occupation = page.locator("select.custom-select.ng-untouched.ng-pristine.ng-valid");
    const gender = page.locator("input[value='Male']");
    const password = page.locator("#userPassword");
    const confirmPassword = page.locator("#confirmPassword");
    const consentCheckbox = page.locator("input[type='checkbox']");
    const registrationButton = page.locator("#login");
    const loginButton = page.locator("button.btn.btn-primary");
    const logoAutomation = page.locator("label[class='logo']");



    await registerButton.click();
    await firstName.fill(faker.person.firstName());
    await lastName.fill(faker.person.lastName());
    await emailAddress.fill(faker.internet.email({ firstName: 'Jeanne', lastName: 'Doe' }));
    const emailEntered = await emailAddress.textContent();
    console.log(emailEntered);
    await phoneNumber.fill("9931212521");
    await occupation.selectOption({value:'1: Doctor'});
    await gender.click();
    await password.fill("Test1234#");
    await confirmPassword.fill("Test1234#");
    await consentCheckbox.click();
    await registrationButton.click();

    await loginButton.click();
    await emailAddress.fill("davidriley12@getnada.com");
    await password.fill("Test1234#");
    await registrationButton.click();

    await logoAutomation.waitFor();

    

})

test('@Client App login', async ({ page }) => {
    //js file- Login js, DashboardPage
    const email = "anshika@gmail.com";
    const productName = 'zara coat 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").type("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
       if (await products.nth(i).locator("b").textContent() === productName) {
          //add to cart
          await products.nth(i).locator("text= Add To Cart").click();
          break;
       }
    }
  
    await page.locator("[routerlink*='cart']").click();
    //await page.pause();
  
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('zara coat 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
  
    await page.locator("[placeholder*='Country']").type("ind");
  
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
       const text = await dropdown.locator("button").nth(i).textContent();
       if (text === " India") {
          await dropdown.locator("button").nth(i).click();
          break;
       }
    }
  
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

})