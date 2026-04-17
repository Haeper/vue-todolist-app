<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app-shell">
    <div class="accent accent-left" aria-hidden="true"></div>
    <div class="accent accent-right" aria-hidden="true"></div>

    <header class="topbar">
      <RouterLink to="/" class="brand">
        <span class="brand-tag">Soft List</span>
        <strong>Daily tasks</strong>
      </RouterLink>

      <nav class="nav-pills">
        <RouterLink to="/">Tasks</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </header>

    <main class="content-area">
      <RouterView v-slot="{ Component }">
        <Transition name="page-swap" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  width: min(1100px, calc(100% - 2rem));
  margin: 0 auto;
  padding: 2rem 0 3rem;
}

.accent {
  position: absolute;
  border-radius: 999px;
  filter: blur(4px);
  opacity: 0.85;
  pointer-events: none;
}

.accent-left {
  top: 0.5rem;
  left: -0.5rem;
  width: 10rem;
  height: 10rem;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.95), transparent 34%),
    linear-gradient(135deg, rgba(255, 143, 177, 0.65), rgba(255, 226, 154, 0.8));
}

.accent-right {
  top: 3rem;
  right: 2rem;
  width: 7rem;
  height: 7rem;
  background:
    radial-gradient(circle at 65% 35%, rgba(255, 255, 255, 0.9), transparent 28%),
    linear-gradient(135deg, rgba(168, 230, 207, 0.85), rgba(255, 255, 255, 0.2));
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  position: relative;
  z-index: 1;
}

.brand {
  display: inline-flex;
  flex-direction: column;
  gap: 0.15rem;
  text-decoration: none;
  color: var(--text-main);
}

.brand strong {
  font-size: clamp(1.45rem, 2vw, 1.85rem);
  letter-spacing: -0.04em;
}

.brand-tag {
  align-self: flex-start;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 176, 198, 0.35);
  color: var(--pink-strong);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  box-shadow: 0 12px 24px rgba(177, 137, 152, 0.08);
}

.nav-pills {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.64);
  border: 1px solid rgba(255, 176, 198, 0.32);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 40px rgba(177, 137, 152, 0.12);
}

.nav-pills a {
  padding: 0.7rem 1rem;
  border-radius: 999px;
  color: var(--text-soft);
  font-weight: 700;
  text-decoration: none;
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease;
}

.nav-pills a:hover {
  transform: translateY(-1px);
  color: var(--pink-strong);
  background: rgba(255, 255, 255, 0.72);
  box-shadow: 0 10px 20px rgba(177, 137, 152, 0.08);
}

.nav-pills a.router-link-exact-active {
  color: var(--pink-strong);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 244, 248, 0.88));
  box-shadow: 0 12px 22px rgba(177, 137, 152, 0.14);
}

.content-area {
  position: relative;
  z-index: 1;
  padding: 0.25rem 0 0;
}

.page-swap-enter-active,
.page-swap-leave-active {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.page-swap-enter-from,
.page-swap-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

@media (max-width: 780px) {
  .app-shell {
    width: min(100%, calc(100% - 1rem));
    padding-top: 1rem;
  }

  .topbar {
    flex-direction: column;
    align-items: stretch;
  }

  .nav-pills {
    justify-content: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-pills a,
  .page-swap-enter-active,
  .page-swap-leave-active {
    transition: none;
  }
}
</style>
