import { Request, Response } from 'express';
import { UserService } from '../../../justChek/api/service/testService';
import { MyDTO, ResultDTO, multipleDTO, testdto } from '../../dto/childDto';
import { myService } from '../service/QuizService';
import { myQuestion } from '../../models/newQuiz';
import { Judging } from '../../models/judging';

const userservice = new UserService();
const myservice = new myService();

export const CreateQuiz = async (req: Request, res: Response): Promise<any> => {
  try {
    const detail: testdto[] = req.body;
    const data = await userservice.CreateQue(detail);
    res.json({ success: true, data });
  } catch (error) {
    console.log(error, 'createquiz error...');
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// show question with option
export const ShowQuiz = async (req: Request, res: Response): Promise<any> => {
  try {
    let id = parseInt(req.params.id);

    const data = await userservice.viewData(id);
    res.status(201).json({ Quiz: data });
  } catch (error) {
    console.log(error, 'show quiz error');
  }
};

export const GetResult = async (req: Request, res: Response): Promise<any> => {
  try {
    const data: ResultDTO = req.body;
    const check = await userservice.GetResult(data);
    if (check === null) {
      return res.status(404).json({ error: 'Incorrect answer !' });
    }
    return res.status(200).json({ check });
  } catch (error) {
    console.log(error, 'get result error...');
  }
};

export const CreateQuestion = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const dto: MyDTO[] = req.body;

    const data = await myservice.CreateQuestion(dto);
    return res.status(202).json({ data });
  } catch (error) {
    console.log(error, 'createQuestion error...in ');
    return res.status(500).json({ error: 'Internal server error ..' });
  }
};

export const FetchData = async (req: Request, res: Response): Promise<any> => {
  try {
    const data = await myservice.fetchData();
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error, 'fetch data error...');
    res.status(500).json({ error: 'Internal server error ..' });
  }
};

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

export const getanswers = async (req: Request, res: Response) => {
  const total = await myQuestion.count();
  const answersArray = req.body;
  let judgingscount = 0;
  const answerLength = answersArray.length;

  if (!answersArray) {
    return res.status(200).json({ error: 'data not found' });
  }

  let result: any = { correct: 0, wrong: 0, notattemp: 0 };

  for (const answerObj of answersArray) {
    const { question, ans } = answerObj;

    if (question >= 1 && question <= total) {
      const dbQuestion = await myQuestion.findOne({
        where: {
          id: question,
        },
      });

      if (Array.isArray(ans)) {
        const ansslength = ans.length;
        const judglength = Judging.count();
        for (const subAnswer of ans) {
          const { que, ans: subAnswerValue } = subAnswer;

          await Judging.update(
            { uresponse: subAnswerValue },
            { where: { id: que } }
          );
        }
        var findBlankcount = await Judging.count({
          where: {
            uresponse: '',
          },
        });
        var anslength = ans.length;
        let judginglength = await Judging.count();
        if (findBlankcount >= 1) {
          result.notattemp++;
        } else if (anslength !== judginglength) {
          result.notattemp++;
        } else {
          result.correct++;
        }
        //  ______________________________________________________________________________
      } else {
        if (dbQuestion) {
          if (ans === '') {
            result.notattemp++;
          } else if (ans === dbQuestion?.correct) {
            result.correct++;
          } else {
            result.wrong++;
          }
        }
      }
    }
  }

  result.correct = result.correct += judgingscount;

  let resultMessage = 'Fail';
  const percentageCorrect = (result.correct / total) * 100;
  if (percentageCorrect >= 80) {
    resultMessage = 'First Class';
  } else if (percentageCorrect >= 60) {
    resultMessage = 'Second Class';
  } else if (percentageCorrect >= 40) {
    resultMessage = 'Pass';
  }

  const totalattempt = total - answerLength;
  if (totalattempt !== 0) {
    result.notattemp += totalattempt;
  }
  res.send({
    Result: result,
    Percentage: `${percentageCorrect.toFixed(2)}% Out of ${100}%`,
    ResultMessage: resultMessage,
  });
};
