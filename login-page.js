import Common from "./common.js";
class Login extends Common {
    constructor() {
        super();
        this.$loginButton = () => $('//a[@ng-click="ULRC.LoginUser()"]//button');
        this.$loginHeader = () => $('//div[contains(text(),"Login")]');
        this.$signupButton = () => $('div.sgn_up_btn a');
        this.$registerHeader = () => $('//div[contains(text(),"Register")]');
        this.$registerFields = (fieldName) => $(`//div[@class="modal-inner-wrap user-register-popup"]//input[@id="${fieldName}"]`);
        this.$registerContinue=()=>$('//button[@type="submit"]')
        this.$verificationBox=()=>$('//div[@class="popup_inner"]')
        this.$verificationlogin=()=>$('//div[@class="modal-body"]//div[@class="subm_btn"]')
        this.$verificationMsgheader=()=>$('//div[@class="pop_tle ng-binding"]')
        this.$registerSuccess=()=>$('//div[@class="toast toast-success"]')
        this.$profileName=()=>$('//div[@class="container"]//span[text()="Hi ttt"]')
    }
    /**
     * Open url and launch the application.
     * @param {string} url 
     */
    async openUrl(url) {
        await browser.maximizeWindow();
        await browser.url(url);
        await this.$loginButton().waitForDisplayed({ timeout: 5000, timeoutMsg: 'time out fail for login' });
    }
    /**
     * click on login button and navigate to login pop-up.
     */
    async openLoginPopUp() {
        await this.$loginButton().click();
        await this.$loginHeader().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out fail for register pop-up' });
    }
    /**
     * click on sign-up button and navigate to register pop-up page.
     */
    async clickSignup() {
        await this.$signupButton().click();
        await this.$registerHeader().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out fail for register pop-up' });
    }/**
     * Filling the registration form with firstname,lastname,email and phone number
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} email 
     * @param {string} phoneNumber 
     */
    async fillRegistrationForm(firstName, lastName, email, phoneNumber) {
        await this.$registerFields('first_name').setValue(firstName);
        await this.$registerFields('last_name').setValue(lastName);
        await this.$registerFields('email').setValue(email);
        await this.$registerFields('tel').setValue(phoneNumber);
        

    }/**
     * Entering the verification code received on the given mobile number
     */
    async enterVerificationCode(){
        await this.$verificationMsgheader().waitForDisplayed({ timeout: 5000, timeoutMsg: 'time out fail for register pop-up' }); 
        await this.$verificationlogin().click();
        }
}
export default new Login()