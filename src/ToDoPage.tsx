import { FC, memo, useState } from "react";
import { useDispatch } from "react-redux";
import {
  DONELIST_INCREASES,
  DONELIST_REDUCES,
  TODOLIST_INCREASES,
  TODOLIST_REDUCES,
} from "./actions";
import Button from "./Components/Button";
import DoneRow from "./Components/DoneRow";
import Form from "./Components/Form";
import Nav from "./Components/Nav";
import ToDoRow from "./Components/ToDoRow";
import { todo } from "./models/todo";

let i = 0;

const ToDoPage: FC = () => {
  const [showForm, setShowForm] = useState(false);

  const [todoList, setTodoList] = useState<todo[]>([]);
  const [doneList, setDoneList] = useState<todo[]>([]);

  const dispatch = useDispatch();

  const decTodoCount = () => {
    dispatch({ type: TODOLIST_REDUCES });
  };

  const decDoneCount = () => {
    dispatch({ type: DONELIST_REDUCES });
  };

  const incDoneCount = () => {
    dispatch({ type: DONELIST_INCREASES });
  };

  const incTodoCount = () => {
    dispatch({ type: TODOLIST_INCREASES });
  };

  const show = () => {
    setShowForm(true);
  };

  const hide = () => {
    setShowForm(false);
  };

  const addTodo = (todoTitle: string) => {
    // i++;
    // if (todoList.indexOf(todo) === -1) {
    setTodoList([...todoList, { title: todoTitle, id: i++, done: false }]);

    // } else {
    //   alert("Same todo is present");
    //   decTodoCount();
    //   return;
    // }
  };

  const deleteFromTodoList = (todo: todo) => {
    const newTodoList = todoList.filter((t) => t.id !== todo.id);
    setTodoList(newTodoList);
  };

  const deleteFromDoneList = (todo: todo) => {
    const newDoneList = doneList.filter((t) => t.id !== todo.id);
    setDoneList(newDoneList);
  };

  const todoDelete = (todo: todo, done: boolean) => {
    if (done) {
      deleteFromDoneList(todo);
    } else {
      deleteFromTodoList(todo);
    }
  };

  const markAsDone = (todo: todo) => {
    deleteFromTodoList(todo);
    setDoneList([...doneList, todo]);
    decTodoCount();
    incDoneCount();
    todo.done = true;
  };

  const markAsNotDone = (todo: todo) => {
    deleteFromDoneList(todo);
    setTodoList([...todoList, todo]);
    decDoneCount();
    incTodoCount();
    todo.done = false;
  };
  console.log(todoList, doneList, "hi");

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
            {todoList.map((t: todo) => (
              <ToDoRow
                todo={t}
                key={t.id}
                onDelete={todoDelete}
                onStatusChange={markAsDone}
                done={t.done}
              ></ToDoRow>
            ))}
          </div>

          {!showForm && <Button onClick={show}>+ Add a ToDo</Button>}
          {showForm && <Form onCreate={addTodo} hideForm={hide} />}
          <div>
            <h1 className="sm:text-xl font-medium ">Things get done</h1>
            {!doneList.length && <h1 className="m-4">No doneList!</h1>}
            {doneList.map((t: todo) => (
              <DoneRow
                todo={t}
                key={t.id}
                onDelete={todoDelete}
                onStatusChange={markAsNotDone}
                done={t.done}
              ></DoneRow>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

ToDoPage.defaultProps = {};

export default memo(ToDoPage);
