import { MainStreamController } from "./main.stream";
import { getMainStreamControllerInitialConfig } from "./configs";

(async (): Promise<void> => {

    await MainStreamController
        .getSingle()
        .init(getMainStreamControllerInitialConfig());

})();

