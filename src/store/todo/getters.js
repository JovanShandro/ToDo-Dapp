import * as R from "ramda";

export function completedTasks(state) {
  console.log(R.filter(task => task.completed)(state.tasks));
  return R.filter(task => task.completed)(state.tasks);
}

export function todoTasks(state) {
  console.log(R.filter(task => !task.completed)(state.tasks));
  return R.filter(task => !task.completed)(state.tasks);
}
