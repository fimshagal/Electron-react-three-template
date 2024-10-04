import { Dictionary, Nullable } from "../lib";

interface IXStateConfigHelper {
    createTransitionList(...list: any[]): Dictionary;
}

class XStateConfigHelper implements IXStateConfigHelper{
    protected _baseTransitions: Dictionary = {};

    constructor(baseTransitions: Dictionary) {
        this._baseTransitions = baseTransitions;
    }

    private getWithBaseTransitions(transitions?: Dictionary): Dictionary {
        return {
            on: {
                ...this._baseTransitions,
                ...transitions,
            },
        };
    }

    private handleTransitionsList(...list: any[]): Dictionary {
        const response: Dictionary = {};

        for (const transition of list) {
            response[`transition.${transition}`] = {
                target: transition,
            };
        }

        return response;
    }

    public createTransitionList(...list: any[]): Dictionary {
        return this.getWithBaseTransitions(this.handleTransitionsList(...list));
    }
}

export const createXStateConfigHelper = (baseTransitions: Dictionary): Nullable<XStateConfigHelper> => {
    return baseTransitions
        ? new XStateConfigHelper(baseTransitions)
        : null;
};