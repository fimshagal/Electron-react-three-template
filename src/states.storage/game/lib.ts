import { DataManager } from "../../renderer.stream/data.manager";
import {Toolkit} from "../../lib";
import {UiManager} from "../../renderer.stream/ui.manager";
import {GameSceneManager} from "../../renderer.stream/game.scene.manager";

export enum GameStatesNames {
    Unknown = "Unknown",
    Init = "Init",
    Welcome = "Welcome",
    Exploration = "Exploration",
    MiniGame = "MiniGame",
    Chest = "Chest",
    RewardCelebration = "RewardCelebration",
    Error = "Error",
    Exit = "Exit",
}

export interface GameInjectableProps {
    toolkit: Toolkit<(...args: any[]) => any>;
    dataManager: DataManager;
    uiManager: UiManager;
    gameSceneManager: GameSceneManager;
}