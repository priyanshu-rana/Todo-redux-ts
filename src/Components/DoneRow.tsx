import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { TODOLIST_INCREASES, DONELIST_REDUCES } from "../actions";
import { todo } from "../models/todo";

type DoneRowProps = {
  done: boolean;
  onStatusChange: (data: todo) => void;
  onDelete: (data: todo, done: boolean) => void;
  todo: todo;
};

const DoneRow: FC<DoneRowProps> = (props) => {
  const dispatch = useDispatch();

  const decDoneCount = () => {
    dispatch({ type: DONELIST_REDUCES });
  };

  const incTodoCount = () => {
    dispatch({ type: TODOLIST_INCREASES });
  };
  const onCheckboxChange = () => {
    props.onStatusChange(props.todo);
  };

  const onDel = () => {
    props.onDelete(props.todo, props.done);
    decDoneCount();
  };

  return (
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={props.done}
        onChange={onCheckboxChange}
        className="w-4 h-4 "
      />
      <span
        style={{ cursor: "cell" }}
        onClick={onCheckboxChange}
        className="line-through"
      >
        {props.todo.title}
      </span>
      <button onClick={onDel} className="text-red-500 font-bold">
        X
      </button>
    </div>
  );
};

DoneRow.defaultProps = {};

export default memo(DoneRow);
