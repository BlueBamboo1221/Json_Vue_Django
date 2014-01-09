<template>
  <v-app id="app-background">
    <navbar v-if="isAuthenticated"></navbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';

import Navbar from './components/Navbar';

export default {
  name: 'app',
  components: {
    Navbar,
  },
  computed: mapGetters('auth', [
    'isAuthenticated',
  ]),
};
</script>

<style>
  #app-background {
    background-image: url("https://images.unsplash.com/photo-1497733942558-e74c87ef89db?dpr=1&auto=compress,format&fit=crop&w=1650&h=&q=80&cs=tinysrgb&crop=");
    background-size: cover;
    overflow: hidden;
  }
</style>
