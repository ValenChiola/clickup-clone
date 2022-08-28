import { nanoid } from "nanoid";
import { useMemo } from "react";
import { useTrelloContext } from "../context/TrelloContext";
import { State, Card } from "../interfaces/trello";
import { useLocalStorage } from "./useLocalStorage";

export const CARDS = "cards"

export const useCard = () => {
    const { cards, setCards } = useTrelloContext()
    const { setItem } = useLocalStorage()

    const choosenStates = useMemo(() => {
        const states = cards.map(({ stateTitle }) => stateTitle)
        return Object.values(State).filter((item) => states.includes(item as State))
    }, [cards]);
   
    const availableStates = useMemo(() => {
        const states = cards.map(({ stateTitle }) => stateTitle)
        return Object.values(State).filter((item) => !states.includes(item as State))
    }, [cards]);

    const createCard = (stateTitle: State) => {
        console.log(stateTitle);
        const card = getCardByTitle(stateTitle)

        if (card) return

        const newCards = [
            ...cards,
            {
                id: nanoid(),
                stateTitle,
            },
        ]
            // Sorting based on State enum (TODO - DOING - DONE)
            .sort((a, b) => {
                const { stateTitle: titleA } = a
                const { stateTitle: titleB } = b

                const indexA = Object.values(State).indexOf(titleA)
                const indexB = Object.values(State).indexOf(titleB)

                return indexA - indexB
            })

        updateGlobalState(newCards)
    };

    const deleteCard = (cardId: string) => {
        const newCards = cards.filter(({ id }) => cardId !== id);
        updateGlobalState(newCards)
    };


    const getCardByTitle = (title: State) => cards.find(card => card.stateTitle.toString() === title.toString())

    const getCardById = (id: string) => cards.find(item => item.id === id)

    const updateGlobalState = (cards: Card[]) => {
        setItem(CARDS, cards);
        setCards(cards)
    }

    return {
        cards,
        choosenStates,
        availableStates,
        createCard,
        deleteCard,
        getCardByTitle,
        getCardById,
    }

}
