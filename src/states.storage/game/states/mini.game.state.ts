import { State } from "../../../state.transition.handler";
import { GameStatesNames } from "../lib";

export class MiniGameState extends State {
    public readonly name: GameStatesNames = GameStatesNames.MiniGame;

    public override async onEnter(): Promise<void> {
        return Promise.resolve();
    }

    public override async onExit(): Promise<void> {
        return Promise.resolve();
    }
}