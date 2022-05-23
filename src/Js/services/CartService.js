export class CartService {
    static baseUrl = 'https://api-kenzie-food.herokuapp.com';

    static async getProductsInCart(token) {

        const response = await fetch(`${this.baseUrl}/cart`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(data => data.json())
            .then(data => data)
            .catch(error => error)

        return response
    }

    static async putInCart(token, product_id, quantity) {

        const data = {}

        data.product_id = product_id;

        if (quantity) {
            data.quantity = quantity;
        }

        const response = await fetch(`${this.baseUrl}/cart/add`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            .then(data => data.json())
            .then(data => data)
            .catch(error => error)

        return response
    }

    static async deleteInCart(token, id) {

        const response = await fetch(`${this.baseUrl}/cart/remove/${id}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(data => data.json())
            .then(data => data)
            .catch(error => error)

        return response
    }
}