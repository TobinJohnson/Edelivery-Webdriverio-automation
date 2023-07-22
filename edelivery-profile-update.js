import loginPage from "../pageobjects/login-page.js"
import productDelivery from "../pageobjects/product-order.js";
import profileUpdate from "../pageobjects/profile-update.js";
let email = `${Math.random().toString(36).substring(2, 8)}@mailsac.com`;
let phoneNumber = Math.floor(Math.random() * 10000000000);
let firstName = await loginPage.getRandomLetters(6);
let firstName2 = await loginPage.getRandomLetters(6);
let email2 = `${Math.random().toString(36).substring(2, 8)}@mailsac.com`

describe('Login into the application for profile updation and then logging out', () => {
    it('Open URL and load the application', async () => {
        await loginPage.openUrl('https://edelivery.zoproduct.com/');
        await expect(browser).toHaveUrl('https://edelivery.zoproduct.com/');
    });

    it('Click on login button and check if pop-up window appears', async () => {
        await loginPage.openLoginPopUp();
        expect(await loginPage.$loginHeader().isDisplayed()).toBe(true);
    });

    it('Click on sign-up button and check if register pop-up appears', async () => {
        await loginPage.clickSignup();
        expect(await loginPage.$registerHeader().isDisplayed()).toBe(true);
    });

    it('Enter the register form details', async () => {
        await loginPage.fillRegistrationForm(firstName, 'jakson', email, phoneNumber);
        expect(await loginPage.$verificationBox().isDisplayed()).toBe(true)
        await loginPage.$registerContinue().click();
    })

    it("Enter the verification message sent to the mobile number and check for registration success message", async () => {
        expect(await loginPage.$verificationMsgheader().isDisplayed()).toBe(true);
        await loginPage.enterVerificationCode();
        await loginPage.$registerSuccess().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out fail for register pop-up' }); 
        expect(await loginPage.$registerSuccess().isDisplayed()).toBe(true);
    })

    it("Clicking on the dropdown button ", async () => {
        await profileUpdate.clickOnDropdown();
        expect(await profileUpdate.$dropdown().isDisplayed()).toBe(true);
    })

    it("Selecting account from dropdown", async () => {
        await profileUpdate.clickOnAccount();
        await expect(browser).toHaveUrl("https://edelivery.zoproduct.com/my-account");
    })

    it("Getting account details", async () => {
        await profileUpdate.profileDetails();
        expect(await profileUpdate.$editProfileButton().isDisplayed()).toBe(true);
    })

    it('Clicking on the edit profile button', async () => {
        await profileUpdate.$editProfileButton().click();
        expect(await profileUpdate.$updateDetails().isDisplayed()).toBe(true);
    })

    it('Setting details to profile fields', async () => {
        await profileUpdate.setDetails(firstName2, 'jakson', email2);
        expect(await profileUpdate.$profileHeader().isDisplayed()).toBe(true);
        this.$profileHeader().waitForDisplayed({ timeout: 6000 });
    })

    it('Logging out from the application', async () => {
        await profileUpdate.logOut();
        expect(await (browser).toHaveUrl("https://edelivery.zoproduct.com/"));
    })
})