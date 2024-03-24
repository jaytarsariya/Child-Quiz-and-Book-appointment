import express from 'express'
const app = express()
import dotenv from 'dotenv'
import { sequelize } from './src/db/dbconnection'
import { router } from './src/api/router/ChildRouter'
import { Testrouter } from './src/api/router/QuizRouter'
dotenv.config()
import { staffrouter } from './src/api/router/StaffRouter'
const port = process.env.PORT || 5000


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use('/api',router)
app.use('/test',Testrouter)
app.use('/staff',staffrouter)


try {
  sequelize.sync({force:false})
  console.log('Db connected ...');  
} catch (error) {
 console.log(error,'db connection error');  
}
 app.listen(port,()=>{
  console.log(`Server running on port no ${port}...`);  
})


export default app











/*


Certainly! Here are four quizzes focusing on language, cognitive skills, movement, and emotional well-being, each with five questions and suggested answers:

Language Quiz:
Question 1:

Question: What is the antonym of "brave"?
a. Timid
b. Fearless
c. Confident
d. Daring
Answer: a. Timid
Question 2:

Question: Identify the correct spelling of the word that means "a sudden and intense feeling of fear."
a. Phobia
b. Fobia
c. Phobiaa
d. Phobeea
Answer: a. Phobia
Question 3:

Question: What is the past tense of the verb "sing"?
a. Sang
b. Sung
c. Singed
d. Sanged
Answer: a. Sang
Question 4:

Question: Choose the correct sentence:
a. She don't like pizza.
b. He doesn't likes ice cream.
c. They doesn't have a car.
d. We don't have any plans.
Answer: d. We don't have any plans.
Question 5:

Question: What is the capital of Japan?
a. Seoul
b. Beijing
c. Tokyo
d. Bangkok
Answer: c. Tokyo
Cognitive Skills Quiz:
Question 1:

Question: What comes next in the sequence: 2, 4, 6, 8, __?
a. 10
b. 12
c. 14
d. 16
Answer: a. 10
Question 2:

Question: If a shirt costs $20 and is on sale for 25% off, what is the discounted price?
a. $15
b. $18
c. $22
d. $25
Answer: b. $18
Question 3:

Question: Solve the equation: 3x + 5 = 20
a. x = 5
b. x = 6
c. x = 7
d. x = 8
Answer: c. x = 7
Question 4:

Question: Which of the following is a prime number?
a. 12
b. 17
c. 22
d. 27
Answer: b. 17
Question 5:

Question: What is the capital of Canada?
a. Ottawa
b. Toronto
c. Vancouver
d. Montreal
Answer: a. Ottawa
Movement Quiz:
Question 1:

Question: Name three different types of dance styles.
Answer: (Answers may include: Ballet, Hip-hop, Salsa)
Question 2:

Question: How many bones are there in the human body?
Answer: 206
Question 3:

Question: What is the purpose of stretching before exercise?
Answer: To improve flexibility, reduce the risk of injury, and enhance performance.
Question 4:

Question: Can you name a sport that involves a racket?
Answer: Tennis
Question 5:

Question: What is the primary function of the cerebellum in the brain?
Answer: It is responsible for coordinating voluntary movements and maintaining balance.
Emotional Well-being Quiz:
Question 1:

Question: How do you typically cope with stress? Choose one: (a) Talking to someone, (b) Taking a walk, (c) Listening to music, (d) Other (Specify)
Answer: (Answers may vary)
Question 2:

Question: On a scale of 1 to 10, how would you rate your current level of happiness?
Answer: (Answers may vary)
Question 3:

Question: Name one activity or hobby that brings you joy and relaxation.
Answer: (Answers may vary)
Question 4:

Question: How do you express your emotions when you're feeling overwhelmed or upset?
Answer: (Answers may vary)
Question 5:

Question: In challenging situations, do you tend to seek support from others (a) or prefer to deal with it independently (b)?
Answer: (a) or (b)

*/