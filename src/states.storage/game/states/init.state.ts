import { State } from "../../../state.transition.handler";
import { GameStatesNames } from "../lib";

export class InitState extends State {
    public readonly name: GameStatesNames = GameStatesNames.Init;

    public override async onEnter(): Promise<void> {
        this.goTo(GameStatesNames.Welcome);
    }

    public override async onExit(): Promise<void> {
        return Promise.resolve();
    }
}