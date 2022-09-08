import { useReducer, useEffect } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

// Init reducer
const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodos = () => {

  // Todo reducer
  const [todos, dispatch] = useReducer(todoReducer, [], init);


  // Reducer push local storage
  useEffect(() => {

    localStorage.setItem('todos', JSON.stringify(todos));

  }, [todos]);


  // Add new todo
  const handleNewTodo = (todo) => {

    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    };

    dispatch (action);

  };

  // Delete todo
  const handleDeleteTodo = (todo) => {

    const action = {
      type: '[TODO] Delete Todo',
      payload: todo
    };

    dispatch (action);
  };

  // Check todo
  const toggleTodo = (todo) => {

    const action = {
      type: '[TODO] Check Todo',
      payload: todo
    };

    dispatch (action);
  }
  
  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    toggleTodo
  }
}