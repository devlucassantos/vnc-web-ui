import User from "@models/User";

abstract class CacheUsecase {
    static saveUserAndTokens(user: User): void {
        throw new Error('you must implement "saveUser"');
    }

    static getUser(): User | undefined {
        throw new Error('you must implement "getUser"');
    }

    static clearUser(): void {
        throw new Error('you must implement "clearUser"');
    }
}

export default CacheUsecase;
