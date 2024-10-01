import UserAdapter from "../interfaces/adapters/UserAdapter";
import UserUsecase from "@interfaces/usecases/UserUsecase";
import User from "@models/User";
import {CacheService} from "@services/CacheService";
import StorageController from "../cache/storage/StorageController";

export class UserService implements UserUsecase {
    constructor(private userAdapter: UserAdapter) {}

    async activateAccount(activationCode: string): Promise<User> {
        const user = await this.userAdapter.activateAccount(activationCode);
        const persistAfterSession = StorageController.getBooleanFromStorage('persist-session');
        CacheService.saveUserAndTokens(user, persistAfterSession);
        return user
    }

    async resendActivationEmail(): Promise<void> {
        await this.userAdapter.resendActivationEmail();
    }
}
