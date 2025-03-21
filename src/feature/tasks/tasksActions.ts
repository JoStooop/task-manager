import {
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  Task,
} from '../../store/reducers/tasksReducer.ts';
import { AppThunk } from '../../types.ts';
import { toast } from 'react-toastify';

export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';
export const CREATE_TASK_FAILURE = 'CREATE_TASK_FAILURE';

export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST';
export const UPDATE_TASK_SUCCESS = 'UPDATE_TASK_SUCCESS';
export const UPDATE_TASK_FAILURE = 'UPDATE_TASK_FAILURE';

export const DELETE_TASK_REQUEST = 'DELETE_TASK_REQUEST';
export const DELETE_TASK_SUCCESS = 'DELETE_TASK_SUCCESS';
export const DELETE_TASK_FAILURE = 'DELETE_TASK_FAILURE';

export const createTaskRequest = () => ({
  type: CREATE_TASK_REQUEST,
});

export const createTaskSuccess = (task: Task) => ({
  type: CREATE_TASK_SUCCESS,
  payload: task,
});

export const createTaskFailed = (error: string) => ({
  type: CREATE_TASK_FAILURE,
  payload: error,
});

export const updateTaskRequest = () => ({
  type: UPDATE_TASK_REQUEST,
});

export const updateTaskSuccess = (task: Task) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: task,
});

export const updateTaskFailed = (error: string) => ({
  type: UPDATE_TASK_FAILURE,
  payload: error,
});

export const deleteTaskRequest = () => ({
  type: DELETE_TASK_REQUEST,
});

export const deleteTaskSuccess = (id: number) => ({
  type: DELETE_TASK_SUCCESS,
  payload: id,
});

export const deleteTaskFailed = (error: string) => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});

export const fetchTasksRequest = () => ({
  type: FETCH_TASKS_REQUEST,
});

export const fetchTasksSuccess = (tasks: Task[]) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailed = (error: string) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const fetchTasks = (): AppThunk => {
  return async (dispatch) => {
    dispatch(fetchTasksRequest());
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      console.log(data);
      dispatch(fetchTasksSuccess(data));
      toast.success('Задачи загружены');
    } catch (error: any) {
      dispatch(fetchTasksFailed(error.message));
      toast.error('Не удалось загрузить задачи');
    }
  };
};

export const createTask = (task: Omit<Task, 'id'>): AppThunk => {
  return async (dispatch) => {
    dispatch(createTaskRequest());
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const data = await response.json();
      dispatch(createTaskSuccess(data));
    } catch (error: any) {
      dispatch(createTaskFailed(error.message));
    }
  };
};

export const updateTask = (task: Task): AppThunk => {
  return async (dispatch) => {
    dispatch(updateTaskRequest());
    console.log(task.id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${task.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const data = await response.json();
      dispatch(updateTaskSuccess(data));
    } catch (error: any) {
      dispatch(updateTaskFailed(error.message));
    }
  };
};

export const deleteTask = (id: number): AppThunk => {
  return async (dispatch) => {
    dispatch(deleteTaskRequest());
    console.log(id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      dispatch(deleteTaskSuccess(id));
    } catch (error: any) {
      dispatch(deleteTaskFailed(error.message));
    }
  };
};
