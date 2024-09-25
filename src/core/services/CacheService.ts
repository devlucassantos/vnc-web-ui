import User from "@models/User";
import CacheUsecase from "@interfaces/usecases/CacheUsecase";
import StorageController from "../cache/storage/StorageController";

export class CacheService implements CacheUsecase {
    static saveUserAndTokens(user: User): void {
        StorageController.set('user', user.toJSON(), true);
        StorageController.set('access-token', user.accessToken);
        StorageController.set('refresh-token', user.refreshToken);
    }
    static getUser(): User | undefined {
        const serializedUser = StorageController.get('user', true);
        if (serializedUser) return User.fromJSON(serializedUser);
        return undefined;
    }

    static clearUser(): void {
        StorageController.clear();
    }
}
