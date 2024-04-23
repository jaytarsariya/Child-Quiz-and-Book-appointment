import express from 'express';
import {
  CreateQuestion,
  CreateQuiz,
  FetchData,
  GetResult,
  ShowQuiz,
  getanswers,
  loadQuestions,
  submitQuiz,
} from '../controller/QuizController';


export const Testrouter = express.Router();

Testrouter.post('/create', CreateQuiz);

Testrouter.get('/view/:id', ShowQuiz);

Testrouter.post('/giveanswer', GetResult);

// Testrouter.get('/viewque/:category',viewQuestion)

// Testrouter.get('/checkanswer/:id',checkAnswer)

Testrouter.post('/mycreate', CreateQuestion);

// Testrouter.post('/mycreatemultiple',multipleChoiceCreate)

Testrouter.get('/myview', FetchData);

Testrouter.get('/findall', loadQuestions);

Testrouter.post('/submitquiz', submitQuiz);

Testrouter.post('/justcheck', getanswers);

// Testrouter.post('/justcheckmultiple',multiplechoice)
