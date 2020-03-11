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
  export default {
    name: 'Chatbot',
    data() {
      return {
        message: '',
        hashtableSDLC: '',
        hashtableConv: '',     
        defaultArray: [],     //array to store default sentences
      } 
    },
    methods: {
        
    inputMessage: function() {
        if(this.message != '') {
            let chatBotResponse = '';
            //Add user input
            this.createNewElement('responses','right', this.message);
            
            //Processing user's message --> chatbot response
            chatBotResponse = this.process();

            //scroll to bottom if needed
            this.scrollToBottom(); 
             
            //Create new chatbot response
            this.createNewElement('responses','left', chatBotResponse);
            this.message = '';
        }
    },
    //Create a new element into DOM
    createNewElement: function(tagID,align, msg) {
            let newLi = document.createElement('li');
            newLi.textContent = msg;
            newLi.className = 'subtitle-1 font-weight-medium ma-2'
            newLi.style.textAlign = align;
            let dest = document.getElementById(tagID).getElementsByTagName('ul')[0];
            dest.appendChild(newLi);
    },
    scrollToBottom: function() {
      let chatbox = document.getElementById('chatbox');
      chatbox.scrollTop = chatbox.scrollHeight;
    },
    process: function() {
      let keywords = this.sentenceProcess(this.message);
      return this.hashQuery(keywords); 
    },

    sentenceProcess: function(msg) {
      let substringArr = msg.toLowerCase().split(/\W+/);             //splits user's string into an array
      substringArr.sort();                                           //sort alphabetically
      let strConcat = ' ';                                           //Concatenated string SDLC
      let strConcatConv = ' ';

      for(let i = 0; i < substringArr.length; i++) { //for each word, look up into hashtableSDLCSDLC
        if(this.hashtableSDLC.lookup(substringArr[i]) !== undefined) {    //if not undefined, concatenate
            console.log(substringArr[i]);
            strConcat = strConcat.concat(substringArr[i] + ' ');
            console.log('lookup: ' + this.hashtableSDLC.lookup(substringArr[i]));
        }      
      }
        for(let i = 0; i < substringArr.length; i++) { //for each word, look up into hashtableConv
          if(this.hashtableConv.lookup(substringArr[i]) !== undefined) {    //if not undefined, concatenate
            console.log(substringArr[i]);
            strConcatConv = strConcatConv.concat(substringArr[i] + ' ');
            console.log('lookup: ' + this.hashtableConv.lookup(substringArr[i]));
        }      
      }

      strConcatConv = strConcatConv.trim();
      strConcat = strConcat.trim();                         //trim ending space

      if(strConcat != '')
        return strConcat;
      else 
        return strConcatConv;
      
    },
    //Query through hashtableSDLC
    hashQuery: function(keyword) {
            console.log('query')
      if(this.hashtableSDLC.lookup(keyword) != undefined)
        return this.hashtableSDLC.lookup(keyword);       // SDLC sentences

      else if (this.hashtableConv.lookup(keyword) != undefined)
        return this.hashtableConv.lookup(keyword);       // conversational sentences

      else 
        return this.defaultArray[Math.floor(Math.random() * this.defaultArray.length)]; // default sentences
      console.log('done')
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
            
            let ht = new HashTable(); //SDLC hashtable instance
            let ht2 = new HashTable();  //conversation hashtable instance
            //SDLC Hashtable:
            ht.add('fallwater'.toLowerCase(), 'Double waterfall :)');
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
            ht.add('benefits extreme programming'.toLowerCase(),'Extreme Programming embraces change and recognizes that all requirements will not be known at the beginning.');
            ht.add('drawbacks extreme programming'.toLowerCase(),'');
            ht.add('Extreme Features Programming'.toLowerCase(),'Programming is done in pairs, work is completed at a pace that can be sustained indefinitely, test driven development which emphasizes customer involvement');
            ht.add('Benefits XP'.toLowerCase(),'Extreme Programming embraces change and recognizes that all requirements will not be known at the beginning.');
            ht.add('Drawbacks XP'.toLowerCase(),'');
            ht.add('extreme'.toLowerCase(),'');
            ht.add('programming'.toLowerCase(),'Use code to make life forms like me or being able to show funny cat videos');
            ht.add('Features XP'.toLowerCase(),'Programming is done in pairs, work is completed at a pace that can be sustained indefinitely, test driven development which emphasizes customer involvement');
            ht.add('SDLC'.toLowerCase(),'Software Development Life Cycle development (SDLC) is a process to divide software development work to improve desing, product management, and project management');
            ht.add('V'.toLowerCase(),'');
            ht.add('Shaped'.toLowerCase(),'');
            ht.add('planning', 'Planning is a crucial part of any sucessful software development project. Detailed planning and scheduling can greatly increase the chances of project completion! ');
            ht.add('specifications', 'Defining and understanding all the requirements/specifications at the beginning of a project can be crucial to some SDLCs. However, regardless of the chosen SDLC for the software project, having a good idea of the basic requirements before beginning a project is always beneficial.')
            ht.add('gathering requirements', 'Gathering all the requirements/specifications at the beginning of a project can be crucial to some SDLCs. However, regardless of the chosen SDLC for the software project, having a good idea of the basic requirements before beginning a project is always beneficial.')
            ht.add('maintenance', 'A phase included in all software development life cycles, maintenance involves ensuring the system/product continues to function as expected throgoughout it\'s lifetime.')
            ht.add('design','Design in graphics refers to the planning and layout of elements in an image, illustration, or video with the aid of specialized software');
            ht.add('designing','Design in graphics refers to the planning and layout of elements in an image, illustration, or video with the aid of specialized software');
            ht.add('implementation','In computer science, an implementation is a realization of a technical specification or algorithm as a program, software component, or other computer system through computer programming and deployment');
            ht.add('coding','Coding is the process of using a programming language to get a computer to behave how you want it to');
            ht.add('testing','Software testing is an investigation conducted to provide stakeholders with information about the quality of the software product or service under test.');
            ht.add('deployment','Software deployment is all of the activities that make a software system available for use.');
            ht.add('maintenance','maintenance in software engineering is the modification of a software product after delivery to correct faults, to improve performance or other attributes');
            ht.add('sdlc','Software Development Life Cycle (SDLC) is a process used by the software industry to design, develop and test high quality softwares. The SDLC aims to produce a high-quality software that meets or exceeds customer expectations, reaches completion within times and cost estimates.');
            ht.add('cycle development life software','Software Development Life Cycle (SDLC) is a process used by the software industry to design, develop and test high quality softwares. The SDLC aims to produce a high-quality software that meets or exceeds customer expectations, reaches completion within times and cost estimates.');
            ht.add('phases sdlc','Phase 1: Requirement Collection and analysis \n Phase 2: Feasibilty Study \n Phase 3: Design \n Phase 4: Coding \n Phase 5: Testing \n Phase 6: Installation / Deployment \n Phase 7: Maintenance');
            ht.add('phases','Program lifecycle phases are the stages a computer program undergoes, from initial creation to deployment and execution.');
            ht.add('agile principles', 'There are 12 Agile Principles. Some of the key principles include early and continuous delivery of software, welcome changing requirements, and simplicity.')
            ht.add('agile scrum', 'Scrum, an SDLC under the umbrella of Agile Development, is an SDLC which accomplishes a develeopment project through breaking down tangable goals into sprints and daily 15 minute meetings.')
            ht.add('scrum', 'Scrum, an SDLC under the umbrella of Agile Development, is an SDLC which accomplishes a develeopment project through breaking down tangable goals into sprints and daily 15 minute meetings.')
            ht.add('agile', 'Agile software devlopment is a group of software development methods based on iterative and incremental develpment where requirements and solutions evolve through collaboration between self-organizing, crossfunctional teams.')
            ht.add('backlog sprint', 'Sprint backlogs, an artifact of the Scrum SDLC, represent a list of requirements to be completed. They are a list of all deired work on a project and are reprrioritized at the start of each sprint. Individuals sign up for work of their own choosing.')
            ht.add('review sprint', 'The team presents what is accomplished during the sprint at the sprint review. This typically takes the form of a demo of new features.')
            ht.add('chatbot', 'This chatbot, ApurvaBot, was made to give students like you information about SDLCs! That is my mission!')
            ht.add('apurva', 'Apurva Narayan is the fantastic professor of COSC 310 ;)')

            ht.add('benefits'.toLowerCase(),'sorry, benifits of what?');
            ht.add('drawbacks'.toLowerCase(),'sorry, drawbacks of what?');
            
            // Conversational
            ht2.add('Hi'.toLowerCase(),'Hi!');
            ht2.add('Hey'.toLowerCase(),'Hey there!');
            ht2.add('Hello'.toLowerCase(),'Hello, ask me some SDLC questions!');
            ht2.add('Bye'.toLowerCase(),'Chao, till next time');
            ht2.add('Goodbye'.toLowerCase(),'Goodbye');
            ht2.add('thank you'.toLowerCase(),'No problem');
            ht2.add('thank'.toLowerCase(),'\"Thank you, Thank you, Thank you very much\" - me the chatbot');
            ht2.add('thanks'.toLowerCase(),'No problem m8 <3');
            ht2.add('colour','My favourite colour is purple, what\'s yours?');
            ht2.add('color','My favourite colour is purple, what\'s yours?');
            ht2.add('language','ApurvaBot can only speak English :( Maybe in the future I\'ll learn some more.');
            ht2.add('joke','What do pirates say when they\re cold? Shover me timbers!');
            ht2.add('animal','My favourite animal is a panda! :)');
            ht2.add('Bleh','Javascript is not smart enough to understand you intellectual language ;)');
            ht2.add('idiot','That\'s Rude');
            ht2.add('sup','I am practicing my tongue twisters');
            ht2.add('love','I have never been in love');
            ht2.add('sex','I think I am gonna save myself for marriage');
            ht2.add('Single','I am as single as the only dollar in your account!');
            ht2.add('are who you'.toLowerCase(),'I am the all knowing, almighty Prof. Apurva Narayan');
            ht2.add('are how you'.toLowerCase(),'I am good....How are you?');
            ht2.add('are','ARrrr-don\'t understand');
            ht2.add('how','How did you even question that phrase? I don\'t get it');
            ht2.add('you','Did you know, YOU are awesome :)');

            ht2.add('Like'.toLowerCase(),'..beep-boop.., you make me tinker my heart :)');
            ht2.add('Love'.toLowerCase(),'I love COSC 310 :)');
            ht2.add('orc'.toLowerCase(),'ME ORC. ME ANGRY. RRRRrrrr');
            ht2.add('hehexd','hehe....xd ');
            
            //Explicit/repeat case
            // ht.add('repeat','Are you a bot too? *Beep-Boop*');    
            // ht2.add('repeat','Are you a bot too? *Beep-Boop*');

            //....add more hash elements\
            this.hashtableSDLC = ht;
            this.hashtableConv = ht2;

            //Defaults
            this.defaultArray.push('Huh ok, SDLC related topic only please');
            this.defaultArray.push('Very interesting...');
            this.defaultArray.push('Can I get uhhh....');
            this.defaultArray.push('Sorry, I didn\'t understand what you mean :/');
            this.defaultArray.push('Oof, help a bot out eh? Could you rephrase that?');
            this.defaultArray.push('Sorry, JavaScript is my main language, repeat that please');
            this.defaultArray.push('*beep-boop*...zz..error..did not understand human..*beep-boop*');
            this.defaultArray.push('Didn\'t catch that, please rephrase');
            this.defaultArray.push('I had a bad bit ;) rephrase please');
            //TODO: More default sentences  
}
    }
</script>

<style scoped>
ul {
  list-style: none;
}
</style>
