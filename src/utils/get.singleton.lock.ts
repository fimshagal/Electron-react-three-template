export const genSingletonLock = (prefix: string): string => {
    const randomNumber: number = Math.floor(Math.random() * Date.now());
    const hash: string = btoa(randomNumber.toString())
        .replace(/=/g, '')
        .toLowerCase();

    return `${prefix}${hash}`;
};