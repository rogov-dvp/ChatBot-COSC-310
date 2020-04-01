<template>
  <div class="d-flex justify-between">
    <v-row class="">
      <v-col cols="12" >
        <!--Chatbot icon and header messenging box-->
        <v-row>
          <v-col>
            <v-icon x-large class="grey--text text--darken-4">adb</v-icon>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-icon x-large class="grey--text text--darken-4">person</v-icon>
          </v-col>
        </v-row>
        <!--Messenging bubbles and text appears in this row-->
          <v-row id="chatbox" style="height: 400px;border: 1px solid #212121; overflow: auto;">
            <v-col cols="12">
              <div id="responses">
                    <ul>
                        <!--Chatbot and users outputs are render into here-->
                    </ul>
              </div>
            </v-col>
          </v-row>

        <!--Where user inputs text-->
        <v-container>
          <v-row class="">
            <v-col cols="10" class="flex-grow-1 pl-0"> <!--label="Chat"-->
              <v-text-field
              class="ml-0"
              placeholder="Chat about SDLC (eg. type: 'agile')"
              outlined
              v-model="message"   
              v-on:keyup.enter="inputMessage"
              ></v-text-field> 
            </v-col>
            <v-col cols="2" class="flex-shrink-1">
              <v-btn 
              v-on:click="inputMessage" 
              style="min-width:120px;" 
              x-large
              class=""
              >Send</v-btn>
            </v-col>
          </v-row>
        </v-container>
      
      </v-col>
    </v-row>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios';

//DialogFlow API
const token = '9a9c43e5c3c54464ae93aeab97a93c22'    //Client Access token

//Google Search API (Might use later -alex)
const apiKey = "AIzaSyBxcOy7bBJkgC9QsRXMmR47l5DR90cG9uA"; //API key
const cx = "008015703887553875666:rvmi3t7qwnf" //Google Engine ID

  export default {
    name: 'Chatbot',
    data() {
      return {
        message: '',          //User's message
      } 
    },
    methods: {
        
    inputMessage: function() {
        if(this.message != '') {
            //Add user input
            this.createNewElement('responses','right','100%', this.message);
            
            //Processing user's message --> chatbot response
            this.DialogFlowAPI(this.message).then(response =>  {
              //Create new chatbot response
              this.createNewElement('responses','left', '66%' , response);
              //Yes, a second one is needed.
              this.scrollToBottom();    
            });

              //scroll to bottom of message box if needed
              this.scrollToBottom(); 
              this.message = '';
        }
    },

    //Create a new element into DOM 
    createNewElement: function(tagID,align,width, msg) {    //Creates new <li> element with appropriate class and styling
            let newLi = document.createElement('li');
            newLi.textContent = msg;
            newLi.className = 'subtitle-1 font-weight-medium ma-2'
            newLi.style.textAlign = align;
            newLi.style.maxWidth = width;
            let dest = document.getElementById(tagID).getElementsByTagName('ul')[0];
            dest.appendChild(newLi);
    },

    scrollToBottom: function() {      //scroll div to bottom
      let chatbox = document.getElementById('chatbox');
      chatbox.scrollTop = chatbox.scrollHeight;
    },

    DialogFlowAPI: function(queryUser) {
          return axios.get(
              `https://api.dialogflow.com/v1/query?v=20150910&lang=en&sessionId=12346&query=${queryUser}`,   //API URL
              {
                headers: {
                  Authorization: `Bearer ${token}`      //Public Access Token
                }
              }
          ).then(response => {

          // handle success
          let snippet = response.data.result.fulfillment.speech;      //Get's the response based on user's message
          console.log('snippet: ' + snippet);
          return snippet;       
      })
      .catch(function (error) {
          // handle error
          console.log(error);
      });
    }
    }
  }
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
