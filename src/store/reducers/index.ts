import { combineReducers } from 'redux';
import authReducer, { AuthState } from './authReducer.ts';
import tasksReducer, { TasksState } from './tasksReducer.ts';

export interface RootState {
  auth: AuthState;
  tasks: TasksState;
}

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
});
export default rootReducer;
