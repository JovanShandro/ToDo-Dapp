import * as R from "ramda";

export function completedTasks(state) {
  return R.filter(task => task.completed)(state.tasks);
}

export function todoTasks(state) {
  return R.filter(task => !task.completed)(state.tasks);
}
