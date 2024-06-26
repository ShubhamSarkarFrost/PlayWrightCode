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