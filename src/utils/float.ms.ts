export const floatMs = (intMs: number): number => {
    return parseFloat((intMs / 1000).toFixed(2));
};