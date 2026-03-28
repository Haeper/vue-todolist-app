<template>
  <div class="about">
    <h1>About This App</h1>
    <p>
      A simple Todo List application built with <strong>Vue 3</strong> +
      <strong>Express</strong> + <strong>SQLite</strong> to demonstrate Vue.js
      core concepts:
    </p>
    <ul>
      <li>
        <strong>Components</strong> — Reusable UI building blocks (e.g.
        TodoItem)
      </li>
      <li>
        <strong>Reactivity</strong> — Automatic UI updates via Vue's reactive
        system
      </li>
      <li>
        <strong>Directives</strong> — v-model, v-for, v-if for template logic
      </li>
      <li><strong>Pinia</strong> — State management for shared data</li>
      <li><strong>Vue Router</strong> — Client-side routing between pages</li>
    </ul>
  </div>
</template>

<style scoped>
.about {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

ul {
  margin-top: 1rem;
  line-height: 2;
}
</style>
