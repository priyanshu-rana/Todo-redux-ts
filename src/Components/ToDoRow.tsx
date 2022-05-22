import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import {
  TODOLIST_REDUCES,
  TODOLIST_INCREASES,
  DONELIST_INCREASES,
} from "../actions";

type ToDoRowProps = {
  children: string;
  done: boolean;
  onStatusChange: any;
  onDelete: any;
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
    props.onStatusChange(props.children);
    incDoneCount();
    decTodoCount();
  };

  const onDel = () => {
    props.onDelete(props.children, props.done);
  };
  return (
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={props.done}
        onChange={onCheckboxChange}
        className="w-4 h-4"
      />
      <span>{props.children}</span>
      <button onClick={onDel} className="text-red-500 font-bold">
        X
      </button>
    </div>
  );
};

ToDoRow.defaultProps = {};

export default memo(ToDoRow);
