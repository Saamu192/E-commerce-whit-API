import { CartService } from "../services/CartService.js";

export class CartHandler {
    static cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    static async addCart(verify, product) {
        if (verify) {
            await CartService.putInCart(localStorage.getItem('Token'), product.id);

            const productsInCart = await CartService.getProductsInCart(localStorage.getItem('Token'));

            this.updateCart(productsInCart, verify)


        } else {

            const productInCart = this.cart.find(item => item.products.id === product.id)

            if (productInCart) {
                productInCart.quantity++;
            } else {

                const formattedProduct = {
                    quantity: 1,
                    products: product
                }

                this.cart.push(formattedProduct);
            }

            this.updateCart(this.cart, verify)

            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }

    static showItemsInCart(products, verify) {

        const cart__body = document.querySelector('.cart__body');

        cart__body.innerText = '';

        products.forEach(({ quantity, products: product }) => {
            const itemCart = document.createElement('article');
            const itemCart__image = document.createElement('section');
            const img = document.createElement('img');
            const itemCart__info = document.createElement('section');
            const itemCart__title = document.createElement('h4');
            const itemCart__category = document.createElement('p');
            const itemCart__price = document.createElement('span');
            const itemCart__delete = document.createElement('section');
            const itemCart__QtArea = document.createElement('div');
            const itemCart__qtmenos = document.createElement('button');
            const itemCart__ItemQt = document.createElement('div');
            const itemCart__qtmais = document.createElement('button');
            const itemCart__btn = document.createElement('button');

            itemCart.classList.add('itemCart');
            itemCart__image.classList.add('itemCart__image');
            img.src = product.imagem;
            img.alt = product.nome;
            itemCart__info.classList.add('itemCart__info');
            itemCart__title.classList.add('itemCart__title');
            itemCart__title.innerText = product.nome;
            itemCart__category.classList.add('itemCart__category');
            itemCart__category.innerText = product.categoria;
            itemCart__price.classList.add('itemCart__price');
            itemCart__price.innerText = `$ ${product.preco}`;
            itemCart__delete.classList.add('itemCart__delete');
            itemCart__QtArea.classList.add('itemCart__QtArea');
            itemCart__qtmenos.classList.add('itemCart__qtmenos');
            itemCart__qtmenos.innerText = '-';
            itemCart__ItemQt.classList.add('itemCart__ItemQt');
            itemCart__ItemQt.innerText = quantity;
            itemCart__qtmais.classList.add('itemCart__qtmais');
            itemCart__qtmais.innerText = '+';
            itemCart__btn.classList.add('itemCart__btn');
            itemCart__btn.innerHTML = '<img src="src/assets/images/trash.png" alt="trash image">';


            itemCart__qtmenos.addEventListener('click', () => {
                this.decreaseInCart(product, quantity, verify);
            })

            itemCart__qtmais.addEventListener('click', () => {
                this.increaseInCart(product, verify);
            })

            itemCart__btn.addEventListener('click', () => {
                this.removeInCart(product, verify);
            })

            itemCart.append(itemCart__image, itemCart__info, itemCart__delete);
            itemCart__image.appendChild(img);
            itemCart__info.append(itemCart__title, itemCart__category, itemCart__price);
            itemCart__delete.append(itemCart__QtArea, itemCart__btn);
            itemCart__QtArea.append(itemCart__qtmenos, itemCart__ItemQt, itemCart__qtmais);

            cart__body.appendChild(itemCart)
        })

    }

    static async removeInCart(product, verify) {
        if (verify) {
            await CartService.deleteInCart(localStorage.getItem('Token'), product.id)

            const productsInCart = await CartService.getProductsInCart(localStorage.getItem('Token'));

            this.updateCart(productsInCart, verify)
        } else {
            const indexInCart = this.cart.findIndex(item => item.products.id === product.id)

            this.cart.splice(indexInCart, 1)

            this.updateCart(this.cart, verify)

            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }

    static async increaseInCart(product, verify) {
        if (verify) {
            await CartService.putInCart(localStorage.getItem('Token'), product.id);

            const productsInCart = await CartService.getProductsInCart(localStorage.getItem('Token'));

            this.updateCart(productsInCart, verify)
        } else {
            const productInCart = this.cart.find(item => item.products.id === product.id)

            productInCart.quantity++;

            this.updateCart(this.cart, verify)

            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }

    static async decreaseInCart(product, quantity, verify) {
        if (quantity === 1) {
            this.removeInCart(product, verify)
            return;
        }

        if (verify) {
            let newQuantity = quantity - 1;

            await CartService.putInCart(localStorage.getItem('Token'), product.id, newQuantity);

            const productsInCart = await CartService.getProductsInCart(localStorage.getItem('Token'));

            this.updateCart(productsInCart, verify)
        } else {
            const productInCart = this.cart.find(item => item.products.id === product.id)

            productInCart.quantity--;

            this.updateCart(this.cart, verify)



            localStorage.setItem('cart', JSON.stringify(this.cart));
        }
    }

    static updateCart(products, verify) {

        const quantity__value = document.querySelector('.quantity__value');
        const total__value = document.querySelector('.total__value');

        let quantity = products.reduce((acc, item) => {
            return acc + item.quantity
        }, 0)

        let total = products.reduce((acc, item) => {
            return acc + item.quantity * item.products.preco;
        }, 0)

        quantity__value.innerText = quantity;
        total__value.innerText = total;

        if (quantity >= 1) {
            const cart__body = document.querySelector('.cart__body');
            const cart__footer = document.querySelector('.cart__footer');
            cart__body.classList.add('cart__body--full')
            cart__body.classList.remove('cart__body--empty')


            cart__footer.classList.add('openElementWithBlock');

        } else if (quantity === 0) {

            const cart__body = document.querySelector('.cart__body');
            const cart__footer = document.querySelector('.cart__footer');
            const img = document.createElement('img');
            const p = document.createElement('p');

            cart__body.innerText = '';

            img.src = './src/assets/images/shoppingBag.png';
            img.alt = 'shopping icon';

            p.innerText = 'Por enquanto não temos produtos no carrinho'
            cart__body.classList.add('cart__body--empty')
            cart__body.classList.remove('cart__body--full')
            cart__body.append(img, p);

            cart__footer.classList.remove('openElementWithBlock');
        }

        if (quantity > 0) {
            this.showItemsInCart(products, verify)
        }



    }


}