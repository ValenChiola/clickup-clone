import React, { createContext, useContext, useState } from "react";
import { CARDS } from "../hooks/useCard";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { TASKS } from "../hooks/useTask";
import { Card, Task } from "../interfaces/trello";

const Context = createContext<ContextTypes>({} as ContextTypes);
Context.displayName = "TrelloContext";

export const TrelloProvider = ({ children }: { children: React.ReactNode }) => {
  const { getItem } = useLocalStorage();

  const [cards, setCards] = useState<Card[]>(() => getItem(CARDS));
  const [tasks, setTasks] = useState<Task[]>(() => getItem(TASKS));

  return (
    <Context.Provider value={{ cards, tasks, setCards, setTasks }}>
      {children}
    </Context.Provider>
  );
};

export const useTrelloContext = () => useContext(Context);

// Interfaces
interface ContextTypes {
  cards: Card[];
  setCards: React.Dispatch<React.SetStateAction<Card[]>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}
