import {
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
} from '../../feature/tasks/tasksActions.ts';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

type TasksStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface TasksState {
  data: Task[] | null;
  status: TasksStatus;
  error: string | null;
}

const initialState: TasksState = {
  data: null,
  status: 'idle',
  error: null,
};

const tasksReducer = (state = initialState, action: any): TasksState => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
    case CREATE_TASK_REQUEST:
    case UPDATE_TASK_REQUEST:
    case DELETE_TASK_REQUEST:
      return { ...state, status: 'loading', error: null };
    case FETCH_TASKS_SUCCESS:
      return { ...state, status: 'succeeded', data: action.payload };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        data: [action.payload, ...state.data!],
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        data: state.data!.map((task) =>
          task.id === action.payload.id ? action.payload : task,
        ),
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        status: 'succeeded',
        data: state.data!.filter((task) => task.id !== action.payload),
      };
    case FETCH_TASKS_FAILURE:
    case CREATE_TASK_FAILURE:
    case UPDATE_TASK_FAILURE:
    case DELETE_TASK_FAILURE:
      return { ...state, status: 'failed', error: action.payload };
    default:
      return state;
  }
};

export default tasksReducer;
