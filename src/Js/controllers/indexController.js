import { ShowHandler } from "../handlers/ShowHandler.js";
import { AuthHandler } from "../handlers/AuthHandler.js";
import { CartHandler } from "../handlers/CartHandler.js";
import { CartService } from "../services/CartService.js";

const verify = await AuthHandler.userVerify();

ShowHandler.headerMain(verify);

const products = await ShowHandler.getProducts(verify);

ShowHandler.showProducts(products, verify);

if (verify) {

    const productsInCart = await CartService.getProductsInCart(localStorage.getItem('Token'));

    CartHandler.updateCart(productsInCart, verify)

} else {
    if (JSON.parse(localStorage.getItem('cart'))) {

        CartHandler.updateCart(JSON.parse(localStorage.getItem('cart')), verify)
    } else {
        CartHandler.updateCart([], verify)
    }
}



const filters = document.querySelectorAll('.menu__item');
const rightSide__field = document.querySelector('.rightSide__field');
const open = document.querySelector('.open');
const aside = document.querySelector('aside');
const cart__close = document.querySelector('.cart__close')

filters.forEach(filter => {
    filter.addEventListener('click', (event) => {
        const children = event.currentTarget.children;
        const category = children[children.length - 1].innerText;

        const filtered = ShowHandler.filterPerCategory(products, category);

        ShowHandler.showProducts(filtered, verify);

        ShowHandler.changeTheSelected(event.currentTarget)
    })
})

rightSide__field.addEventListener('keyup', (event) => {

    const text = event.currentTarget.value;

    if (text) {
        const searched = ShowHandler.searchedProducts(text, products);
        ShowHandler.showProducts(searched, verify)
    } else {
        ShowHandler.showProducts(products, verify)
    }
})

open.addEventListener('click', () => {
    aside.style.opacity = 0;

    aside.style.display = "flex";

    setTimeout(() => {

        aside.style.opacity = 1;

    }, 200);
})

cart__close.addEventListener('click', () => {
    aside.style.opacity = 0;



    setTimeout(() => {

        aside.style.display = "none";

    }, 1000);
})