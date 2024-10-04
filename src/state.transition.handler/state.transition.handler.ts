import { IStateTransitionHandler, StateTransitionHandlerInitConfig } from "./lib";
import { State } from "./";
import { Dictionary, Nullable } from "../lib";
import { hasOwnProperty } from "../utils";

export class StateTransitionHandler implements IStateTransitionHandler{
    private _isInit: boolean;
    private _isStarted: boolean;
    private _isDebug: boolean;

    private _stateConstructors: typeof State[] = [];
    private _states: Dictionary<State> = {};
    private _injectableProps: Dictionary = {};
    private _currentStateName: Nullable<string>;
    private _actor: Nullable<any>;

    public update(deltaTime: number): void {
        if (!this._isStarted || this.currentState?.hasNoUpdate) return;

        this.currentState?.onUpdate(deltaTime);
    }

    public async transition(snapshot): Promise<void> {
        const targetStateName = snapshot.value;

        if (targetStateName === this._currentStateName) {
            console.error("It is either state machine death loop error or wrong x-state transitions config");
            return;
        }

        if (!hasOwnProperty(this._states, targetStateName)) {
            console.error(`There is no state with name "${targetStateName}"`);
            return;
        }

        if (this._currentStateName) {
            this.log(`Exit state "${this._currentStateName}"`);

            await this.currentState?.onExit();
        }

        this._currentStateName = targetStateName;

        this.log(`Enter state "${this._currentStateName}"`);

        await this.currentState?.onEnter();
    }

    public log(message: string): void {
        if (!this._isDebug) return;
        console.log(message);
    }

    public init(initConfig: StateTransitionHandlerInitConfig): void {
        if (this._isInit) return;

        if (!initConfig.states.length) {
            throw Error("Application can't run without any state");
        }

        if (!initConfig.actor) {
            throw Error("Application can't run without handling actor");
        }

        if (initConfig.debug) {
            this._isDebug = true;
        }

        this.applyActor(initConfig.actor);
        this.applyStates(initConfig);

        this._isInit = true;
    }

    public start(): void {
        if (this._isStarted) return;
        this._actor.start();
        this._isStarted = true;
    }

    private checkGoToInOnExitError(state: State): boolean {
        const inlineMethod: string = state.onExit.toString();
        return inlineMethod.includes("this.goTo(");
    }

    private checkIsOnUpdateEmpty(state: State): boolean {
        const inlineMethod: string = state.onUpdate.toString();
        const match = Array.from(inlineMethod.match(/\{([\s\S]*)\}/));

        return Boolean(match.length) && match[1]?.trim() === "";
    }

    private applyActor(actor: any): void {
        this._actor = actor;
        this._actor.subscribe(this.transition.bind(this));
    }

    private applyStates(initConfig: StateTransitionHandlerInitConfig): void {
        const { states, injectableProps } = initConfig;

        this._stateConstructors = states;
        this._injectableProps = injectableProps || {};

        for (const constructor of this._stateConstructors) {
            const state: State = new constructor(this.requestTransition.bind(this));
            if (this.checkGoToInOnExitError(state)) {
                throw Error('StateMachine state\'s initialization fatal error: lifecycle method "onExit" can\'t call transport method "goTo" inside itself!');
            }

            state.hasNoUpdate = this.checkIsOnUpdateEmpty(state);

            state.injectProps({ ...this._injectableProps });
            this._states[state.name] = state;
        }
    }

    private requestTransition(targetStateName: string): void {
        this._actor.send({ type: `transition.${targetStateName}` });
    }

    private get statesList(): State[] {
        return Object.values(this._states);
    }

    private get currentState(): Nullable<State> {
        return this._currentStateName && hasOwnProperty(this._states, this._currentStateName)
            ? this._states[this._currentStateName]
            : null;
    }
}