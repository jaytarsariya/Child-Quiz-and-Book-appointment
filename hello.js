 // const dob = '2002-05-30'

// const { buffer } = require("stream/consumers");

// const currentdate = new Date()
// const newdate = new Date(dob)

// console.log(currentdate-newdate);

// const agemillisecond = currentdate - newdate
// const age = Math.floor(agemillisecond / (365.25 * 24 * 60 * 60 * 1000))
// // const age = currentdate-dob
// console.log(age);
// // console.log(Date.now());

// const fruits = ["apple", "orange", "cherry"];
//  fruits.forEach(myname);

//  function myname(item){
//   console.log(item,'][][][');
//  }

//  myname()


// const data = [{
//   name:'hello',
//   lastname:'hello iam jay'
// }]
// data.map(getname)

// console.log(getname);

// function getname(item){

// }


// const a = [1,2,3,4,5]
// const jay = a.map(hello)
// console.log(jay);

// function hello(x){
//   return x*2
// }

// const OTP = Math.floor(100000 + Math.random() * 900000).toString() 
// console.log(OTP,'[[[[[[[[[[[[');


// const date = new Date().getTime()
// const dob = new Date('2002-05-30').getTime()
// console.log(date-dob);

// console.log(Buffer.from('hello i am jay '));

// const arr = ["hello", "one", "two"]

// const newarr = arr.map((apnaWalaArray)=>{
//   return apnaWalaArray
// })
// console.log(newarr,'popopopo');
// const testdto = [{
//   question:'what is of capital of india ?',
//   category:'language',
//   option:option.map((newoption)=>({newoption.option:''}))[{
//     option:'chennai',option:'new delhi',option:'mumbai'
//   }]
// }]

// const array = testdto.map((item)=>{

//   // console.log(item);
//   return item
// })

// console.log(array);


//                     a R R a y

// at
// const arr1 = [5,12,8,130,44]
// console.log(arr1.at(2));


// concat
// const array1 = [1,2,3,4,5]
// const array2 = [6,7,8,9,10]

// const array3 = array1.concat(array2)

// console.log(array3);


// filter
// const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];
// const result = words.filter((words)=>words.length > 5);
// console.log(result);


// function printMatrixWithWord(word) {
//   const rows = 1; // Adjust as needed
//   const columns = word.length * 2; // Each character takes two spaces

//   for (let i = 0; i < rows; i++) {
//     let row = '';
//     for (let j = 0; j < columns; j++) {
//       const charIndex = Math.floor(j / 2);
//       const currentChar = word[charIndex] || ' '; // Use space if the word is shorter

//       // Use a space or the character based on the current position
//       row += j % 2 === 0 ? currentChar : ' ';
//     }
//     console.log(row);
//   }
// }

// // Example: Print the word "LOGICTRIX" in a matrix
// printMatrixWithWord('LOGICTRIX');


// const arr = ["hello","i am ","jay"]

// console.log(arr.indexOf("jay"));

// const database = 1
// database ++ 

// console.log(database);









// const express = require('express');
// const app = express();
// const PORT = 3000;

// app.use(express.json());

// // Sample questions
// const questions = [
//   {
//     question: "What is the capital of France?",
//     options: ["Berlin", "Madrid", "Paris", "Rome"],
//     correctAnswer: "Paris"
//   },
//   {
//     question: "Which planet is known as the Red Planet?",
//     options: ["Mars", "Venus", "Jupiter", "Saturn"],
//     correctAnswer: "Mars"
//   }
// ];

// app.get('/questions', (req, res) => {
//   res.json(questions);
// });

// app.post('/submit', (req, res) => {
//   const userAnswers = req.body.answers;
//   const score = calculateScore(userAnswers);
//   res.json({ score });
// });

// function calculateScore(userAnswers) {
//   let score = 0;
//   questions.forEach((question, index) => {
//     if (question.correctAnswer === userAnswers[index]) {
//       score++;
//     }
//   });
//   return score;
// }

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// let arr = [
//   {
//     Que:'hello',
//     Correct:"a"
//   },
//   {
//     Que:'second',
//     Correct:"c"
//   },
//   {
//     Que:'third',
//     Correct:"c"
//   },
//   {
//     Que:'fourth',
//     Correct:"d"
//   }
// ]

