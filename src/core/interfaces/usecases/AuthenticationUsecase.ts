import User from "@models/User";

abstract class AuthenticationUsecase {
    abstract signIn(email: string, password: string, persistAfterSession: boolean): Promise<User>;
    abstract signUp(email: string, firstName: string, lastName: string, password: string, persistAfterSession: boolean): Promise<User>;
    abstract signOut(): Promise<void>;
    abstract configureAuthorization(): void;
    abstract getCachedUser(): User | undefined;
    abstract clearCachedUser(): void;
}

export default AuthenticationUsecase;
