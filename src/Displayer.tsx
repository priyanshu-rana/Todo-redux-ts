import { FC, memo } from "react";
import { useSelector } from "react-redux";
import { doneSelector, todoSelector } from "./selector";

type DisplayerProps = {};

const Displayer: FC<DisplayerProps> = (props) => {
  const todoCount = useSelector(todoSelector);
  const doneCount = useSelector(doneSelector);
  return (
    <div className="flex space-x-12 ">
      <h1 className="text-blue-600 ">TODO:{todoCount}</h1>
      <h1 className="text-red-600">DONE:{doneCount}</h1>
    </div>
  );
};

Displayer.defaultProps = {};

export default memo(Displayer);
