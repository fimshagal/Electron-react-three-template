import { createXStateConfigHelper } from "../../../utils/x.state.config.helper";
import { GameStatesNames } from "../lib";
import { Dictionary } from "../../../lib";

const xStateConfigHelper = createXStateConfigHelper({
    [`transition.${GameStatesNames.Error}`]: {
        target: GameStatesNames.Error,
    },
    [`transition.${GameStatesNames.Exit}`]: {
        target: GameStatesNames.Exit,
    },
});

export const gameStateMachineConfig: Dictionary = {
    id: 'game',
    initial: GameStatesNames.Init,
    states: {
        [GameStatesNames.Init]: xStateConfigHelper.createTransitionList(GameStatesNames.Welcome, GameStatesNames.Exploration),
        [GameStatesNames.Welcome]: xStateConfigHelper.createTransitionList(GameStatesNames.Exploration, GameStatesNames.RewardCelebration),
        [GameStatesNames.Exploration]: xStateConfigHelper.createTransitionList(GameStatesNames.MiniGame, GameStatesNames.Chest),
        [GameStatesNames.MiniGame]: xStateConfigHelper.createTransitionList(GameStatesNames.Exploration, GameStatesNames.RewardCelebration),
        [GameStatesNames.Chest]: xStateConfigHelper.createTransitionList(GameStatesNames.RewardCelebration),
        [GameStatesNames.RewardCelebration]: xStateConfigHelper.createTransitionList(GameStatesNames.Exploration),
        [GameStatesNames.Error]: {},
        [GameStatesNames.Exit]: {},
    },
};