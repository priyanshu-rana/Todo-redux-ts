import { FC, memo } from "react";
import { useDispatch } from "react-redux";
import { TODOLIST_INCREASES, DONELIST_REDUCES } from "../actions";

type DoneRowProps = {
  children: string;
  done: any;
  onStatusChange: any;
  onDelete: any;
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
    props.onStatusChange(props.children);
    incTodoCount();
    decDoneCount();
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
      <span className={props.done && "line-through"}>{props.children}</span>
      <button onClick={onDel} className="text-red-500 font-bold">
        X
      </button>
    </div>
  );
};

DoneRow.defaultProps = {};

export default memo(DoneRow);
