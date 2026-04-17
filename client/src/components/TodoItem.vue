<script setup lang="ts">
import { nextTick, ref } from "vue";
import type { Todo } from "@/stores/todos";

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  toggle: [id: number, completed: boolean];
  update: [id: number, title: string];
  delete: [id: number];
}>();

const editing = ref(false);
const editTitle = ref("");
const editInput = ref<HTMLInputElement | null>(null);

async function startEdit() {
  editing.value = true;
  editTitle.value = props.todo.title;
  await nextTick();
  editInput.value?.focus();
  editInput.value?.select();
}

function saveEdit() {
  if (editTitle.value.trim()) {
    emit("update", props.todo.id, editTitle.value.trim());
  }
  editing.value = false;
}

function cancelEdit() {
  editing.value = false;
  editTitle.value = props.todo.title;
}
</script>

<template>
  <li class="todo-item" :class="{ completed: todo.completed, editing }">
    <label
      class="check-control"
      :aria-label="
        todo.completed
          ? 'Mark task as not completed'
          : 'Mark task as completed'
      "
    >
      <input
        class="check-input"
        type="checkbox"
        :checked="todo.completed"
        @change="emit('toggle', todo.id, !todo.completed)"
      />
      <span class="check-indicator" aria-hidden="true"></span>
    </label>

    <div class="todo-content">
      <input
        v-if="editing"
        ref="editInput"
        v-model="editTitle"
        class="edit-input"
        @keyup.enter="saveEdit"
        @keyup.esc="cancelEdit"
        @blur="saveEdit"
      />
      <button v-else type="button" class="title-button" @click="startEdit">
        {{ todo.title }}
      </button>

      <span class="status-pill">
        {{ todo.completed ? "Completed" : "In progress" }}
      </span>
    </div>

    <button class="delete-btn" type="button" @click="emit('delete', todo.id)">
      Remove
    </button>
  </li>
</template>

<style scoped>
.todo-item {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem;
  border-radius: 22px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(255, 250, 246, 0.95));
  border: 1px solid rgba(255, 176, 198, 0.22);
  box-shadow: 0 18px 30px rgba(177, 137, 152, 0.08);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.todo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 32px rgba(177, 137, 152, 0.1);
  border-color: rgba(255, 176, 198, 0.35);
}

.check-control {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  cursor: pointer;
}

.check-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.check-indicator {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  border: 2px solid rgba(121, 202, 167, 0.9);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: inset 0 1px 2px rgba(91, 85, 99, 0.06);
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;
}

.check-indicator::after {
  content: "";
  position: absolute;
  inset: 0;
  margin: auto;
  width: 0.45rem;
  height: 0.78rem;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg) scale(0.7);
  opacity: 0;
  transition:
    transform 180ms ease,
    opacity 180ms ease;
}

.check-input:focus-visible + .check-indicator {
  box-shadow:
    0 0 0 4px rgba(168, 230, 207, 0.2),
    inset 0 1px 2px rgba(91, 85, 99, 0.06);
}

.check-input:checked + .check-indicator {
  border-color: transparent;
  background: linear-gradient(135deg, var(--mint-strong), #95dcb9);
  transform: scale(1.03);
}

.check-input:checked + .check-indicator::after {
  opacity: 1;
  transform: rotate(45deg) scale(1);
}

.todo-content {
  min-width: 0;
  display: grid;
  gap: 0.45rem;
}

.title-button {
  padding: 0;
  border: none;
  background: none;
  text-align: left;
  color: var(--text-main);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}

.title-button:hover {
  color: var(--pink-strong);
}

.edit-input {
  width: 100%;
  min-width: 0;
  padding: 0.65rem 0.85rem;
  border: 1px solid rgba(255, 176, 198, 0.35);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--text-main);
  outline: none;
  box-shadow: 0 0 0 4px rgba(255, 143, 177, 0.08);
}

.status-pill {
  align-self: start;
  width: fit-content;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 226, 154, 0.35);
  color: #8e6f35;
  font-size: 0.78rem;
  font-weight: 700;
}

.delete-btn {
  padding: 0.7rem 0.95rem;
  border-radius: 16px;
  border: 1px solid rgba(255, 176, 198, 0.25);
  background: rgba(255, 245, 247, 0.92);
  color: #c36785;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 180ms ease,
    transform 180ms ease,
    box-shadow 180ms ease;
}

.delete-btn:hover {
  transform: translateY(-1px);
  background: rgba(255, 238, 242, 0.98);
  box-shadow: 0 10px 16px rgba(177, 137, 152, 0.08);
}

.todo-item.completed .title-button {
  color: var(--text-soft);
  text-decoration: line-through;
  text-decoration-thickness: 2px;
}

.todo-item.completed .status-pill {
  background: rgba(168, 230, 207, 0.32);
  color: #3f8d6c;
}

@media (max-width: 620px) {
  .todo-item {
    grid-template-columns: auto minmax(0, 1fr);
  }

  .delete-btn {
    grid-column: 2;
    justify-self: start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .todo-item,
  .check-indicator,
  .check-indicator::after,
  .delete-btn {
    transition: none;
  }
}
</style>
