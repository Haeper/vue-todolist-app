<script setup lang="ts">
import { ref } from "vue";
import type { Todo } from "@/stores/todos";

const props = defineProps<{ todo: Todo }>();
const emit = defineEmits<{
  toggle: [id: number, completed: boolean];
  update: [id: number, title: string];
  delete: [id: number];
}>();

const editing = ref(false);
const editTitle = ref("");

function startEdit() {
  editing.value = true;
  editTitle.value = props.todo.title;
}

function saveEdit() {
  if (editTitle.value.trim()) {
    emit("update", props.todo.id, editTitle.value.trim());
  }
  editing.value = false;
}
</script>

<template>
  <li class="todo-item" :class="{ completed: todo.completed }">
    <input
      type="checkbox"
      :checked="todo.completed"
      @change="emit('toggle', todo.id, !todo.completed)"
    />

    <template v-if="editing">
      <input
        v-model="editTitle"
        class="edit-input"
        @keyup.enter="saveEdit"
        @blur="saveEdit"
        ref="editInput"
      />
    </template>
    <template v-else>
      <span class="title" @dblclick="startEdit">{{ todo.title }}</span>
    </template>

    <button class="delete-btn" @click="emit('delete', todo.id)">✕</button>
  </li>
</template>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
}

.todo-item.completed .title {
  text-decoration: line-through;
  color: #999;
}

.title {
  flex: 1;
  cursor: pointer;
}

.edit-input {
  flex: 1;
  padding: 0.25rem 0.5rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.delete-btn {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
}

.delete-btn:hover {
  background: #ffeaea;
  border-radius: 4px;
}
</style>
