<template>
  <!-- <div style="margin:0px;" id='mainDiv'> -->
    <v-row id='mainDiv' class="">
      
      <v-col cols="9" >
        <v-row class="ma-0 pa-0 d-flex justify-space-between">
          <v-col cols="3">
            <div style="margin-top:5px;margin-left:25px;"><h1 dark style="margin=30px;font-family: 'Abril Fatface';font-size:40px">ApuChat</h1>
            <v-icon class="mb2 orange--text text--darken-1" style=" margin-top:-100px; margin-left:180px ;" x-large>{{ icon }}</v-icon></div>
          </v-col>
          <v-col cols="3" class="d-flex justify-end">
            <!-- Start of About and Info drop down div blocks --> 
            <div style="">  <!--position:absolute; top : 25px ; left : 850px-->

            <!-- Start of dropdown div block holding About button -->
            <span class="Aboutdropdown">
            <button class="dropbtn" dark  style="display:inline;font-family: 'Abril Fatface';font-size:37px">ABOUT</button>
            <div class="dropdown-content">
            <p>
              This Chatbot mimics <b> Dr. Apurva Narayan [Professor at UBCO] </b> by providing users with information regarding 
              Software Development Life Cycles (SDLCs) based on the user’s queries. The user takes on 
              the role of a student in <b> COSC 310 [Software Engineering]</b> who is seeking to learn more about SDLCs. This Chatbot 
              was developed with the purpose of helping students review their knowledge of Software Engineering principles in an efficient manner.
            </p>
            </div>
            </span>
          
            <!-- End of dropdown div block holding About button -->
            
            <!-- Start of dropdown div block holding  Info button -->
            <span class="Infodropdown ml-2">
            <button id = "dropbtn2" class="material-icons mb2 orange--text text--darken-1" 
            style="font-family: 'Abril Fatface';" > <!--position:absolute; left : 150px ; top : 20px ;-->
            INFO</button>
            <div class="dropdown-content2">
             <p>
              Devleoped By: <br>
              Alex Rogov, Ahmad Raza Jamal, Florencia Chomski, Paul Zapote, Kshitij Suri
            </p>
            </div>
            </span>
            <!-- End of dropdown div block holding Info button -->

            </div>
          </v-col>
            </v-row>
            <!-- End of About and Info drop down div blocks --> 
        


        <!--Messenging bubbles and text appears in this row-->
          <v-row id="chatbox" style=" overflow: auto; margin-top: 20px; height: 510px;width: 100%;">
            <v-col cols="12">
              <div id="responses">
                    <ul class="pl-12 pl-12">
                        <!--Chatbot and users outputs are render into here-->
                    </ul>
              </div>
            </v-col>
          </v-row>

        <!--Where user inputs text-->
         <v-container class="ml-12" width="100%;">
          <v-row class="">
            <v-col cols="10" class="flex-grow-1" style="min-width:90%;" color="white" > <!--label="Chat"-->
              <v-text-field
              class=" black--text"
              style="font-size:20px;"
              color="black"
              placeholder="Chat about SDLC ( eg. ask about 'agile' )"
              v-model="message"  
              v-on:keyup.enter="inputMessage"
              ></v-text-field> 
            </v-col>
            <v-col cols="1" class="flex-shrink-1">
              <v-btn  
              v-on:click="inputMessage"
              
              x-large
              class="ml-0 mt-2"
              style="height:50px ; font-family: 'Abril Fatface'; font-size : 24px ; color: black ;" 
              >Send</v-btn>
            </v-col>
          </v-row>
        </v-container>
        <!--  End of user input -->

     </v-col>


  <v-col cols="3" class="pt-0">

  <!-- Start of div block 2 for FAQ section --> 
    <!--  A container the FAQ's --> 
    <v-container id="mainDiv2"  style="border-radius: 10px;" height="100%">
        <v-row class="mb-4">
          <v-col class="">
            <span class="ml-4" style="font-family: 'Abril Fatface';font-size:35px">FAQ 
            <i class="material-icons mb-2 orange--text text--darken-1 ml-1"  x-large
            title="Try out some of these examples"
            >help</i>
            </span>
          </v-col>
        </v-row>
          <!--  A row of button for first FAQ --> 
          <v-row v-for="faq in faqs" :key="faq.text">
            <v-col cols="12">
              <v-btn id="waterfall" width="330px" height="60px"  v-on:click="insertFAQ" 
              class="suggestions black--text mt-1 d-flex justify-start" 
              style="font-family: 'Merriweather', bold; font-size:18px" text>
              {{ faq.text }}
              </v-btn>
            </v-col>
          </v-row>

        </v-container>
        <!-- End of div block 2 for FAQ section -->
    </v-col>
  </v-row>
  <!-- </div> -->
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
        icon: 'question_answer',
        faqs: [{
          text: 'Waterfall',
        },{
          text: 'SDLC',
        },{
          text: 'Agile',
        },{
          text: 'Scrum',
        },{
          text: 'XP',
        },{
          text: 'RAD',
        }]
      } 
    },
    methods: {
        
    inputMessage: function() {
        if(this.message != '') {
            //Add user input
            this.createNewElement('responses','right','60%', this.message);
            
            //Processing user's message --> chatbot response
            this.DialogFlowAPI(this.message).then(response =>  {
              //Create new chatbot response
              this.createNewElement('responses','left', '60%' , response);
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
            newLi.style.textAlign = align;

            if(align == 'right'){ // If its the user chat then chang chat box color to this
            newLi.style.backgroundColor = "#999999" ; 
            newLi.style.border = "3px solid white"
            }

            newLi.style.borderRadius = "10px" ;
            newLi.style.padding="14px"; 
            newLi.style.margin="10px 0";
            newLi.style.left="310px";
            newLi.style.zIndex = "2";
            newLi.style.boxShadow = "0 0 8rem 0 rgba(black, 0.1),0rem 2rem 4rem -3rem rgba(black, 0.5);" ; 
            newLi.style.maxWidth = width;
            newLi.style.fontSize = "16px";
            newLi.style.fontFamily = "Merriweather, bold"
            let dest = document.getElementById(tagID).getElementsByTagName('ul')[0];

                        if(align == 'left'){ // If its the bot chat then chang chat box color to this
            newLi.style.backgroundColor = "#cccccc" ; 
            newLi.style.border = "3px solid white"
            newLi.style.marginTop = "-50px"
            }
            dest.appendChild(newLi);

            if(align == "left"){ // Code that adds the image for bot chat and aligns it 
            var img_elem = document.createElement("img");
            img_elem.setAttribute("src", "https://pbs.twimg.com/profile_images/775736572822052864/t_zQN3e3_400x400.jpg");
            img_elem.setAttribute("border-radius","50%");
            img_elem.setAttribute("height", "65px");
            img_elem.setAttribute("width", "65px");
            img_elem.style.borderRadius= "50%" ; 
            img_elem.style.position="relative";
            img_elem.style.top="55px";
            img_elem.style.left="-48px";
            newLi.style.position= "relative";
            newLi.style.left="80px";
            img_elem.style.border="5px solid orange"
            dest.appendChild(img_elem);
            dest.appendChild(newLi);
            }

            if(align == "right"){ // Code that adds the image for user chat and aligns it 
            var img_elem = document.createElement("img");
            img_elem.setAttribute("src", "https://www.kindpng.com/picc/m/105-1055656_account-user-profile-avatar-avatar-user-profile-icon.png");
            img_elem.setAttribute("border-radius","50%");
            img_elem.setAttribute("height", "60px");
            img_elem.setAttribute("width", "60px");
            img_elem.style.borderRadius= "50%" ; 
            img_elem.style.position="relative";
            img_elem.style.top="-50px";
            img_elem.style.border="4px solid black"
            newLi.style.position= "relative";
            img_elem.style.left="1026px";
            dest.appendChild(newLi);
            dest.appendChild(img_elem);}
    },

    insertFAQ: function(){ // Function that inserts FAQ
      var button = event.target ; 
      this.message = button.textContent ; 
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
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap');
@import url('https://fonts.googleapis.com/css?family=Sen&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto+Slab|Sen&display=swap');
@import url('https://fonts.googleapis.com/css?family=Merriweather&display=swap');
@import url('https://fonts.googleapis.com/css?family=Abril+Fatface&display=swap');

ul {
  list-style: none;
}


::placeholder{
  color: white;
}

#mainDiv{
    background-size: cover;
    background-position: center;
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    height:100%;
    /* width:77%; */
}

#mainDiv2{
    /* position:absolute; */
    /* top:0px; */
    /* left:1100px; */
    background-image:  linear-gradient(#ffc966 , #ffedcc );
    height:100%;
    /* width:34%; */
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 100px;
  font-family: 'Merriweather', bold;
  padding: 30px;
  background-color: #f9f9f9;
  /* min-width: 400px; */
  width: 400px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
}

.dropdown-content2 {
  display: none;
  position: absolute;
  right: -40px;
  font-family: 'Merriweather', bold;
  padding: 30px;
  background-color: #f9f9f9;
  min-width: 400px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
}

.Infodropdown:hover .dropdown-content2 {
  display: block;
}

.Aboutdropdown:hover .dropdown-content {
  display: block;
}

/*  On hover to suggestions div blocks change the background color to highlight */ 
.suggestions:hover {
  background-color:#ffffff;
}

</style>
