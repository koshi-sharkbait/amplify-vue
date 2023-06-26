<template>
  <authenticator>
    <!-- 追加 1 -->
    <template v-slot="{ user, signOut }">
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
          <!-- 追加 2 -->
          <button @click="signOut" class="contact">Sign out</button>
        </header>
        <section>
          <!-- 追加 3 -->
          <router-view :username="user.username" />
        </section>
      </main>
    <!-- 追加 4 -->
    </template>
  </authenticator>
</template>

<style>
@import '@/assets/base.css';
</style>
