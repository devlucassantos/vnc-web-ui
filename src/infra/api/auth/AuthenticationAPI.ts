import {BackendClient} from "../clients/BackendClient";
import AuthenticationAdapter from "@interfaces/adapters/AuthenticationAdapter";
import User from "@models/User";


class AuthenticationAPI implements AuthenticationAdapter {

    async signIn(email: string, password: string): Promise<User> {
        try {
            const response = await BackendClient.post(`/auth/sign-in`, {
                email: email,
                password: password
            });

            return User.fromJSON(response.data)
        } catch (error) {
            throw error;
        }
    }

    async signUp(email: string, firstName: string, lastName: string, password: string): Promise<User> {
        try {
            const response = await BackendClient.post(`/auth/sign-up`, {
                email: email,
                first_name: firstName,
                last_name: lastName,
                password: password
            });

            return User.fromJSON(response.data)
        } catch (error) {
            throw error;
        }
    }

    async signOut(): Promise<void> {
        try {
            await BackendClient.post(`/auth/sign-out`);
        } catch (error) {
            throw error;
        }
    }

    saveAuthorization(token: string): void {
        BackendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    clearAuthorization(): void {
        delete BackendClient.defaults.headers.common['Authorization'];
    }
}

export default AuthenticationAPI;
