export enum Loader3dLoadTypes {
    Unknown = "Unknown",
    Fbx = "Fbx",
    Gltf = "Gltf",
    Texture = "Texture",
}

export interface ILoader3d {
    load(type: Loader3dLoadTypes, path: string): Promise<any>;
}