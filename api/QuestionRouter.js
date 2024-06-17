const express = require('express');
const router = express.Router();
const Question = require("./QuestionSchema");
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/question', async (req, res) => {
  try {
   
    const skip = parseInt(req.query.skip) || 0;
    
 
    const totalQuestions = await Question.countDocuments();

  
    const question = await Question.findOne().skip(skip);


    if (!question) {
      return res.status(404).json({ message: "Sual tapılmadı" });
    }

    res.json({ question, totalQuestions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

