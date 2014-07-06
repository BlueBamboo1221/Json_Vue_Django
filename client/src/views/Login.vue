<template>
  <main>
    <v-container fluid fill-height class="loginOverlay">
      <v-layout flex align-center justify-center>
        <v-flex xs12 md6 elevation-6>
          <v-toolbar class="pt-5 blue darken-4">
            <v-toolbar-side-icon class="white--text"></v-toolbar-side-icon>
            <v-layout justify-space-between>
              <v-toolbar-title class="white--text"><h3>Welcome Ground Truth</h3></v-toolbar-title>
              <!--<router-link to="/register" class="white&#45;&#45;text pt-2">-->
              <!--create account-->
              <!--</router-link>-->
            </v-layout>
          </v-toolbar>
          <v-card>
            <v-card-text class="pt-4">
              <div>
                <v-form v-model="valid" ref="form" @submit.prevent="submit">
                  <v-text-field
                    label="Enter your Username"
                    v-model="inputs.username"
                    type="text"
                    id="username"
                    placeholder="username"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Enter your password"
                    v-model="inputs.password"
                    min="8"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    @click:append="() => (e1 = !e1)"
                    :type="e1 ? 'password' : 'text'"
                    :rules="passwordRules"
                    placeholder="password"
                    counter
                    required
                  ></v-text-field>
                  <v-layout justify-space-between>
                    <v-btn @click="login(inputs)" id="login-button"
                           :class=" { 'blue darken-4 white--text': valid, disabled: !valid }">
                      Login
                    </v-btn>
                    <!--<router-link to="/password_reset">reset password</router-link>-->
                  </v-layout>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <a href="https://unsplash.com/photos/i6Wc5qZO5MQ" target="_blank">
      <v-card class="photoCredit teal">
        <v-card-title>
          <div class="white--text">
            Photo by Tatyana Dobreva on Unsplash
          </div>
        </v-card-title>
      </v-card>
    </a>
  </main>
</template>

<script>
export default {
  data() {
    return {
      inputs: {
        username: '',
        password: '',
      },
      valid: false,
      e1: false,
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    login({ username, password }) {
      this.$store.dispatch('auth/login', { username, password })
        .then(() => this.$router.push('/'));
    },
  },
};
</script>

<style>
  .loginOverlay {
    background: rgba(33, 150, 243, 0.3);
  }

  .photoCredit {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
</style>
