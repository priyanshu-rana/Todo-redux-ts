import { FC, memo } from "react";
import Displayer from "../Displayer";

type NavProps = {};

const Nav: FC<NavProps> = (props) => {
  return (
    <div className="text-3xl font-bold font-mono px-32 py-3 flex justify-between">
      <h1 className="text-blue-800">Priyanshu's ToDo</h1>
      <Displayer />
    </div>
  );
};

Nav.defaultProps = {};

export default memo(Nav);
