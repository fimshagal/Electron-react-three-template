import { MainStreamController } from "./main.stream";
import { Vector2 } from "three";

(async (): Promise<void> => {

    await MainStreamController
        .getSingle()
        .init({
            windowManagerInitialConfig: {
                size: new Vector2(1024, 768),
                htmlSource: 'index.html',
            }
        });

})();

