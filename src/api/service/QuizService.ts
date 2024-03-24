import { MyDTO, multipleDTO } from "../../dto/childDto";
import { Judging } from "../../models/judging";
import { myQuestion } from "../../models/newQuiz";


export class myService{

  async CreateQuestion(data: MyDTO[]): Promise<any> {
    const newCreate = await myQuestion.bulkCreate(
      data.map((questionData: MyDTO) => ({
        category: questionData.category,
        question: questionData.question,
        a: questionData.a,
        b: questionData.b,
        c: questionData.c,
        d: questionData.d,
        correct: questionData.correct,
        judgings: questionData.judgings ? questionData.judgings.map((judging) => ({
          name: judging.name,
          a: judging.a,
          b: judging.b,
          c: judging.c,
          d: judging.d,
        })) : [],
      })),{include:[{model:Judging,as:'judgings'}]}
    );
  
    return newCreate;
  }
  
  

// Judging:questionData.judgings.map((judgingData:any)=>({
//   name:judgingData.name,
//   a:judgingData.a,
//   b:judgingData.b,
//   c:judgingData.c,
//   d:judgingData.d, 
//   queid:questionData   
// }))

// async CreateMultiple(data:multipleDTO[]):Promise<any>{

// console.log(data,'][][[[][][][');

//   const newCreate = await MultipleChoice.bulkCreate(data.map((questionData:multipleDTO)=>({
//     questionm:questionData.questionm,   
//     optionm:questionData.optionm,
//     correctm:questionData.correctm
//   })))
//   console.log(newCreate,'ppppppppp');
//   return newCreate
// }


async fetchData():Promise<any>{
const findData = await myQuestion.findAll()
const viewdata = await findData.map((data:any)=>{
return {
  QueNo:data.id,
  Questoion:data.question,
  a:data.a,
  b:data.b,
  c:data.c,
  d:data.d,
}
})

return viewdata
}


async getAnswer(data:any):Promise<any>{
let right = 0
let wrong = 0

for( const answer of data){
  const {QueNo,Ans} = data

  const dbQuestion = await myQuestion.findOne({
    where:{
      id:QueNo
    }
  })
if(dbQuestion && dbQuestion.correct === Ans) {
}}
}


async update ():Promise<any>{
  const updateData = await myQuestion.update({
    correct:'d'
  },{
    where:{
      id:8
    }
  })
  return updateData
}
}





