import { createStore, Reducer } from "redux";
import {
  DONELIST_INCREASES,
  DONELIST_REDUCES,
  TODOLIST_INCREASES,
  TODOLIST_REDUCES,
} from "./actions";

type State = {
  done: number;
  notDone: number;
};

const initialState: State = { done: 0, notDone: 0 };

const reducer: Reducer<State> = (currentState = initialState, action) => {
  switch (action.type) {
    case TODOLIST_INCREASES: {
      return { ...currentState, notDone: currentState.notDone + 1 };
    }
    case TODOLIST_REDUCES: {
      return { ...currentState, notDone: currentState.notDone - 1 };
    }
    case DONELIST_INCREASES: {
      return { ...currentState, done: currentState.done + 1 };
    }
    case DONELIST_REDUCES: {
      return { ...currentState, done: currentState.done - 1 };
    }
    default: {
      return currentState;
    }
  }
};
const store = createStore(reducer);
export default store;