// // for(let i=0; i<arr.length; i++){
// //   console.log(i,'for loop logged');
// // }

// arr.forEach(element => {
//   console.log(element,'foreach loop logged...');
  
// });
// console.log(arr,']o]o]o]o]o]o]o]o]o');

// console.log(6 <=5); -->


// <!-- <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Rating Quiz App</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       text-align: center;
//       margin: 20px;
//     }
//     table {
//       width: 100%;
//       border-collapse: collapse;
//       margin-bottom: 20px;
//     }
//     th, td {
//       border: 1px solid #ddd;
//       padding: 10px;
//       text-align: center;
//     }
//     label {
//       display: block;
//     }
//     button {
//       padding: 10px;
//       margin: 5px;
//     }
//   </style>
// </head>
// <body>

// <h1>Rating Quiz App</h1>

// <table>
//   <thead>
//     <tr>
//       <th></th>
//       <th>Good</th>
//       <th>Excellence</th>
//       <th>Average</th>
//       <th>Low</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr id="jay">
//       <td>Jay</td>
//       <td>
//         <label>
//           <input type="radio" name="jay" value="good" onclick="rateQuiz('jay', 'good')"> Good
//         </label>
//       </td>
//       <td>
//         <label>
//           <input type="radio" name="jay" value="excellence" onclick="rateQuiz('jay', 'excellence')"> Excellence
//         </label>
//       </td>
//       <td>
//         <label>
//           <input type="radio" name="jay" value="average" onclick="rateQuiz('jay', 'average')"> Average
//         </label>
//       </td>
//       <td>
//         <label>
//           <input type="radio" name="jay" value="low" onclick="rateQuiz('jay', 'low')"> Low
//         </label>
//       </td>
//     </tr>
//     <!-- Repeat the same structure for other rows (Neel, Akash, Saurav, Parth) -->
//   </tbody>
// </table>

// <button onclick="getQuizData()">Get Quiz Data</button>

// <script>
//   function rateQuiz(row, column) {
//     const rating = document.querySelector(`input[name=${row}]:checked`);
    
//     if (rating) {
//       sendRating(row, column, rating.value);
//       console.log(rating,'hello ,,,,,,,,,,,');
//     } else {
//       alert('Please select a rating.');
//     }
//   }

//   function sendRating(row, column, rating) {
//     fetch('http://localhost:3000/rateQuiz', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ row, column, rating }),
//     })
//     .then(response => response.json())
//     .then(data => alert(data.message))
//     .catch(error => console.error('Error:', error));
//   }

//   function getQuizData() {
//     fetch('http://localhost:3000/getQuizData')
//     .then(response => response.json())
//     .then(data => {
//       console.log(data.quizData);
//       // You can update the UI to display the quiz data as needed
//     })
//     .catch(error => console.error('Error:', error));
//   }
// </script>

// </body>
// </html> -->





// const myset = new Set([1,2,3,4,5])
// myset.clear()
// console.log(myset);


// let arr = [1,2,-1,3,0,4,5,44]
// let hello = arr.sort()
// console.log()
          
// Get the current date and time
// var currentDate = new Date();

// // Get the user-entered time (assuming the user enters time in HH:mm format)
// var userEnteredTime = "16:00:00";
// var userTimeArray = userEnteredTime.split(':');
// var userDate = new Date();
// userDate.setHours(userTimeArray[0], userTimeArray[1], 0, 0);

// // Compare the current time with the user-entered time
// if (currentDate.getTime() > userDate.getTime()) {
//     console.log('The entered time has already passed.');
// } else {
//     console.log('The entered time is in the future.');
// }

// const n = new Date("18:00:00")
// console.log(n);


// const currentdate = new Date()
// const mydatetime =  new Date("2024-02-07T08:00:00Z")

// if(currentdate.getTime() > mydatetime.getTime()){
//     console.log('The entered time has already passed.');
// }else{
//     console.log('The entered time is in the future....');
// }

