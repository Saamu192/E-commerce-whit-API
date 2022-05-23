import { ProductService } from "../services/ProductService.js";
import { UserService } from "../services/UserService.js";

export class AuthHandler {
    static async userVerify() {
        const token = localStorage.getItem("Token");
        let data = {};
        if (token !== null) {
            data = await ProductService.getPrivateProducts(token);
        } else {
            return false
        }

        if (data.message !== undefined) {
            return false;
        } else {
            return true;
        }
    }
    static async login({ email, password }) {
        const user = await UserService.loginUser({ email, password });
        if (user.error !== undefined) {
            return false;
        }
        localStorage.setItem("Token", user);

        return true;
    }

    static async register(data) {
        const user = await UserService.registerUser(data);
        if (user.id !== undefined) {
            localStorage.setItem("userId", user.id);
            return true;
        }
        return false;
    }

    static async logout() {

        localStorage.removeItem('Token');


    }
}