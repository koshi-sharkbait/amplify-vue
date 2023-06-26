<template>
  <main>
    <header>
      <h2>Amplify × Vue × Vite</h2>
      <nav class="nav">
        <ul class="list">
          <li><router-link class="routerLink" to="/">Home</router-link></li>
          <li><router-link class="routerLink" to="/chat">Chat</router-link></li>
          <li><router-link class="routerLink" to="/ai">AI</router-link></li>
          <li><router-link class="routerLink" to="/geo">Geo</router-link></li>
        </ul>
      </nav>
      <button @click="signOut" class="contact">Sign out</button>
    </header>
    <section>
      <router-view/>
    </section>
  </main>
</template>

<style>
@import '@/assets/base.css';
</style>
