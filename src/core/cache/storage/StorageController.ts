type StorageKeys = 'user' | 'access-token' | 'refresh-token' | 'persist-session';

class StorageController {
    private static readonly keys: Record<StorageKeys, string> = {
        user: 'VNC@USER_DATA',
        'access-token': 'VNC@AUTH_TOKEN',
        'refresh-token': 'VNC@REFRESH_TOKEN',
        'persist-session': 'VNC@PERSIST_SESSION',
    };

    static set(
        key: StorageKeys,
        data: any,
        isJSON = false,
        persistAfterSession: boolean = true
    ): void {
        if (isJSON) data = JSON.stringify(data);
        if (process.env.NODE_ENV !== 'test') {
            const storage = persistAfterSession ? localStorage : sessionStorage;
            storage?.setItem(StorageController.keys[key], data);
        }
    }

    static get<T = unknown>(
        key: StorageKeys,
        inJSON = false,
        persistAfterSession: boolean = true
    ): undefined | any {
        const storage = persistAfterSession ? localStorage : sessionStorage;
        let data: string | null | T = storage?.getItem(StorageController.keys[key]);
        if (!data || data === null) return undefined;
        if (inJSON) data = JSON.parse(data) as T;
        return data;
    }

    static clear(): void {
        sessionStorage.clear();
        localStorage.clear();
    }

    static getBooleanFromStorage(key: StorageKeys, persistAfterSession: boolean = true): boolean {
        const value = StorageController.get(key, false, persistAfterSession);
        return value === 'true';
    }
}

export default StorageController;
