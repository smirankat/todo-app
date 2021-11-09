import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        completed: false,
        time: new Date().toLocaleString(),
      };
      action.payload.title !== "" &&
        state.filter((todo) => todo.title === action.payload.title).length ===
          0 &&
        state.push(newTodo);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    updateTodo: (state, action) => {
      state.map((todo) => {
        if (
          state.filter((todo) => todo.title === action.payload.title).length ===
            0 &&
          todo.id === action.payload.id
        ) {
          todo.title = action.payload.title;
        }
        return todo;
      });
    },
  },
});

export const { addTodo, toggleComplete, deleteTodo, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
