export type DictionaryKey = string | number | symbol;

export type Dictionary<T = any> = {
    [key: DictionaryKey]: T;
};

export type Nullable<T> = T | null;

declare global {
    interface Window {
        BridgeApi: {
            send: (channel: string, data: any) => void;
            receive: (channel: string, callback: (data: any) => void) => void;
        }
    }
}

export type Toolkit<T extends (...args: any[]) => any> = Record<string | symbol | number, T>;