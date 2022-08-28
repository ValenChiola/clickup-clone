import { TaskForm } from "../Task/TaskForm";
import { TaskList } from "../Task/TaskList";

import Button from "react-bootstrap/Button";
import { useCard } from "../../hooks/useCard";
import { useTask } from "../../hooks/useTask";
import { getColorBasedOnState } from "../../helpers/getColorBasedOnState";
import { Card, State } from "../../interfaces/trello";
import { capitalize } from "../../helpers/capitalize";

export const CardList = () => {
  const { cards } = useCard();

  return (
    <div>
      {cards.map((card) => (
        <CardItem key={card.id} {...card} />
      ))}
    </div>
  );
};

const CardItem = ({ id, stateTitle }: Card) => {
  const { deleteCard } = useCard();
  const { getTasks } = useTask(id);

  const tasks = getTasks();

  if (!tasks.length && stateTitle !== State.TO_DO) return null;

  const color = getColorBasedOnState(stateTitle);

  return (
    <div style={{ margin: "2em 0" }}>
      <div style={{ display: "flex", gap: 10 }}>
        <h3 style={{ color }}>{capitalize(stateTitle)}</h3>
        <Button variant="danger" onClick={() => deleteCard(id)}>
          X
        </Button>
      </div>
      <TaskList tasks={tasks} />
      <TaskForm cardId={id} />
    </div>
  );
};
