import { FC, memo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DONELIST_REDUCES,
  TODOLIST_INCREASES,
  TODOLIST_REDUCES,
} from "./actions";
import Button from "./Components/Button";
import DoneRow from "./Components/DoneRow";
import Form from "./Components/Form";
import Nav from "./Components/Nav";
import ToDoRow from "./Components/ToDoRow";

type ToDoPageProps = {
  todo: string | number;
  todoList: [];
};

const ToDoPage: FC<ToDoPageProps> = (props) => {
  const [showForm, setShowForm] = useState(false);

  const [todoList, setTodoList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const dispatch = useDispatch();

  const decTodoCount = () => {
    dispatch({ type: TODOLIST_REDUCES });
  };

  const decDoneCount = () => {
    dispatch({ type: DONELIST_REDUCES });
  };

  const show = () => {
    setShowForm(true);
  };

  const hide = () => {
    setShowForm(false);
  };

  const addTodo = (todo: never) => {
    if (todoList.indexOf(todo) === -1) {
      setTodoList([...todoList, todo]);
    } else {
      alert("Same todo is present");
    }
  };

  const markAsDone = (todo: never) => {
    const newTodoList = todoList.filter((t) => t !== todo);
    setTodoList(newTodoList);
    setDoneList([...doneList, todo]);
  };

  const markAsNotDone = (todo: never) => {
    const newDoneList = doneList.filter((t) => t !== todo);
    setDoneList(newDoneList);
    setTodoList([...todoList, todo]);
  };

  const todoDelete = (todo: any, done: any) => {
    if (done) {
      const newDoneList = doneList.filter((t) => t !== todo);
      setDoneList(newDoneList);
      decDoneCount();
    } else {
      const newTodoList = todoList.filter((t) => t !== todo);
      setTodoList(newTodoList);
      decTodoCount();
    }
  };

  return (
    <div>
      <Nav />
      <hr />
      <div className="sm:px-32 sm:mt-8">
        <h1 className="sm:text-3xl font-bold">Things to get done</h1>
        <h1 className="sm:text-xl font-medium mt-4">Things to do</h1>
        {!todoList.length && <h1 className="m-4">No todo here !</h1>}
        <div className="mt-3 space-y-4 ">
          <div>
            {todoList.map((t) => (
              <ToDoRow
                onDelete={todoDelete}
                onStatusChange={markAsDone}
                done={false}
              >
                {t}
              </ToDoRow>
            ))}
          </div>

          {!showForm && <Button onClick={show}>+ Add a ToDo</Button>}
          {showForm && <Form onCreate={addTodo} hideForm={hide} />}
          <div>
            <h1 className="sm:text-xl font-medium ">Things get done</h1>
            {!doneList.length && <h1 className="m-4">No doneList!</h1>}
            {doneList.map((t) => (
              <DoneRow
                onDelete={todoDelete}
                onStatusChange={markAsNotDone}
                done={true}
              >
                {t}
              </DoneRow>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ToDoPage.defaultProps = {};

export default memo(ToDoPage);
