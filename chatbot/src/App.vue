<template>
  <v-app>
    <v-content>
      <!--Navigation-->
      <v-row>
          <Header/>
      </v-row>

      <!--content-->
      <v-row style="max-height: 85%;">
        <v-col cols="3">
          <LeftSide/>
        </v-col>
        <v-col offset="2" cols="6">
          <ChatBot/>
        </v-col>
        <v-col cols="1">
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
import Header from './components/Header';


export default {
  name: 'App',

  components: {
    ChatBot,
    Footer,
    LeftSide,
    RightSide,
    Header,
  },

  data ()  {
    return {
      
    }
  },
};
</script>
