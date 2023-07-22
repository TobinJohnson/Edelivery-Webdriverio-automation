class productUpdate {
    constructor() {
        this.$toggleDown = () => $('//i[@class="fa fa-angle-down"]')
        this.$dropdown = () => $('//ul[@class="dropdown-menu profile-dropdown"]')
        this.$accountSelect = () => $('//li[@href="/my-account"]')
        this.$userProfile = () => $('//h2[contains(.,firstName)]')
        this.$email = () => $('//h2[contains(.,email)]')
        this.$phonenumber = () => $('//h2[contains(.,phoneNumber)]')
        this.$editProfileButton = () => $('//a[@class="userprofile-edit-btn"]')
        this.$updateDetails = () => $('//button[@type="submit"]')
        this.$editsFields = (fieldName) => $(`//input[@id="${fieldName}"]`);
        this.$firstNameEdit = () => $('//input[@id="yourname"]')
        this.$lastNameEdit = () => $('//input[@id="yourname1"]')
        this.$emailEdit = () => $('//input[@id="email"]')
        this.$logout = () => $('//li[@class="ng-scope ng-binding"]')
        this.$successMessage = () => $('//div[@class="toast toast-success"]')
        this.$profileHeader = () => $('//span[@class="user-name ng-binding"]')
    }
    /**
     * Clicking on the toggle down button
     */
    async clickOnDropdown() {
        await this.$toggleDown().click();
    }
    /**
     * Clicking on the account block
     */
    async clickOnAccount() {
        await this.$accountSelect().click();
    }
    /**
     * Getting the details of the profile 
     */
    async profileDetails() {
        let accountName = await this.$userProfile().getText();
        let accountmail = await this.$email().getText();
        let accountphno = await this.$phonenumber().getText();
    }
    /**
     * Setting the new values to the profile
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} email 
     */
    async setDetails(firstName, lastName, email) {
        await this.$editsFields('yourname').setValue(firstName)
        await this.$editsFields('yourname1').setValue(lastName);
        await this.$editsFields('email').setValue(email);
        await this.$updateDetails().click();
        await this.$successMessage().waitForDisplayed({ reverse: true });

    }
    /**
     * Logging out from the profile
     */
    async logOut() {
        await this.$profileHeader().click();
        await this.$logout().click();
    }
} export default new productUpdate
