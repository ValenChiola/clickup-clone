import { nanoid } from "nanoid";
import { useCallback } from "react";
import { useTrelloContext } from "../context/TrelloContext";
import { State, Task } from "../interfaces/trello";
import { useCard } from "./useCard";
import { useLocalStorage } from "./useLocalStorage";



export const TASKS = "tasks"

export const useTask = (cardId: string) => {

    const { cards, getCardByTitle, getCardById } = useCard()
    const { tasks, setTasks } = useTrelloContext()
    const { setItem } = useLocalStorage()

    const getTasks = useCallback(
        () => tasks.filter(item => item.cardId === cardId)
        , [tasks, cardId])

    const createTask = (task: Omit<Task, 'id' | 'state'>) => {
        const card = getCardById(cardId)

        if (!card) return

        const { stateTitle: state } = card

        const newTasks = [
            ...getTasks(),
            {
                ...task,
                cardId,
                state,
                id: nanoid(),
            },
        ];
        updateGlobalState(newTasks)
    };

    const deleteTask = (taskId: string) => {
        const newTasks = getTasks().filter(({ id }) => id !== taskId)
        updateGlobalState(newTasks)
    };

    const updateTask = (task: Task) => {
        const { id, ...rest } = task;

        const newTasks = getTasks().map((item) => {
            if (item.id === id) {
                return {
                    id,
                    ...rest,
                };
            }
            return item;
        });

        updateGlobalState(newTasks)
    };

    const nextState = (taskId: string) => {
        const task = getTaskById(taskId);

        if (!task) return;

        const state = getNextTaskState(task.state)

        setState(taskId, state)
    }

    const setState = (id: string, state: State) => {
        const task = getTaskById(id);

        if (!task) return;

        const card = getCardByTitle(state)

        if (!card) return

        const { id: cardId } = card

        const updatedTask = {
            ...task,
            cardId,
            state,
        }

        updateTask(updatedTask);
    }

    const getTaskById = (taskId: string) =>
        getTasks().find(({ id }) => id === taskId);

    const getTasksByCardId = () =>
        getTasks().filter((task) => task.cardId === cardId);

    const getNextTaskState = (currentState: State) => {
        const states = cards.map(({ stateTitle }) => stateTitle)
        const currentStateIndex = states.indexOf(currentState);
        const nextStateIndex = (currentStateIndex + 1) % states.length;
        return states[nextStateIndex]
    }

    const updateGlobalState = (newTasks: Task[]) => {
        const all = [...tasks.filter(item => item.cardId !== cardId), ...newTasks]
        setItem(TASKS, all)
        setTasks(all)
    }

    return {
        getTasks,
        createTask,
        updateTask,
        deleteTask,
        nextState,
        setState,
        getTaskById,
        getTasksByCardId
    }

}
