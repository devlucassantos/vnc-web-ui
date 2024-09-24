import User from "@models/User";

abstract class UserAdapter {
    abstract activateAccount(activationCode: string): Promise<User>;
    abstract resendActivationEmail(): Promise<void>;
}

export default UserAdapter;
