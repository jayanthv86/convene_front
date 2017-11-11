<template>
  <div class="col-sm-6 col-sm-offset-3">
    <h1>Get Users!</h1>
    <button class="btn btn-primary" v-on:click="getUsers()">Get list of all users</button>
    <button class="btn btn-primary" v-on:click="getUsers_active()">Get list of active users</button>
    <button class="btn btn-primary" v-on:click="getUsers_pending()">Get list of pending users</button>
    <p>Only for users with admin account</p>
    <table class="table table-striped" v-if="users">
      <thead>
        <tr>
          <th>User</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" v-if="user.status==='ACTIVE'">
          <td>{{ user.id }}</td>
          <td>{{ user.profile.firstName }} {{ user.profile.lastName }}</td>
          <td>{{ user.profile.email }}</td>
          <td>{{ user.status }}</td>
          <td><button v-on:click="deactivate(user.id)">Deactivate</button></td>
        </tr>
        <tr v-for="user in users" v-if="user.status==='STAGED'">
          <td>{{ user.id }}</td>
          <td>{{ user.profile.name }}</td>
          <td>{{ user.profile.email }}</td>
          <td>{{ user.status }}</td>
          <td><button v-on:click="activate(user.id)">Activate</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getAuthHeader } from '../auth'
export default {
  data() {
    return {
      users: ''
    }
  },
  methods: {
    getUsers() {
      this.$http.get('http://localhost:5000/users',getAuthHeader()).then(response => {
        this.users = response.body;
      }, error => {
        console.log(error);
      });
    },
    getUsers_active() {
      this.$http.get('http://localhost:5000/users?status=active',getAuthHeader()).then(response => {
        this.users = response.body;
      }, error => {
        console.log(error);
      });
    },
    getUsers_pending() {
      this.$http.get('http://localhost:5000/users?status=pending',getAuthHeader()).then(response => {
        this.users = response.body;
      }, error => {
        console.log(error);
      });
    },
    activate(user_id){
      this.$http.get('http://localhost:5000/activate?user=' + user_id,getAuthHeader()).then(response => {
        this.users = response.body;
      }, error => {
        console.log(error);
      });
    },
    deactivate(user_id){
      this.$http.get('http://localhost:5000/deactivate?user=' + user_id,getAuthHeader()).then(response => {
        this.users = response.body;
      }, error => {
        console.log(error);
      });
    }
  }
}
</script>
