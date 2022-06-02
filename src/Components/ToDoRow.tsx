import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import {
  TODOLIST_REDUCES,
  TODOLIST_INCREASES,
  DONELIST_INCREASES,
} from "../actions";
import { todo } from "../models/todo";

type ToDoRowProps = {
  done: boolean;
  onStatusChange: (data: todo) => void;
  onDelete: (data: todo, done: boolean) => void;
  todo: todo;
};

const ToDoRow: FC<ToDoRowProps> = (props) => {
  const dispatch = useDispatch();

  const incDoneCount = () => {
    dispatch({ type: DONELIST_INCREASES });
  };

  const decTodoCount = () => {
    dispatch({ type: TODOLIST_REDUCES });
  };

  const onCheckboxChange = () => {
    props.onStatusChange(props.todo);
  };

  const onDel = () => {
    props.onDelete(props.todo, props.done);
    decTodoCount();
  };
  return (
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={props.todo.done}
        onChange={onCheckboxChange}
        className="w-4 h-4"
      />
      <span style={{ cursor: "cell" }} onClick={onCheckboxChange}>
        {props.todo.title}
      </span>
      <button onClick={onDel} className="text-red-500 font-bold">
        X
      </button>
    </div>
  );
};

ToDoRow.defaultProps = {};

export default memo(ToDoRow);
