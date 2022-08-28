import React, { useRef } from "react";
import { useForm } from "../../hooks/useForm";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useTask } from "../../hooks/useTask";
import { Task } from "../../interfaces/trello";

export const TaskForm = ({ cardId }: { cardId: string }) => {
  const { values, ...inputsProps } = useForm();
  const { createTask } = useTask(cardId);
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask(values as Omit<Task, "id">);
    formRef.current?.reset();
  };

  return (
    <Form onSubmit={onSubmit} ref={formRef}>
      <Form.Control
        name="title"
        placeholder="Enter the task title"
        {...inputsProps}
      />
      <Form.Control
        name="description"
        placeholder="Enter the task description"
        {...inputsProps}
      />
      <Button type="submit">Save</Button>
    </Form>
  );
};
