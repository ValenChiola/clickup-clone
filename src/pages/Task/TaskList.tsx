import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import { StateList } from "../../components/StateList";
import { getColorBasedOnState } from "../../helpers/getColorBasedOnState";
import { useTask } from "../../hooks/useTask";
import { Task } from "../../interfaces/trello";

import "./TaskList.css";

export const TaskList = ({ tasks }: { tasks: Task[] }) => (
  <div>
    {tasks.map((task) => (
      <TaskItem key={task.id} {...task} />
    ))}
  </div>
);

const TaskItem = ({ id, state, title, description, cardId }: Task) => {
  const [isOpen, setIsOpen] = useState(false);
  const { deleteTask, nextState, setState } = useTask(cardId);
  const backgroundColor = getColorBasedOnState(state);

  return (
    <div className="task-item">
      <div>
        <div>
          <div
            style={{
              width: 10,
              height: 10,
              backgroundColor,
              cursor: "pointer",
            }}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          <div>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
        <div>
          <Button variant="success" onClick={() => nextState(id)}>
            {">"}
          </Button>
          <Button variant="danger" onClick={() => deleteTask(id)}>
            X
          </Button>
        </div>
      </div>
      {isOpen && <StateList onClick={(value) => setState(id, value)} />}
    </div>
  );
};
