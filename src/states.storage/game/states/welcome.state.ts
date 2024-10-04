import { State } from "../../../state.transition.handler";
import { GameStatesNames } from "../lib";

export class WelcomeState extends State {
    public readonly name: GameStatesNames = GameStatesNames.Welcome;

    public override async onEnter(): Promise<void> {
        this.goTo(GameStatesNames.Exploration);
    }

    public override async onExit(): Promise<void> {
        return Promise.resolve();
    }
}