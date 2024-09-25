import User from "@models/User";

abstract class AuthenticationAdapter {
    abstract signIn(email: string, password: string): Promise<User>;
    abstract signUp(email: string, firstName: string, lastName: string, password: string): Promise<User>;
    abstract signOut(): Promise<void>;
    abstract saveAuthorization(token: string): void;
    abstract clearAuthorization(): void;
}

export default AuthenticationAdapter;
