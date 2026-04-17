<script setup lang="ts">
const stack = ["Vue 3", "Express", "SQLite", "Pinia", "Vue Router"];

const sections = [
  {
    title: "Interface",
    body: "The UI is built from small Vue components, with template directives handling list rendering, conditionals, and input binding close to the markup.",
  },
  {
    title: "State",
    body: "Reactivity keeps the list in sync with edits and toggles, while Pinia gives the app one clear place for shared todo data and async actions.",
  },
  {
    title: "Routing",
    body: "Vue Router separates the app into focused pages so the project feels structured without becoming complicated.",
  },
  {
    title: "Backend",
    body: "Express and SQLite provide a compact API and persistence layer, making the whole flow easy to follow from UI to database.",
  },
];
</script>

<template>
  <section class="about">
    <header class="about-head">
      <h1>How this app is put together.</h1>
      <p class="intro">
        A compact full-stack example that keeps the moving parts readable while
        still covering interface, state, routing, API calls, and persistence.
      </p>
    </header>

    <ul class="stack-list">
      <li v-for="item in stack" :key="item">{{ item }}</li>
    </ul>

    <div class="section-grid">
      <article v-for="section in sections" :key="section.title" class="section-card">
        <h2>{{ section.title }}</h2>
        <p>{{ section.body }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  gap: 1.5rem;
  padding: 0.4rem 0;
}

.about-head {
  max-width: 44rem;
}

h1 {
  max-width: 12ch;
  font-size: clamp(1.9rem, 4vw, 3rem);
  line-height: 1;
  letter-spacing: -0.05em;
}

.intro {
  max-width: 36rem;
  margin-top: 0.9rem;
  color: var(--text-soft);
  font-size: 1rem;
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  padding: 0;
  list-style: none;
}

.stack-list li {
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(255, 176, 198, 0.26);
  color: var(--text-main);
  font-size: 0.9rem;
  font-weight: 700;
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.section-card {
  padding: 1.15rem 1.2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.76);
  border: 1px solid rgba(255, 176, 198, 0.22);
  box-shadow: 0 14px 24px rgba(177, 137, 152, 0.08);
}

.section-card h2 {
  font-size: 1.05rem;
  letter-spacing: -0.03em;
}

.section-card p {
  margin-top: 0.55rem;
  color: var(--text-soft);
}

@media (max-width: 720px) {
  .section-grid {
    grid-template-columns: 1fr;
  }
}
</style>
