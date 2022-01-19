import {TaskPreview} from './TaskPreview';

export function TaskList({tasks}) {
  return (
    <section className="task-list-container">
      {tasks.map(task => (
        <TaskPreview key={task.id} task={task} />
      ))}
    </section>
  );
}
