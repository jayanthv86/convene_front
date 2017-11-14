<template>
  <div id="app">
    <img src="../assets/convene.png">
    <!-- Menu -->
    <nav class="navbar navbar-default">
      <div class="container">
        <ul class="nav navbar-nav">
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/profile">My Profile</router-link></li>
          <li><router-link to="/google">Get Google details</router-link></li>
          <li><router-link to="/o365">Get O365 details</router-link></li>
          <li><router-link to="/loginOkta">Login with Okta(Widget)</router-link></li>
          <li><router-link to="/registration">Register</router-link></li>
          <li><router-link to="/logout">Logout</router-link></li>

        </ul>
      </div>
    </nav>
    <!-- End of Menu -->
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body{
  background-color: #FFFFEE;
}
</style>
