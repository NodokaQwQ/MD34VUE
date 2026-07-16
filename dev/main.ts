import { createApp, ref } from 'vue'
import App from './App.vue'
import Md34Vue from '../src'

createApp(App)
  .use(Md34Vue)
  .provide('demoMountedAt', ref(new Date()))
  .mount('#app')
