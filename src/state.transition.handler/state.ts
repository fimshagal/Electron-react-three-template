import { IState } from "./lib";
import {Dictionary} from "../lib";

export class State implements IState {
    public name = "base";
    public props: Dictionary = {};

    private readonly _exitFn: any;
    private _hasNoUpdate = false;

    constructor(exitFn: any) {
        if (typeof exitFn !== "function") throw Error("State constructor error");
        this._exitFn = exitFn;
    }

    public goTo(targetStateName: string): void {
        this._exitFn(targetStateName);
    }

    public injectProps(props: Dictionary): void {
        this.props = { ...props };
    }

    public onUpdate(deltaTime: number): void {}

    public async onEnter(): Promise<void> {
        console.error('"onEnter" method isn\'t implemented');
    }

    public async onExit(): Promise<void> {
        console.error('"onExit" method isn\'t implemented');
    }

    public set hasNoUpdate(value: boolean) {
        this._hasNoUpdate = value;
    }

    public get hasNoUpdate(): boolean {
        return this._hasNoUpdate;
    }
}