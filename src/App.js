import { useEffect, useState } from "react";
import "./App.css";
import Task from "./Task";
import TaskForm from "./TaskForm";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function App() {
  //
  const [tasks, setTask] = useState([]);
  const [animationParent] = useAutoAnimate({ duration: 1000 });

  //
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTask(tasks || []);
  }, []);
  //
  const addTask = (name) => {
    setTask((pre) => {
      return [{ name: name, done: false }, ...pre];
    });
  };
  //
  const updateTaskDone = (taskIndex, newDone) => {
    setTask((pre) => {
      const newTask = [...pre];
      newTask[taskIndex].done = newDone;
      return newTask;
    });
  };
  //
  const removeTask = (taskIndexRemove) => {
    setTask((pre) => {
      return pre.filter((taskName, index) => index !== taskIndexRemove);
    });
  };
  //

  const numberCompleted = tasks.filter((t) => t.done).length;
  const total = tasks.length;
  return (
    <main ref={animationParent}>
      <h2>
        {numberCompleted}/{total} Completed
      </h2>
      <TaskForm onAdd={addTask} />

      {tasks.map((task, index) => (
        <Task
          {...task}
          key={index}
          onToggle={(done) => updateTaskDone(index, done)}
          onTrash={() => removeTask(index)}
        />
      ))}
    </main>
  );
}

export default App;
