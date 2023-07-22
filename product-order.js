class productOrder {
    constructor() {
        this.$deliveryLocation = () => $('//div[@class="home-from1 landing-banner-search"]/input')
        this.$chennaiSelect=()=>$('//div[@class="pac-container pac-logo"]/div[@class="pac-item"][1]')
        this.$locationHeader=()=>$('//div[@class="search-new-options ng-scope"]//li[@class="ng-binding"]/text()')
        this.$maxFashionSelect=()=>$('//ul[@class="search_page search-page-list ng-scope"]/li[2]')
        this.$maxFashionHeader=()=>$('//p[@class="res_page"]/span/text()')
        this.$whiteShirtCart=()=>$('//div[@id="cat1"]/div[@class="inner_res_menu"][1]//div[@class="inner_res_menu_food"]/span[4]/span')
        this.$addToCartPopUp=()=>$('//div[@class="modal-inner-wrap restaurant-detail-popup new_wrapper_overflow"]')
        this.$cartIncrement=()=>$('//span[@class="glyphicon glyphicon-plus"]')
        this.$buttonAddToCart=()=>$('//div[@class="resfooter-right"]/button')
        this.$totalPrice=()=>$('//div[@id="fixed-pos"]//div[@class="cart-item "]//div[@class="item-price-wrap"]/span[1]')
        this.$priceAfterDiscount=()=>$('//div[@id="fixed-pos"]//div[@class="cart-item "]//div[@class="item-price-wrap"]/span[2]')
        this.$discountPercentage=()=>$('//h2[text()="Recommended"]/../..//div[@class="inner_res_menu"]//span[@class="ng-binding"]')
        this.$checkOutHeader=()=>$('//h3[@title="MAX FASHIONS"]')
    }/**Method for entering the location of the city for delivery
     * @param {string} location 
     */
    async locationSelection(location){
        await this.$deliveryLocation().click();
        await this.$deliveryLocation().setValue(location)
        await this.$chennaiSelect().click();
        await this.$maxFashionSelect().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out fail for register pop-up' }); 
    }
    /**
     * Method for selecting the store as max fashion
     */
    async productSelection(){
        await this.$maxFashionSelect().click();
    }
    /**
     * Method for selecting 2 quatity of white shirts to the cart
     */
    async whiteShirtSelect(){
        await this.$whiteShirtCart().click();
        await this.$addToCartPopUp().waitForDisplayed({ timeout: 100000, timeoutMsg: 'time out fail for add to cart pop-up' }); 
        await this.$cartIncrement().click();
        await this.$buttonAddToCart().click();
    }/**
     * Method to find out the discount percentage and checking it with the checkout amount
     */
    async discountPercent(){
        let discountPer=await this.$discountPercentage().getText();
        discountPer=discountPer.replace(/[^0-9.]/g, '');
        console.log("discountPercentage is " + discountPer);
        let afterDiscountAmount=(await this.$totalPrice())-((discountPer*0.01)*(await this.$totalPrice()));
    }

}export default new productOrder()