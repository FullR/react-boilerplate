
export default [0, {
  increment: {
    reduce(state) {
      return state + 1;
    }
  },

  decrement: {
    reduce(state) {
      return state - 1;
    }
  }
}]
