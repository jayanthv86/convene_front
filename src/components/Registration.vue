<template v-if="this.user.success==='200'">
  <label>Success!</label>
</template>
<template v-else>
  <div class="col-sm-6 col-sm-offset-3">
    <h1>Sign Up</h1>
    <p>Sign-up for a free Ice cream account</p>
    <form>
      <input type="text" v-model="user.firstName" placeholder="First Name">
      <input type="text" v-model="user.lastName" placeholder="Last Name">
      <input type="email" v-model="user.login" placeholder="email">
      <input type="password" v-model="user.password" placeholder="password">
      <input type="checkbox" id="send_email" value="a" v-model="user.send_email">
      <label for="send_email">Send Activation Email</label>
      <br />
      <button type="submit" v-on:click="signUpForm()"">Sign Up</button>
    </form v-on:submit.prevent="onSubmit">
  </div>
</template>

<script>
import { signUpForm, loginWithFB } from '../auth'
export default {
  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        login: '',
        password: '',
        send_email: 'b',
        success: '200'
      }
    }
  },
  methods: {
    signUpForm() {
      this.$http.post('http://localhost:5000/signup', {user: this.user}).then(response => {
        this.user.success = response.body;
        alert('User successfully created');
        console.log(response);
      }, error => {
        alert('Error creating User');
        console.log(error);
      });
    }
  }
}
</script>

