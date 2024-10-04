import { genSingletonLock } from "../../utils";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three";
import { ILoader3d, Loader3dLoadTypes } from "./lib";

const Loader3dSingletonLock: string = genSingletonLock("Loader3d");

export class Loader3d implements ILoader3d{
    private static _instance: Loader3d;

    private _fbxLoader: FBXLoader = new FBXLoader();
    private _gltfLoader: GLTFLoader = new GLTFLoader();
    private _textureLoader: TextureLoader = new TextureLoader();

    constructor(singletonLock: string) {
        if (Loader3d._instance) {
            throw Error("Singleton constructor error: instance was created");
        }

        if (singletonLock !== Loader3dSingletonLock) {
            throw Error("Singleton constructor error: try multi instancing");
        }
    }

    public static getSingle(): Loader3d  {
        if (!Loader3d._instance) {
            Loader3d._instance = new Loader3d(Loader3dSingletonLock);
        }
        return Loader3d._instance;
    }

    public async load(type: Loader3dLoadTypes, path: string): Promise<any> {
        return new Promise((resolve): void => {
            switch (type) {
                case Loader3dLoadTypes.Fbx:
                    this._fbxLoader.load(path, resolve);
                    break;
                case Loader3dLoadTypes.Gltf:
                    this._gltfLoader.load(path, (gltf): void => {
                        resolve(gltf.scene);
                    });
                    break;
                case Loader3dLoadTypes.Texture:
                    this._textureLoader.load(path, resolve);
                    break;
                case Loader3dLoadTypes.Unknown:
                default:
                    console.warn(`Asset "${path}" can't be loaded`);
                    resolve(null);
                    break;
            }
        });
    }
}