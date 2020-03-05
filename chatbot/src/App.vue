<template>
  <v-app>
    <v-content>
      <!--Navigation-->
      <v-row style="">
          <Toolbar/>
      </v-row>

      <!--content-->
      <v-row>
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

    </v-content>
  </v-app>
</template>

<script>
import ChatBot from './components/ChatBot';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';
import Toolbar from './components/Toolbar';

export default {
  name: 'App',

  components: {
    ChatBot,
    LeftSide,
    RightSide,
    Toolbar,
  },

  data: () => ({
    //
  }),
};
</script>
