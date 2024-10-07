import AuthenticationAdapter from "../interfaces/adapters/AuthenticationAdapter";
import AuthenticationUsecase from "@interfaces/usecases/AuthenticationUsecase";
import User from "@models/User";
import {CacheService} from "@services/CacheService";
import StorageController from "../cache/storage/StorageController";

export class AuthenticationService implements AuthenticationUsecase {
    constructor(private authenticationAdapter: AuthenticationAdapter) {
        this.configureAuthorization();
    }

    async signIn(email: string, password: string, persistAfterSession: boolean): Promise<User> {
        const user = await this.authenticationAdapter.signIn(email, password);
        CacheService.saveUserAndTokens(user, persistAfterSession);
        return user
    }

    async signUp(email: string, firstName: string, lastName: string, password: string, persistAfterSession: boolean): Promise<User> {
        const user = await this.authenticationAdapter.signUp(email, firstName, lastName, password);
        CacheService.saveUserAndTokens(user, persistAfterSession);
        return user
    }

    async signOut(): Promise<void> {
        await this.authenticationAdapter.signOut();
        this.clearCachedUser();
        this.authenticationAdapter.clearAuthorization();
    }

    configureAuthorization(): void {
        const persistAfterSession = StorageController.getBooleanFromStorage('persist-session');
        const token = StorageController.get('access-token', false, persistAfterSession);
        if (token) {
            this.authenticationAdapter.saveAuthorization(token);
        } else {
            this.authenticationAdapter.clearAuthorization();
        }
    }

    getCachedUser() {
        return CacheService.getUser();
    }

    clearCachedUser(): void {
        CacheService.clearUser();
    }
}
