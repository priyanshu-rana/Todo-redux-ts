import { FC, memo } from "react";
import ToDoPage from "./ToDoPage";

type AppProps = {};

const App: FC<AppProps> = (props) => {
  return (
    <div>
      <ToDoPage />
    </div>
  );
};

App.defaultProps = {};

export default memo(App);
