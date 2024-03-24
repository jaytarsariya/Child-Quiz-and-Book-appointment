import { Option } from "../../models/Options";
import { ResultDTO, testdto } from "../../../src/dto/childDto";
import { Question } from "../../models/Question";
import { Answer } from "../../models/Answer";
import { Sequelize,Op} from 'sequelize';
import { Score } from "../../models/Score";
import { Incorrect } from "../../models/Incorrect";

export class UserService {
async CreateQue(dtos:testdto[]):Promise<any>{
  const createQuestion: Question[] = [];

  await Question.sequelize?.transaction(async(t)=>{
    for (const questionData  of dtos){
    const question = await Question.create({
      category:questionData.category,
      question:questionData.question,
      option:questionData.option,
    },{transaction:t})    

    const option = await Option.bulkCreate(questionData.option.map((options)=>({
      queId:question.id,
      option:options.option
    })),{transaction:t})
    await Answer.create(
      {
        questionId:question.id,
        optionId:option[questionData.correctOptionIndex].id
      },
      {transaction:t}
    );
      createQuestion.push(question)
    }
  })  
return createQuestion
}


  

async viewData(id:number):Promise<any>{
  const quizQuestion = await Question.findAll({
  
    include:[
      {model:Option}
    ],  
  })    
    return quizQuestion   
  }

  async GetResult(data:ResultDTO):Promise<any>{      
     const {questionId,SelectedOptionId}  = data
     const CorrectAnswer = await Answer.findOne({
      where:{questionId:questionId}
     })
     if(!CorrectAnswer){
       return null
     }

     const scorecheck = await Score.findOne({where:{score:CorrectAnswer.questionId}})
     if(scorecheck){ return 'Already Answered...!'}
     const incorrectcheck = await Incorrect.findOne({where:{isIncorrect:CorrectAnswer.questionId}})
     if(incorrectcheck){ return  ' Already Answered ...! '}

  

     const isCorrect = SelectedOptionId === CorrectAnswer.optionId
console.log(CorrectAnswer.questionId,'[[[[[[[[[[[000000000000000');

     if(isCorrect){
      const checkScore = await Score.findOne({where:{score:CorrectAnswer.questionId}})
      if(checkScore){
        return 'Already Answered this question !...'
      }
     await Score.create({score:CorrectAnswer.questionId})
      const nextQuestion = await Question.findOne({
        where:{ 
          id:{
            [Op.gt]:questionId
          }},
          include:[
            {model:Option}
          ],
          order:[['id', 'ASC']]
      })
      console.log(nextQuestion,'[][][[][][][][][');
      
     return nextQuestion
     }
     // incorrect checking

     const checkexisting = await Incorrect.findOne({where:{isIncorrect:CorrectAnswer.questionId}})
     if(checkexisting){
      return 'Already Answered ! pls try next question !'
     }
     
      await Incorrect.create({
        isIncorrect:CorrectAnswer.questionId
      })

      // last total count fetched......
  
   const questioncount = await Question.count()
   const score = await Score.count()
   const Incorrectcount = await Incorrect.count()

   const countedData = score + Incorrectcount
   if(countedData === questioncount){
    const totalScore = score
    const Outof = questioncount
    await Score.destroy({
      truncate:true
    })
    await Incorrect.destroy({
      truncate:true
    })
    return {
     TotalScore: totalScore,
     Outof:Outof
    }    
    
  }
  return null
  }






}
