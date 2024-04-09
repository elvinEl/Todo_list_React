import React, { useEffect, useState } from "react";
function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };
  const handlePress = (e) => {
    if (e.charCode === 13) {
      addTodo();
    }
  };
  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index]);
  };
  const saveEditing = (index) => {
    const updateTodos = [...todos];
    updateTodos[index] = editingText;
    setTodos(updateTodos);
    setEditingIndex(null);
  };
  const deleteTodo = (index) => {
    const updateTodos = [...todos];
    updateTodos.splice(index, 1);
    setTodos(updateTodos);
  };
  useEffect(() => {
    const allTodos = localStorage.getItem("Todos");
    if (allTodos) {
      setTodos(JSON.parse(allTodos));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("Todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handlePress}
      />
      <button onClick={addTodo}>Add todo</button>
      {todos.map((todo, index) => (
        <li key={index}>
          {index === editingIndex ? (
            <>
              <input
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />
              <button onClick={() => saveEditing(index)}>Save</button>
            </>
          ) : (
            <>
              {todo} <button onClick={() => deleteTodo(index)}>Delete</button>{" "}
              <button onClick={() => startEditing(index)}>Edit todo</button>
            </>
          )}
        </li>
      ))}
    </div>
  );
}

export default App;
