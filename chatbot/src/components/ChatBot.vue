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
          <v-row style="height: 400px;border: 1px solid #212121; overflow: auto;">
            <v-col cols="12">
              <div id="chat-bot-response" class="chatbot">
                  <h2>*Chatbot*</h2>
                    <ul>
                        <!--Chatbot outputs are render into here-->
                    </ul>
              </div>
              <div id="user-response" class="user" style="text-align: right;">
                  <h2>*User*</h2>
                    <ul>
                      <!--User input are render into here-->
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
  export default {
    name: 'Chatbot',
    data() {
      return {
        message: '',
        msg: [],
        hashtable: '',
      } 
    },
    methods: {
        
    inputMessage: function() {
        if(this.message != '') {
            //Add user input
            this.createNewElement('user-response', this.message);
            this.createEmptySpace('user-response');
            //TODO: add code for spliting words. Currently, it takes one key word
            
            let keywords = this.sentenceProcess(this.message);
            let chatBotResponse = this.hashQuery(keywords);

            //TODO: if key is not found return             
            this.createEmptySpace('chat-bot-response');
            this.createNewElement('chat-bot-response', chatBotResponse);                
            this.message = '';
        }
    },
    createEmptySpace(tagID) {
      let newBr = document.createElement('br');
      let dest = document.getElementById(tagID).getElementsByTagName('ul')[0];
      dest.appendChild(newBr);
    },
    //Create a new element into DOM
    createNewElement: function(tagID, msg) {
            let newLi = document.createElement('li');
            newLi.textContent = msg;
            let dest = document.getElementById(tagID).getElementsByTagName('ul')[0];
            dest.appendChild(newLi);
    },
    sentenceProcess: function(msg) {
      let substringArr = msg.split(' ');             //splits user's string into an array
      substringArr.sort();                           //sort alphabetically
      let strConcat = ''                             //Concatenated string
      for(let i = 0; i < substringArr.length; i++) { //for each word, look up into hashtable
        if(this.hashQuery(substringArr[i]) != undefined) {    //if not undefined, concatenate
            strConcat = strConcat.concat(substringArr[i] + ' ');
      console.log('split: ' + strConcat);
        }      //  
      }
      strConcat = strConcat.trim();                         //trim ending space
      console.log(strConcat);
      return strConcat;
    },
    //Query through Hashtable
    hashQuery: function(keyword) {
        return this.hashtable.lookup(keyword);
    },
  },
    beforeMount: function() {
                    /* Hash Table */
        //return index based on array length (max). (string) is key
        let hash = (string, max) => {
            var hash = 0;
            for (var i = 0; i < string.length; i++) {
            hash += string.charCodeAt(i);
            }
            return hash % max;
        };

        //create hashtable
        let HashTable = function() {
        
            let storage = [];
            const storageLimit = 14;
            
            this.print = function() {
        }
            // add function. Based on linear probing I think
            this.add = function(key, value) {
            var index = hash(key, storageLimit);
            if (storage[index] === undefined) {
                storage[index] = [
                [key, value]
                ];
            } else {
                var inserted = false;
                for (var i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    storage[index][i][1] = value;
                    inserted = true;
                }
                }
                if (inserted === false) {
                storage[index].push([key, value]);
                }
            }
            };                
            
            this.remove = function(key) {
            var index = hash(key, storageLimit);
            if (storage[index].length === 1 && storage[index][0][0] === key) {
                delete storage[index];
            } else {
                for (var i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    delete storage[index][i];
                }
                }
            }
            };
        
            this.lookup = function(key) {
            var index = hash(key, storageLimit);
            if (storage[index] === undefined) {
                return undefined;
            } else {
                for (var i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    return storage[index][i][1];
                }
                }
            }
            };
        };
            
            let ht = new HashTable(); 
            //TODO: Add data here
            ht.add('agile', 'Agile is a lightwork framework for quick iterations of sub-project. A very popular modern software development methodology')
            ht.add('fallwater', 'Double waterfall :)');

            ht.add('Waterfall'.toLowerCase(),'Waterfall is a Software Development Life Cycle composed of phases that are based on each previous completed step.');
            ht.add('V-Shaped'.toLowerCase(),'V-shaped is a Software Development Life Cycle process where execuation is done in a "V" shape. In essence for every phase or step there is a directly associated testing phase.');
            ht.add('RAD'.toLowerCase(),'Rapid Application Development (RAD) has a quick turnaround time (~60 days) that heavily depends on code and screen generators, and other productivity tools. Users involved in all phases for feedback in planning and design.');
            ht.add('Scrum'.toLowerCase(),'Agile Scrum is a SDLC which accomplishes a develeopment project through breaking down tangable goals into "sprints" and daily 15 min meetings.');
            ht.add('Incremental'.toLowerCase(),'A SDLC system through repeated cycles (iterative) and in smaller portions at a time (incremental), allowing software developers to take advantage of what was learned during development of earlier parts or versions of the system');
            ht.add('Spiral'.toLowerCase(),'Spiral is a SDLC that adoptes different SDLC such as incremental, waterfall, or evolutionary prototyping.');
            ht.add('Extreme Programming'.toLowerCase(),'Extreme Programming is a Software Development Life Cycle that accomodates change as a natural process and emphasizes values and principles rather than process');
            ht.add('XP'.toLowerCase(),'XP (Extreme Programming) is a Software Development Life Cycle that accomodates change as a natural process and emphasizes values and principles rather than process');
            ht.add('Benefits Waterfall'.toLowerCase(),'The Waterfall SDLC is easy to plan since it has a linear-like development');
            ht.add('Drawbacks Waterfall'.toLowerCase(),'The Waterfall SDLC needs well understood and stable requirements upfront');
            ht.add('features Waterfall'.toLowerCase(),'Some features are linear development, easy to plan and staff, mistakes in previous phases are costly');
            ht.add('Benefits V-Shaped'.toLowerCase(),'The V-Shaped SDLC is good for systems requiring high reliability because of the emphasis on verification and validation');
            ht.add('Drawbacks V-Shaped'.toLowerCase(),'');
            ht.add('Features V-Shaped'.toLowerCase(),'');
            ht.add('Benefits RAD'.toLowerCase(),'The RAD SDLC has a quick turnaround time');
            ht.add('Drawbacks RAD'.toLowerCase(),'');
            ht.add('Features RAD'.toLowerCase(),'In the RAD SDLC, users are involved in all phases of development');
            ht.add('Benefits Scrum'.toLowerCase(),'The beauty with scrum is its flexibility with requirement changes, does not require PM, and minimal managements.');
            ht.add('Drawbacks Scrum'.toLowerCase(),'Some... troublesome.... issues are losing sight of scope creep,  difficult to schedule project completion, and difficult to integrate inexperience programmers. ');
            ht.add('Features Scrum'.toLowerCase(),'Some features are focusing a tangible goal, and sharing daily issues');
            ht.add('Benefits Incremental'.toLowerCase(),'Some cool benefits are creating working software early in development, easy to change requirements, and easier to test iterations');
            ht.add('Drawbacks Incremental'.toLowerCase(),'T+C45he Incremental SDLC does not allow iterations');
            ht.add('Features Incremental'.toLowerCase(),'Divide-and-conquer approach');
            ht.add('Benefits Spiral'.toLowerCase(),'Takes advantage of strengths from waterfall, prototyping, and incremental SDLCs');
            ht.add('Drawbacks Spiral'.toLowerCase(),'');
            ht.add('Features Spiral'.toLowerCase(),'Focuses on risk analysis and management. Best for project where requirements are too complex or evolving');
            ht.add('Benefits Extreme Programming '.toLowerCase(),'Extreme Programming embraces change and recognizes that all requirements will not be known at the beginning.');
            ht.add('Drawbacks Extreme Programming '.toLowerCase(),'');
            ht.add('Extreme Features Programming '.toLowerCase(),'Programming is done in pairs, work is completed at a pace that can be sustained indefinitely, test driven development which emphasizes customer involvement');
            ht.add('Benefits XP '.toLowerCase(),'Extreme Programming embraces change and recognizes that all requirements will not be known at the beginning.');
            ht.add('Drawbacks XP '.toLowerCase(),'');
            ht.add('Features XP'.toLowerCase(),'Programming is done in pairs, work is completed at a pace that can be sustained indefinitely, test driven development which emphasizes customer involvement');
            ht.add('SDLC'.toLowerCase(),'Software Development Life Cycle development (SDLC) is a process to divide software development work to improve desing, product management, and project management');
            // Conversational
            ht.add('Hi'.toLowerCase(),'Hi!');
            ht.add('Hey'.toLowerCase(),'Hey there!');
            ht.add('Hello'.toLowerCase(),'Hello m8, ask me some SDLC questions!');
            ht.add('Bye'.toLowerCase(),'Chao, till next time!');
            ht.add('thank you'.toLowerCase(),'No, thank you :-)');
            ht.add('thank'.toLowerCase(),'\"Thank you, Thank you, Thank you very much\" - me the chatbot');
            ht.add('thanks'.toLowerCase(),'No problem m8 <3');

            ht.add('are who you'.toLowerCase(),'I am the all knowing, almighty Prof. Apurva Narayan');
            ht.add('are how you'.toLowerCase(),'I am good....How are you?');
            ht.add('are','Are is for Arrrr. gimme that looty');
            ht.add('how','How did you even question that phrase? I don\'t get it');
            ht.add('you','Did you know, YOU are awesome :)');

            ht.add('Like'.toLowerCase(),'..beep-boop.., OH hello there, I like you :)');
            ht.add('Love'.toLowerCase(),'I love COSC 310 :)');
            ht.add(''.toLowerCase(),'');
            ht.add('orc'.toLowerCase(),'ME ORC. ME ANGRY. RRRRrrrr');
            ht.add('hehexd','hehe....xd ');

            //....add more hash elements\
            this.hashtable = ht;

        },
    }
</script>

<style scoped>
.chatbot {
    width: 45%;
    float: left;
    margin-right: 5%;
}
.user {
    width: 45%;
    float: right;
    margin-left: 5%;
}
ul {
  list-style: none;
}
</style>
