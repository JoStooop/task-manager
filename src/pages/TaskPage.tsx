import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect, useState } from 'react';
import { Task } from '../store/reducers/tasksReducer.ts';
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from '../feature/tasks/tasksActions.ts';
import { LogoutButton } from '../components/LogoutButton.tsx';

export const TaskPage = () => {
  const dispatch = useAppDispatch();
  const { data: tasks, status, error } = useAppSelector((state) => state.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTack = () => {
    if (newTaskTitle.trim()) {
      dispatch(createTask({ title: newTaskTitle, completed: false }));
      setNewTaskTitle('');
    }
  };

  const handleUpdateTask = (task: Task) => {
    dispatch(updateTask({ ...task, completed: !task.completed }));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  if (status === 'loading') return <div>Загрузка постов...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;
  return (
    <div>
      <LogoutButton />
      <h1 className="font-bold text-3xl underline">Tasks:</h1>
      <div>
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Новая задача"
        />
        <button onClick={handleCreateTack}>Добавить</button>
      </div>
      <ul>
        {tasks &&
          tasks.map((task: Task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                disabled={task.completed}
                onChange={() => handleUpdateTask(task)}
              />
              <span>{task.completed ? task.title : <b>{task.title}</b>}</span>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};
