import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Select from "react-bootstrap/FormSelect";
import { capitalize } from "../../helpers/capitalize";
import { useCard } from "../../hooks/useCard";
import { State } from "../../interfaces/trello";

import "./CardForm.css";

export const CardForm = () => {
  const { createCard, availableStates } = useCard();
  const [title, setTitle] = useState<State>(State.TO_DO);

  const handleOnClick = () => createCard(title);

  return (
    <>
      <Select onChange={(e) => setTitle(e.target.value as State)}>
        <option>Seleccione una opción</option>
        {availableStates.map((item) => (
          <option key={item} value={item}>{capitalize(item)}</option>
        ))}
      </Select>
      <Button onClick={handleOnClick}>Save</Button>
    </>
  );
};
