import Vue from 'vue'
import socketio from 'socket.io';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue'
import vuetify from './plugins/vuetify'

export const SocketInstance = socketio('http://localhost:8080');

Vue.use(VueSocketIO, SocketInstance);


Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#chatbot-app')
