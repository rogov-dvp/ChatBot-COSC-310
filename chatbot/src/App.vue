<template>
  <v-app>
    <v-content>
      <!--content-->
      <v-row style="min-height: 110%;">
        <v-col cols="9" style = "background-image:/assets/mainchatbackground.jpg;">
          <ChatBot/>
        </v-col>
        <v-col cols="3" class="dark grey">
          <RightSide/>
        </v-col>
      </v-row>
<!--  -->
      <Footer/>
    </v-content>
  </v-app>
</template>

<script>
import ChatBot from './components/ChatBot';
import Footer from './components/Footer';
import RightSide from './components/RightSide';


export default {
  name: 'App',

  components: {
    ChatBot,
    Footer,
    RightSide
  },

  data ()  {
    return {
      
    }
  },
};
</script>
