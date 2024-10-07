import User from "@models/User";
import CacheUsecase from "@interfaces/usecases/CacheUsecase";
import StorageController from "../cache/storage/StorageController";

export class CacheService implements CacheUsecase {
    static saveUserAndTokens(user: User, persistAfterSession: boolean): void {
        StorageController.set('user', user.toJSON(), true, persistAfterSession);
        StorageController.set('access-token', user.accessToken, false, persistAfterSession);
        StorageController.set('refresh-token', user.refreshToken, false, persistAfterSession);
        StorageController.set('persist-session', persistAfterSession, false, true);
    }
    static getUser(): User | undefined {
        const persistAfterSession = StorageController.getBooleanFromStorage('persist-session');
        const serializedUser = StorageController.get('user', true, persistAfterSession);
        if (serializedUser) return User.fromJSON(serializedUser);
        return undefined;
    }

    static clearUser(): void {
        StorageController.clear();
    }
}
