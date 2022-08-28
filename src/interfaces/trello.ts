export enum State {
    TO_DO = "TO_DO",
    DOING = "DOING",
    DEV_DONE = "DEV_DONE",
    DEV_READY = "DEV_READY",
    QA = "QA",
    QA_READY = "QA_READY",
    DONE = "DONE",
}

export interface Task {
    id: string;
    cardId: string;
    title: string;
    description: string;
    state: State;

}

export interface Card {
    id: string;
    stateTitle: State;
}