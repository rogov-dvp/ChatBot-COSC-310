<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div id="app">
          
        <div class="mb-12">
        <h1 class="display-2 text-left" >ChatBot</h1>        
        </div>
        <div style="text-align:left;">
            <v-text-field
            label="Chat"
            placeholder="Say something SDLC related"
            regular
            v-model="message"
            width="10%"
          ></v-text-field>
            <v-btn v-on:click="inputMessage" >Send</v-btn>
        </div>
        
        <div>
        <div id="chat-bot-response" class="chatbot">
            <h2>Chatbot</h2>
            <ul>

            </ul>
        </div>
            
        <div id="user-response" class="user">
            <h2>User</h2>
            <ul>

            </ul>
        </div>
        </div>
            
        </div>
      
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',
    el: '#app',
    data() {
      return {
        message: '',
        hashtable: '',
      } 
    },
    methods: {
        
        inputMessage: function() {
            if(this.message != '') {
                //Add user input
                this.createNewElement('user-response', this.message);                
                
                //TODO: add code for spliting words. Currently, it takes one key word
                let keyword = this.hashQuery(this.message);
                this.createNewElement('chat-bot-response', keyword);                
                this.message = '';
            }
        },
        //Create a new element into DOM
        createNewElement: function(tagID, text) {
                let newLi = document.createElement('li');
                newLi.textContent = text;
                let dest = document.getElementById(tagID).getElementsByTagName('ul')[0];
                dest.appendChild(newLi);
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
                ht.add('waterfall', 'Waterfall is a type of SDLC....');
                ht.add('vertical', 'Vertical SDLC is when....');
                ht.add('agile', 'Agile is a framework for quick iterations of ...')
                ht.add('fallwater', 'Double waterfall :)');
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
