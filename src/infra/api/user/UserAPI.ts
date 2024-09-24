import {BackendClient} from "../clients/BackendClient";
import UserAdapter from "@interfaces/adapters/UserAdapter";
import User from "@models/User";
class UserAPI implements UserAdapter {
    async activateAccount(activationCode: string): Promise<User> {
        try {
            const response = await BackendClient.patch(`/user/activate-account`, {
                activation_code: activationCode,
            });

            return User.fromJSON(response.data)
        } catch (error) {
            throw error;
        }
    }

    async resendActivationEmail(): Promise<void> {
        try {
            await BackendClient.patch(`/user/resend-activation-email`);
        } catch (error) {
            throw error;
        }
    }
}

export default UserAPI;
