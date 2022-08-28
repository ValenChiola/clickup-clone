import React from "react";
import { CardForm } from "./CardForm";
import { CardList } from "./CardList";

export const CardManage = () => {
  return (
    <div style={{padding: '2em'}}>
      <CardForm />
      <CardList />
    </div>
  );
};
