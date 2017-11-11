<template>
  <div class="col-sm-6 col-sm-offset-3" created="login">
    <h1>Login</h1>
    <p>Sign-in for a premium experience</p>
    <button v-on:click="login()">Activate</button>

  </div>
</template>

<script>
import { loginWithOkta, isLoggedInOkta } from '../auth'
export default {
  data() {
    return {
    }
  },
  methods: {
    login: function(){
      var ele = document.getElementById("okta-login-container");

      if(isLoggedInOkta()){
        var visibility = ele.style.visibility;
        ele.style.visibility = 'hidden'
      }
      else{
        var visibility = ele.style.visibility;
        ele.style.visibility = visibility == "visible" ? 'hidden' : "visible"
      }
    }
  }
}
</script>
