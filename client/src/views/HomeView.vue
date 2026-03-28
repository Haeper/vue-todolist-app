<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTodoStore } from "@/stores/todos";
import TodoItem from "@/components/TodoItem.vue";

const store = useTodoStore();
// Vue: ref() — just change .value directly, UI auto-updates
// React: const [newTitle, setNewTitle] = useState('')
const newTitle = ref("");

onMounted(() => {
  store.fetchTodos();
});

async function handleAdd() {
  const title = newTitle.value.trim();
  if (!title) return;
  await store.addTodo(title);
  newTitle.value = "";
}
</script>

<template>
  <div class="home">
    <h1>📝 Todo List</h1>

    <form class="add-form" @submit.prevent="handleAdd">
      <!-- Vue: v-model does two-way binding in one line -->
      <!-- React: <input value={newTitle} onChange={e => setNewTitle(e.target.value)} /> -->
      <input
        v-model="newTitle"
        placeholder="What needs to be done?"
        class="add-input"
      />
      <button type="submit" class="add-btn">Add</button>
    </form>

    <p v-if="store.loading" class="loading">Loading...</p>

    <ul v-else class="todo-list">
      <!-- Vue: v-for directive -->
      <!-- React: {store.todos.map(todo => <TodoItem key={todo.id} ... />)} -->
      <TodoItem
        v-for="todo in store.todos"
        :key="todo.id"
        :todo="todo"
        @toggle="store.toggleTodo"
        @update="store.updateTitle"
        @delete="store.deleteTodo"
      />
    </ul>

    <p v-if="!store.loading && store.todos.length === 0" class="empty">
      No todos yet. Add one above!
    </p>
  </div>
</template>

<style scoped>
.home {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}

.add-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.add-input {
  flex: 1;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.add-btn:hover {
  background: #38a376;
}

.todo-list {
  list-style: none;
  padding: 0;
  border: 1px solid #eee;
  border-radius: 6px;
}

.loading,
.empty {
  text-align: center;
  color: #999;
  margin-top: 2rem;
}
</style>
