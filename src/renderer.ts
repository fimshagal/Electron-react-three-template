import { RendererStreamController } from "./renderer.stream/controller";
import { getRendererStreamControllerInitialConfig } from "./configs";

(async () => {

    await RendererStreamController
        .getSingle()
        .init(getRendererStreamControllerInitialConfig());

})();