// day logic
// const currentdate = new Date()
// var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// const day = currentdate.getDay()

// const view = daysOfWeek[day]
// console.log(view);

// const randomstring = require('randomstring');

// const data = ra.generate()
// console.log(data);
// console.log(2<=2);

// const arr = [1,2,3,4,5,6,7,8,9,10]

// arr.forEach(element => {
//   console.log(element,'fore');
// })
// var endtime = 17
// var starttime = new Date()
// console.log(starttime,'][][[][][][[][][][][][',endtime);
// for(let i=starttime; i <= endtime; i++){
//   console.log(i,'[][][');
// }


// Convert startTime and endTime strings to Date objects
// const startDateTime = new Date(`2024-01-01 ${staff.startTime}`);
// const endDateTime = new Date(`2024-01-01 ${staff.endTime}`);

// // Initialize loop variable with startDateTime
// let currentTime = startDateTime;

// // Loop until currentTime reaches endDateTime
// while (currentTime < endDateTime) {
//     // Format currentTime as needed
//     const formattedTime = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

//     // Increment currentTime by 1 hour
//     currentTime.setHours(currentTime.getHours() + 1);

//     // Now, formattedTime represents the current hour, you can use it as needed in your logic
//     console.log(formattedTime);
// }

// const endtime = 12
// const starttime = endtime - 1
// console.log(starttime + ":00:00",'To',endtime + ":00:00");;


// const mydate = new Date("2024-02-16")
// console.log(mydate);



// const express = require('express');
// const fetch = require('node-fetch');
// const app = express();

// // In-memory cache
// const cache = {};

// app.get('/data', async (req, res) => {
//     const key = 'cachedData';
//     if (cache[key]) {
//         console.log('Using cached data...');
//         res.json(cache[key]);
//     } else {
//         console.log('Fetching data from API...');
//         try {
//             const response = await fetch('https://api.example.com/data');
//             const data = await response.json();
//             cache[key] = data;
//             res.json(data);
//         } catch (error) {
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     }
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });



// import express from 'express'
// const app = express()
// // import compression from 'compression'
// const port  = 3000

// // app.use(compression())
// app.get('/data',(req,res)=>{
//   const payload = 'Fater app is working test AND check'
//   res.send(payload.repeat(10000))
// })
// // const os = require('os')
// // const cluster = require('cluster')

// // if(cluster.isMaster){
// //   let cpuLength = os.cpus().length;
// //   console.log('Master process is running ', process.pid);
// //   for(let i = 0; i < cpuLength; i++){
// //    cluster.fork();
// //   }

// //   cluster.on('exit',()=>{
// //     console.log(' on worker is working exit side');
// //     cluster.fork()
// //   })

// // }
// // console.log(os.freemem());

// app.listen(port,()=>{
//   console.log(`server runing on port no ${port}`);
  
// })


import nodeCache from 'node-cache'
const myCache = new nodeCache()

myCache.set("hello","I am jay tarsariya") // add a value 

const value = myCache.get("hello") // get data, fetch data

console.log(value);



// tsconfig.json file

// {
//  "compilerOptions": {
//   "target": "es5",
//   " experimentalDecorators": true, 
//   "emitDecoratorMetadata": true,
// "module": "CommonJS",
//  "moduleResolution": "node",
//  "resolveJsonModule": true,
//    "declaration": true,
// "sourceMap": true,
//  "outDir": "./dist",
//  "esModuleInterop": true,
//  "forceConsistentCasingInFileNames": true,
// "strict": true,
// "noImplicitAny": false,
//    "strictPropertyInitialization": false,
//   "useUnknownInCatchVariables": false,
//  "skipLibCheck": true 
// },
//   "include": ["src/**/*.ts"],
//   "exclude": ["node_modules", "**/*.spec.ts"]
// }



// console.log(2+5+'8')
// console.log('8'+2+5);

// console.log('hello'+ ' i am jay');


// Generate a random number between 1 and 6





// function generateRandomNumber() {
//   return Math.ceil(Math.random() * 6);
// }


// console.log(generateRandomNumber());
