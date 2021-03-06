import { FC, memo, useState } from "react";
import { useDispatch } from "react-redux";
import { TODOLIST_INCREASES } from "../actions";
import Button from "./Button";

type FormProps = {
  hideForm: any;
  onCreate: any;
};

const Form: FC<FormProps> = (props) => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const incTodoCount = () => {
    dispatch({ type: TODOLIST_INCREASES });
  };

  const onInputchange = (event: any) => {
    setInputValue(event.target.value);
  };

  const onSave = () => {
    if (!inputValue) {
      alert("Input can't be Blank");
      return;
    }

    props.onCreate(inputValue);

    props.hideForm();
    incTodoCount();
  };

  return (
    <form>
      <div className="p-5  space-y-3 border border-gray-200 shadow-sm shadow-gray-300  rounded-md ">
        <h1 className="font-bold text-xl">Create a todo</h1>
        <input
          type="text"
          placeholder="Write todo here !!"
          className="border border-gray-400 rounded-md p-1"
          value={inputValue}
          onChange={onInputchange}
        />
        <div className="space-x-3">
          <Button theme="primary" onClick={onSave}>
            Save
          </Button>
          <Button onClick={props.hideForm} theme="red">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

Form.defaultProps = {};

export default memo(Form);
