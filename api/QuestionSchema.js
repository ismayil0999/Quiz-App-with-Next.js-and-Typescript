const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
  options:{
    type:Array,
  },
  answer:{
    type:String
  }

});


const Question = mongoose.models.Question || mongoose.model('Question', questionSchema);

module.exports = Question;
