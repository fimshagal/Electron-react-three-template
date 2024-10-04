const writeTsFile = require("../utils/write.ts.file");

class AssetsClassGenerator {
    static async generate(options = {}) {
        const { resources, output, importPathPrefix } = options;

        const texturesImports = resources.textures.map((texture) => `import ${texture.assetName}Path from "${importPathPrefix}/textures/${texture.fileName}";`).join('\n');
        const fbxImports = resources.fbx.map((fbx) => `import ${fbx.assetName}Path from "${importPathPrefix}/models/${fbx.fileName}";`).join('\n');

        const texturesValues = resources.textures.map((texture) => {
            const { assetName, options } = texture;
            let applyWrap = "";
            let applyRepeat = "";

            if (options) {
                const { wrap, repeat } = options;

                if (wrap) {
                    applyWrap = `
                    this._texturesAssets["${texture.assetName}"].wrapS = THREE.${wrap.s};
                    this._texturesAssets["${texture.assetName}"].wrapT = THREE.${wrap.t};
                `;
                }

                if (repeat) {
                    applyRepeat = `
                    this._texturesAssets["${texture.assetName}"].repeat.set(100, 100);
                `;
                }
            }


            return `
                this._texturesAssets["${assetName}"] = await loader.load(LoaderTypes.texture, \`\$\{${assetName}Path\}\`);
                ${applyWrap}
                ${applyRepeat}
            `;
        }).join('\n');

        const fbxValues = resources.fbx.map((fbx) => `this._fbxAssets["${fbx.assetName}"] = await loader.load(LoaderTypes.fbx, \`\$\{${fbx.assetName}Path\}\`);`).join('\n');

        const materialsValues = resources.materials.map((material) => {
            const { assetName, constructorType, options } = material;
            let applyTransparent = options && options.transparent ? `this._materialsAssets["${assetName}"].transparent = ${options.transparent}`: "";
            let applySide = options && options.side ? `this._materialsAssets["${assetName}"].side = THREE.${options.side};` : "";
            let applyColor = options && options.color ? `this._materialsAssets["${assetName}"].color = new THREE.Color(${options.color});` : "";
            let applyMap = options && options.textureName ? `this._materialsAssets["${assetName}"].map = this.query(LoaderTypes.texture, "${options.textureName}") as THREE.Texture;` : "";
            let applyNormalMap = options && options.normalTextureName ? `this._materialsAssets["${assetName}"].normalMap = this.query(LoaderTypes.texture, "${options.normalTextureName}") as THREE.Texture;` : "";
            let applyEmissiveMap = options && options.emissiveTextureName ? `this._materialsAssets["${assetName}"].emissiveMap = this.query(LoaderTypes.texture, "${options.emissiveTextureName}") as THREE.Texture;` : "";

            return `
                this._materialsAssets["${assetName}"] = new THREE.${constructorType}();
                ${applyTransparent}
                ${applySide}
                ${applyColor}
                ${applyMap}
                ${applyNormalMap}
                ${applyEmissiveMap}
            `;
        }).join('\n');

        const classContent = `
            import {genSingletonLock} from "../utils";
            import {Loader} from "../loader/loader";
            import {Dictionary, Nullable} from "../lib.d";
            import {LoaderTypes} from "../loader";
            import {AnyMeshMaterial, IThreeAssets} from "./lib.d";
            import * as THREE from "three";
            
            ${texturesImports}
            ${fbxImports}
          
            const ThreeAssetsSingletonLock: string = genSingletonLock("ThreeAssets");
            
            export class ThreeAssets implements IThreeAssets {
                private static _singleInstance: ThreeAssets;
            
                private _isInit: boolean = false;
                private _loader: Loader = Loader.getSingle();
                private _fbxAssets: Dictionary<THREE.Group> = {};
                private _texturesAssets: Dictionary<THREE.Texture> = {};
                private _materialsAssets: Dictionary<AnyMeshMaterial> = {};
            
                constructor(singletonLock) {
                    if (ThreeAssets._singleInstance) {
                        throw Error("Singleton constructor error");
                    }
            
                    if (singletonLock !== ThreeAssetsSingletonLock) {
                        throw Error("Singleton constructor error");
                    }
                }
            
                public static getSingle(): ThreeAssets  {
                    if (!ThreeAssets._singleInstance) {
                        ThreeAssets._singleInstance = new ThreeAssets(ThreeAssetsSingletonLock);
                    }
                    return ThreeAssets._singleInstance;
                }
            
                public async init(): Promise<void> {
                    if (this._isInit) return;
            
                    await this.initTexturesAssets();
                    await this.initFbxAssets();
                    await this.initMaterialsAssets();
            
                    this._isInit = true;
                }
            
                public query(type: LoaderTypes, name: string): Nullable<THREE.Group | THREE.Texture | AnyMeshMaterial> {
                    switch (type) {
                        case LoaderTypes.texture:
                            return this._texturesAssets.hasOwnProperty(name) ?
                                this._texturesAssets[name].clone()
                                : null;
                        case LoaderTypes.fbx:
                            return this._fbxAssets.hasOwnProperty(name) ?
                                this._fbxAssets[name].clone(true)
                                : null;
                        case LoaderTypes.material:
                            return this._materialsAssets.hasOwnProperty(name) ?
                                this._materialsAssets[name]
                                : null;
                        case LoaderTypes.none:
                        default:
                            return null;
                    }
                }
            
                private async initTexturesAssets(): Promise<void> {
                    const loader: Loader = this._loader;
            
                    ${texturesValues}
                }
            
                private async initFbxAssets(): Promise<void> {
                    const loader: Loader = this._loader;
                    ${fbxValues}
                }
                
                private async initMaterialsAssets(): Promise<void> {
                    ${materialsValues}
                }
                
                public get fbx(): Dictionary {
                    return { ...this._fbxAssets };
                }
                
                public get textures(): Dictionary {
                    return { ...this._texturesAssets };
                }
                
                public get materials(): Dictionary {
                    return { ...this._materialsAssets };
                }
            
                public get assets(): Dictionary {
                    return {
                        textures: this._texturesAssets,
                        fbx: this._fbxAssets,
                        materials: this._materialsAssets
                    };
                }
            }
        `;

        await writeTsFile(output, classContent);
    }
}

module.exports = AssetsClassGenerator;