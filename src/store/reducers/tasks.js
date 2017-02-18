import replaceWhere from "util/replaceWhere";

export default [[], {
  create: {
    type: "CREATE_TASK",
    create(text) {
      return {text};
    },
    reduce(tasks, {text}) {
      return [
        {text, id: tasks.length, complete: false},
        ...tasks
      ];
    }
  },

  remove: {
    type: "REMOVE_TASK",
    create(id) {
      return {id};
    },
    reduce(tasks, {id}) {
      return tasks.filter((task) => task.id !== id)
    }
  },

  toggle: {
    type: "TOGGLE_TASK",
    create(id) {
      return {id};
    },
    reduce(tasks, {id}) {
      return replaceWhere(tasks,
        (task) => task.id === id,
        (task) => ({
          ...task,
          complete: !task.complete
        })
      );
    }
  },
}]
