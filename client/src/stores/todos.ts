import { defineStore } from "pinia";
import { ref } from "vue";

const API_URL = "/api/todos";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

// Vue (Pinia): just a function returning reactive state, call useTodoStore() anywhere
// React (Context): needs createContext, Provider wrapper, useContext hook...
export const useTodoStore = defineStore("todos", () => {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);

  async function fetchTodos() {
    loading.value = true;
    const res = await fetch(API_URL);
    todos.value = await res.json();
    loading.value = false;
  }

  async function addTodo(title: string) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const todo: Todo = await res.json();
    todos.value.unshift(todo);
  }

  async function toggleTodo(id: number, completed: boolean) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    const updated: Todo = await res.json();
    const idx = todos.value.findIndex((t) => t.id === id);
    if (idx !== -1) todos.value[idx] = updated;
  }

  async function updateTitle(id: number, title: string) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const updated: Todo = await res.json();
    const idx = todos.value.findIndex((t) => t.id === id);
    if (idx !== -1) todos.value[idx] = updated;
  }

  async function deleteTodo(id: number) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    todos.value = todos.value.filter((t) => t.id !== id);
  }

  return {
    todos,
    loading,
    fetchTodos,
    addTodo,
    toggleTodo,
    updateTitle,
    deleteTodo,
  };
});
