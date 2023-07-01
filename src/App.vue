<template>
  <authenticator>
    <template v-slot="{ user, signOut }">
      <main>
        <header>
          <h2>Chat App</h2>
          <nav class="nav">
            <ul class="list">
              <li><router-link class="routerLink" to="/">Home</router-link></li>
              <li><router-link class="routerLink" to="/chat">Chat</router-link></li>
            </ul>
          </nav>
          <button @click="signOut" class="contact">Sign out</button>
        </header>
        <section>
          <router-view :username="user.username" />
        </section>
      </main>
    </template>
  </authenticator>
</template>

<style>
@import '@/assets/base.css';
</style>
