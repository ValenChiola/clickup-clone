import React from "react";
import { capitalize } from "../helpers/capitalize";
import { getColorBasedOnState } from "../helpers/getColorBasedOnState";
import { useCard } from "../hooks/useCard";
import { State } from "../interfaces/trello";

const styles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  marginRight: 20,
  width: 200,
  border: 0,
  borderRadius: 5,
  color: "#fff",
};

export const StateList = ({ onClick }: Props) => {
  const { choosenStates } = useCard();

  return (
    <div>
      {choosenStates.map((item) => (
        <div
          key={item}
          onClick={() => onClick?.(item)}
          style={{
            cursor: onClick && "pointer",
            backgroundColor: getColorBasedOnState(item),
            ...styles,
          }}
        >
          <p style={{ margin: 0 }}>{capitalize(item)}</p>
        </div>
      ))}
    </div>
  );
};

interface Props {
  onClick?: (value: State) => void;
}
