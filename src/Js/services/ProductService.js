export class ProductService {

  static baseUrl = "https://api-kenzie-food.herokuapp.com";

  static async getPublicProducts() {
    const response = await fetch(`${this.baseUrl}/products`)
      .then((data) => data.json())
      .then((data) => data)
      .catch((error) => error);

    return response;
  }

  static async getPrivateProducts(token) {
    const response = await fetch(`${this.baseUrl}/my/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => data)
      .catch((error) => error);

    return response;
  }

  static async createProduct(token, data) {
    const response = await fetch(`${this.baseUrl}/my/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => data)
      .catch((error) => error);

    return response;
  }

  static async editProduct(token, data, id) {
    const response = await fetch(`${this.baseUrl}/my/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((resp) => {
        return resp.json()})
      .then((resp) => resp)
      .catch((error) => error);

    return response;
  }

  static async deleteProduct(token, id) {
    const response = await fetch(`${this.baseUrl}/my/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then((data) => data)
      .catch((error) => error);

    return response;
  }
}

