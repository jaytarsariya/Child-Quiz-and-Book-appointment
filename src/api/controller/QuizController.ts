import { Request,Response } from "express";
import  { UserService } from "../../../justChek/api/service/testService";
import { MyDTO, ResultDTO, multipleDTO, testdto } from "../../dto/childDto";
import { myService } from "../service/QuizService";
import { myQuestion } from "../../models/newQuiz";
import { ARRAY } from "sequelize";
import { IsArray } from "sequelize-typescript";
import { Judging } from "../../models/judging";
// import { MultipleChoice } from "../../models/multipleChoice";
// import { createRequire } from "module";

const userservice = new UserService()
const myservice = new myService()

export const CreateQuiz = async(req:Request, res:Response):Promise<any>=>{
  try {
    const detail:testdto[] = req.body
    const data = await userservice.CreateQue(detail)
    res.json({ success:true,data})
  } catch (error) {
    console.log(error,'createquiz error...');
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}

// export const multipleChoiceCreate = async(req:Request,res:Response):Promise<any>=>{
//   const data:multipleDTO[] = req.body
//   const newcreate = await myservice.CreateMultiple(data)
//   return res.status(201).json({success:true,data:newcreate})
// }


// show question with option
export const ShowQuiz = async(req:Request,res:Response):Promise<any>=>{
  try {
    // const category = (req.query.category as string)
    // const selectedCategory = req.params.category;
    let id = parseInt(req.params.id)
  
    const data = await userservice.viewData(id)
    res.status(201).json({Quiz:data})
    
  } catch (error) {
    console.log(error,'show quiz error');
    
  }
}

export const GetResult = async(req:Request,res:Response):Promise<any>=>{
  try {
    const data:ResultDTO = req.body
    const check = await userservice.GetResult(data)
    if(check === null){
    return res.status(404).json({error:'Incorrect answer !'})
    }
    return res.status(200).json({check})
  } catch (error) {
    console.log(error,'get result error...');
    
  }
}

// export const CreateQuestion = async(req:Request,res:Response):Promise<any>=>{
// const data = await userservice.CreateQuestion()
// res.status(200).json({data})
// }

// export const viewQuestion = async(req:Request,res:Response):Promise<any>=>{
//   const category = req.params.params
//   const data = await userservice.viewQuestion(category)
//   res.status(200).json({data})
//   }

//   export const checkAnswer = async(req:Request,res:Response):Promise<any>=>{
//     // try {
//     //   const id = parseInt(req.params.id)
//     //   const answer = (req.query.answer as string)
//     //   const data = await userservice.checkAnswer(id,answer)
//     //   if(data === null){
//     //     return res.send('Question not found')
//     //   }
//     //   if(data === undefined){
//     //    return res.send('Incorrect answer')
//     //   }
//     //    res.status(201).json({message:'Correct answer',Score:data})
//     // } catch (error) {
//     //   console.log(error,'check answer error...');
//     //   return res.status(500).json({error:error})
//     // }
//   }




export const CreateQuestion = async(req:Request,res:Response):Promise<any>=>{
  try {
  const dto:MyDTO[] = req.body

const data = await myservice.CreateQuestion(dto)
return res.status(202).json({data})
} catch (error) {
  console.log(error,'createQuestion error...in ');
  return res.status(500).json({error:'Internal server error ..'})  
}
   
}

export const FetchData = async(req:Request,res:Response):Promise<any>=>{
  try {
    const data = await myservice.fetchData()
    return res.status(200).json({data})
  } catch (error) {
    console.log(error,'fetch data error...');
    res.status(500).json({error:'Internal server error ..'})
  }
}



// let index = 0;
// let total = 0;
// let right = 0;
// let wrong = 0;
// let questions: any[] = [];

// export const getAnswer = async(req:Request,res:Response):Promise<any>=>{
//   try {
//     console.log('hello bhailog');
    
//   questions = await myQuestion.findAll()
//   total = questions.length  
//   LoadQuestion(res)

//   } catch (error) {
//     console.error('Error loading questions:', error);
//     res.status(500).json({ error: 'Internal Server Error' });  
//   }
// }


// export const submitQuiz = async (req: Request, res: Response) => {
//   try {
//     const data = questions[index];
//     console.log(data,'][][][][][[] data ][][][][][');
    
//     const ans = req.body.ans;
//  console.log(ans,'ooooooooooooooooo ans');
 
//     if (ans === data.correct) {
//       right++;
//     } else {
//       wrong++;
//     }

//     index++;
//     LoadQuestion(res);
//   } catch (error) {
//     console.error('Error submitting quiz:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };




// const LoadQuestion = (res:Response)=>{
//   console.log('hello from loadquestion...');
  
// if(index === total){
//   return endQuiz(res)
// } 
// reset()
// let data = questions[index]
// const question = `${index +1}) ${data.question}`
// const options = [{
//   a:data.a,
//   b:data.b,
//   c:data.c,
//   d:data.d
// }]
// res.send({
//   question,options
// })   
// }

// const reset = () => {
//   index = 0;
//   right = 0;
//   wrong = 0;
// };

// const endQuiz = (res:Response) => {
//   res.send({
//   massage:'Thanq for playing quiz',
//   score:`${right} / ${total} are correct`
//   })
// }




// quizController.ts
// import { Request, Response } from 'express';
// import { myQuestion } from './path-to-your-myQuestion-model';

let index = 0;
let total = 0;
let right = 0;
let wrong = 0;
let questions: any[] = [];

export const loadQuestions = async (req: Request, res: Response) => {
  try {
    // Fetch questions from the database
    const questionscheck = await myQuestion.findAll();
    total = questions.length;
    const data = questionscheck[index];
    console.log(data,'][][][[[] data [][][][][');

    loadQuestion(res);
  } catch (error) {
    console.error('Error loading questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const data = questions[index];
    const ans = req.body.answer;
  console.log(data,'[][][][][][][][][] data [][][][][]');
  
    if (ans === data.correct) {
      right++;
    } else {
      wrong++;
    }

    index++;
    loadQuestion(res);
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loadQuestion = (res: Response) => {
  if (index === total) {
    return endQuiz(res);
  }
  reset();
  const data = questions[index];
  res.json({
    question: `${index + 1}) ${data.question}`,
    options: [data.a, data.b, data.c, data.d],
  });
};

const reset = () => {
  index = 0;
  right = 0;
  wrong = 0;
};

const endQuiz = (res: Response) => {
  res.json({
    message: 'Thank you for playing the quiz',
    score: `${right} / ${total} are correct`,
  });
};



//  _____________________________  QUIZ LOGIC HERE    _____________________________

export const getanswers = async (req:Request,res:Response)=>{
 const total = await myQuestion.count()
const answersArray = req.body
let judgingscount = 0
const answerLength = answersArray.length

if(!answersArray){
return res.status(200).json({error:'data not found'})
}

let result:any = { correct: 0, wrong: 0,notattemp:0};

for (const answerObj of answersArray) {
  const { question, ans } = answerObj;

  
if (question >= 1 && question <= total){  
  const dbQuestion = await myQuestion.findOne({
  where: {
    id: question
  }
});

if(Array.isArray(ans)){
const ansslength = ans.length
const judglength = Judging.count()
for(const subAnswer of ans){
const { que, ans: subAnswerValue } = subAnswer;

  await Judging.update(
    { uresponse:subAnswerValue },
    { where:{ id:que }}
  );
  
}
var findBlankcount = await Judging.count({
  where:{
    uresponse:""
  }
})
var anslength = ans.length
let judginglength = await Judging.count()
if(findBlankcount >= 1){
result.notattemp++
}else if(anslength !== judginglength){
  result.notattemp++
}else{
  result.correct++
}
//  ______________________________________________________________________________   
}else{

if(dbQuestion){
  if(ans === ""){
    result.notattemp++
  }else if(ans === dbQuestion?.correct){
    result.correct++
  }else{
    result.wrong++
  }
}
}
}

}
// result.wrong = result.wrong -= judgingscount
// console.log(judgingscount,'][][][[][][][][][][][][');;
result.correct = result.correct += judgingscount

let resultMessage = 'Fail'
const percentageCorrect = (result.correct / total) * 100
if (percentageCorrect >= 80) {
  resultMessage = 'First Class';
} else if (percentageCorrect >= 60) {
  resultMessage = 'Second Class';
} else if (percentageCorrect >= 40) {
  resultMessage = 'Pass';
}

const totalattempt = total-answerLength
if(totalattempt !== 0){
  result.notattemp += totalattempt
}




res.send({ Result: result, Percentage: `${percentageCorrect.toFixed(2)}% Out of ${100}%`, ResultMessage: resultMessage});

}














// export const multiplechoice = async (req:Request,res:Response)=>{
//   const total = await MultipleChoice.count()
//   console.log(total,'1');
  
//  const answersArray = req.body
//  const answerLength = answersArray.length
 
 
 
//  if(!answersArray){
//  return res.status(200).json({error:'data not found'})
//  }
 
 
//  let result:any = { correct: 0,notattemp:0};
 
//  // let notattemp = 0
 
//  for (const answerObj of answersArray) {
//    const { questionm, answer } = answerObj;
 
//  console.log(questionm >= 1 && questionm <= total,'hello hello hello hello hello');
 
//  if (questionm >= 1 && questionm <= total){  
//    const dbQuestion = await MultipleChoice.findOne({
//    where: {
//      id: questionm
//    }
//  });
//  if(dbQuestion){
//     MultipleChoice.update({
//       uresponse:answer
//   },{
//     where:{
//       id:dbQuestion.id
//     }
//   })
//  }
 
//  if(dbQuestion){
//  if (answer === "") {
//    result.notattemp++;
//  } else if (answer) {
//      result.correct++;      
//   }   
//  }
//  }else {
//    // Ignore extra answers beyond the total number of questions
//    return res.status(200).json({error:`Ignoring answer for question ${questionm}`})
//    // console.log(`Ignoring answer for question ${q`uestion}`);
//  } 
 
//  }
//  let resultMessage = 'Fail'
//  const percentageCorrect = (result.correct / total) * 100
//  if (percentageCorrect >= 80) {
//    resultMessage = 'First Class';
//  } else if (percentageCorrect >= 60) {
//    resultMessage = 'Second Class';
//  } else if (percentageCorrect >= 40) {
//    resultMessage = 'Pass';
//  }
 
//  const totalattempt = total-answerLength
//  console.log(totalattempt,'][][][[][][][][][][][][');
//  if(totalattempt !== 0){
//    result.notattemp += totalattempt
//  }
 

// //  if(percentageCorrect < 100){
  
// //  }
//  // result.wrong = result.wrong - result.notattemp
 
 
//  return res.send({ Result: result, Percentage: `${percentageCorrect.toFixed(0)}% Complate`, Message: `Thanq for playing quiz`});
 
//  }

 




export const update = async (req:Request,res:Response)=>{
 await myservice.update() 
}