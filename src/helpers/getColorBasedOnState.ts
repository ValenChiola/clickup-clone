import React from "react"
import { State } from "../interfaces/trello"

type Color = React.CSSProperties['color']

const colors: Record<State, Color> = {
    TO_DO: "red",
    DOING: "orange",
    DEV_DONE: "lightgreen",
    DEV_READY: "blue",
    QA: "violet",
    QA_READY: "lightskyblue",
    DONE: "green",
}

export const getColorBasedOnState = (state: State) => colors[state]
