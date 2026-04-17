<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTodoStore } from "@/stores/todos";
import TodoItem from "@/components/TodoItem.vue";

const store = useTodoStore();
// Vue: ref() — just change .value directly, UI auto-updates
// React: const [newTitle, setNewTitle] = useState('')
const newTitle = ref("");
const completedCount = computed(
  () => store.todos.filter((todo) => todo.completed).length,
);
const totalCount = computed(() => store.todos.length);
const remainingCount = computed(() => store.todos.length - completedCount.value);
const progressLabel = computed(() => {
  if (!store.todos.length) return "Start with one small task.";
  return `${completedCount.value} of ${store.todos.length} tasks finished`;
});
const overviewTitle = computed(() => {
  if (!totalCount.value) return "No tasks yet.";
  if (!remainingCount.value) return "Everything is done.";
  if (!completedCount.value) return "Ready to get started?";
  return "A steady day so far.";
});
const overviewText = computed(() => {
  if (!totalCount.value) {
    return "Add the first task below to start the list.";
  }
  if (!remainingCount.value) {
    return "You cleared the board. Add another task whenever you are ready.";
  }
  if (!completedCount.value) {
    return "Nothing has been checked off yet. Start with the next item below.";
  }
  return "The counters on the right show progress. Keep moving through the list at a calm pace.";
});

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
    <section class="overview-head">
      <div class="overview-copy">
        <h1>{{ overviewTitle }}</h1>
        <p class="overview-text">{{ overviewText }}</p>
      </div>

      <div class="overview-stats">
        <article class="stat-card">
          <span class="stat-label">Remaining</span>
          <strong>{{ remainingCount }}</strong>
        </article>
        <article class="stat-card stat-card--accent">
          <span class="stat-label">Completed</span>
          <strong>{{ completedCount }}</strong>
        </article>
      </div>
    </section>

    <form class="add-form" @submit.prevent="handleAdd">
      <label class="sr-only" for="new-title">New task</label>
      <!-- Vue: v-model does two-way binding in one line -->
      <!-- React: <input value={newTitle} onChange={e => setNewTitle(e.target.value)} /> -->
      <input
        id="new-title"
        v-model="newTitle"
        placeholder="Write the next small task"
        class="add-input"
      />
      <button type="submit" class="add-btn">Add task</button>
    </form>

    <section class="list-shell">
      <div class="list-header">
        <div>
          <p class="eyebrow">Task board</p>
          <h2>Today at a glance</h2>
        </div>
        <p class="list-caption">{{ progressLabel }}</p>
      </div>

      <p v-if="store.loading" class="feedback-card loading">Loading your list...</p>

      <ul v-else-if="store.todos.length" class="todo-list">
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

      <div v-else class="feedback-card empty-state">
        <h3>Nothing here yet</h3>
        <p>Add a single task and the board will start to take shape.</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  display: grid;
  gap: 1.5rem;
}

.add-form,
.list-shell {
  position: relative;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 176, 198, 0.28);
  box-shadow: 0 20px 40px rgba(177, 137, 152, 0.1);
}

.overview-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 1rem 1.5rem;
  flex-wrap: wrap;
  padding: 0.15rem 0.2rem 0;
}

.overview-copy {
  flex: 1 1 24rem;
  max-width: 34rem;
}

.eyebrow {
  margin-bottom: 0.65rem;
  color: var(--pink-strong);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.overview-copy h1 {
  max-width: 12ch;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.overview-text {
  max-width: 28rem;
  margin-top: 0.75rem;
  color: var(--text-soft);
  font-size: 0.98rem;
}

.overview-stats {
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.75rem;
  flex: 0 0 auto;
}

.stat-card {
  min-width: 8.5rem;
  padding: 0.8rem 0.9rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(255, 176, 198, 0.2);
  box-shadow: none;
}

.stat-card--accent {
  background: rgba(168, 230, 207, 0.2);
}

.stat-label {
  display: block;
  margin-bottom: 0.3rem;
  color: var(--text-soft);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.stat-card strong {
  font-size: clamp(1.45rem, 3vw, 1.9rem);
  line-height: 1;
}

.add-form {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 0.85rem;
  padding: 1rem;
}

.add-input {
  width: 100%;
  min-height: 3.4rem;
  padding: 0.95rem 1.15rem;
  border: 1px solid rgba(255, 176, 198, 0.34);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.94);
  color: var(--text-main);
  outline: none;
  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;
}

.add-input::placeholder {
  color: #b0a8b5;
}

.add-input:focus {
  border-color: rgba(242, 111, 153, 0.55);
  box-shadow: 0 0 0 4px rgba(255, 143, 177, 0.14);
  transform: translateY(-1px);
}

.add-btn {
  min-height: 3.4rem;
  padding: 0.95rem 1.45rem;
  border-radius: 18px;
  border: none;
  background: linear-gradient(135deg, var(--pink), #ffb0c6);
  color: white;
  font-weight: 800;
  letter-spacing: 0.01em;
  cursor: pointer;
  box-shadow: 0 16px 24px rgba(242, 111, 153, 0.22);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    filter 180ms ease;
}

.add-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 20px 30px rgba(242, 111, 153, 0.28);
  filter: saturate(1.05);
}

.list-shell {
  padding: 1.2rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: end;
  margin-bottom: 1rem;
}

.list-header h2 {
  font-size: clamp(1.35rem, 3vw, 1.9rem);
  letter-spacing: -0.04em;
}

.list-caption {
  color: var(--text-soft);
  font-weight: 600;
  text-align: right;
}

.todo-list {
  list-style: none;
  display: grid;
  gap: 0.9rem;
}

.feedback-card {
  padding: 1.4rem;
  border-radius: 22px;
  text-align: center;
  color: var(--text-soft);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.82), rgba(255, 250, 244, 0.9));
  border: 1px dashed rgba(255, 176, 198, 0.35);
}

.empty-state h3 {
  margin-bottom: 0.35rem;
  color: var(--text-main);
  font-size: 1.1rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 780px) {
  .overview-head {
    align-items: start;
  }

  .overview-stats {
    justify-content: flex-start;
  }

  .add-form {
    grid-template-columns: 1fr;
  }

  .list-header {
    flex-direction: column;
    align-items: start;
  }

  .list-caption {
    text-align: left;
  }
}

@media (prefers-reduced-motion: reduce) {
  .add-input,
  .add-btn {
    transition: none;
  }
}
</style>
