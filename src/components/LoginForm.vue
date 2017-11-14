<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h1>Login</h1>
    <p>Sign-in for a premium experience</p>
    <form @submit.prevent="login">
      <input type="email" v-model="user.login" placeholder="email">
      <input type="password" v-model="user.password" placeholder="password">
      <button type="submit">Login</button> or
      <button v-on:click="loginO365">Login with O365</button>
      <button v-on:click="loginGSuite">Login with Gsuite</button>
    </form>
  </div>
</template>

<script>
import { loginWithForm, loginWithO365, loginWithGSuite } from '../auth'
export default {
  data() {
    return {
      user: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    login: function(){
      loginWithForm(this.user.login, this.user.password);
    },
    loginO365: function(){
      loginWithO365();
    },
    loginGSuite: function(){
      loginWithGSuite();
    }
  }
}
</script>
