<template>
  <v-app>
    <v-content>
      <!--Navigation-->
      <v-row>
          <Toolbar/>
      </v-row>

      <!--content-->
      <v-row style="max-height: 85%;">
        <v-col cols="3">
          <LeftSide/>
        </v-col>
        <v-col cols="6">
          <ChatBot/>
        </v-col>
        <v-col cols="3">
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
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import Toolbar from './components/Toolbar';


export default {
  name: 'App',

  components: {
    ChatBot,
    Footer,
    LeftSide,
    RightSide,
    Toolbar,
  },

  data: () => ({
    //
  }),
};
</script>
