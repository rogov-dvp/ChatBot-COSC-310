
# ChatBot-COSC-310
Chatbot that discusses topics on Software Development Life Cycles.

## About the Chatbot
This chatbot is developed in JavaScript!!

### Why JavaScript 
Due to the small enough scale of the project, writing it in JavaScript provides us to 
establish a website to host our chatbot. 

This chatbot is able to answer questions that are based on the Software Development Life Cycle.




### Input Examples:
Here are a few examples:

```
What is agile?
```
```
What are some incremental drawbacks?
```
```
Are there any benefits to Extreme Programming?
```

## The Code
### Frontend

The website is single page application developed in Vue.js with a Vuetify UI Framework component. This makes it easy to create 
aesthetically designed UI with modern looks. Not to mention, it gives experience with JavaScript frameworks


### Backend 

#### Search Methods
At the very core, we implmeneted a HashTable in JavaScript (thanks to freeCodeCamp) that allows us to put and get data at O(1) time. 

#### Word Search
In regards to word search, we decided that we would have a bank of key words that would dictate the response of the chatbot based on
matching key words. 

We take the user input, splice the words, and check if each word exists in the HashTable. If more than one matched key word exists, concatenate the words in alphabetica order. Once all words are check, take the concatenated string and search it up in the HashTable. One issue with this is that there would be lots of data (in this case, responses) is required. Addtionally, we will have multiple default sentences to use and may try to guide the user into asking something the chatbot has answers. Finally, we will have responses that are a bit more humane such as reponses in greetings, jokes, and farewells.

#### Functions:

Here, we will be describing the process from when the user input their message to the user reeciving a response from chatbot. Once the user types something in the search bar and presses the send button, the first function is called. Here 

#### Hosting:



