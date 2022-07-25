export class StorageUtil {
    /* Store value of type T with key */
    public static storageSave<T>(key: string, value: T): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }
    
    /*
        Get value of type T or undefined if doesn't exist 
        Clear value if not of correct type
    */
    public static storageRead<T>(key: string): T | undefined {
        const storedValue = sessionStorage.getItem(key);
        try {
            if (storedValue) 
                return JSON.parse(storedValue) as T;
             
            return undefined;
        }
        catch(e) {
            sessionStorage.removeItem(key);
            return undefined;
        }
    }

    /* Remove item from storage */
    public static storageDelete(key: string) {
        sessionStorage.removeItem(key)
    }
}