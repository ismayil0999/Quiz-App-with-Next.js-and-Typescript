const express = require('express');
const cors=require("cors")
const mongoose = require('mongoose');


const app = express();
app.use(cors())

app.use(express.json());


mongoose.connect('mongodb+srv://gulmaliyevismayil11:gulmaliyevismayil11@classified.lfhzaj0.mongodb.net/Questions?retryWrites=true&w=majority&appName=Classified', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB bağlantısı uğurlu');
}).catch(err => console.error('MongoDB bağlantı uğursuz:', err));

const questionRoute=require("./QuestionRouter")
app.use('/', questionRoute); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server başladı: http://localhost:${PORT}`);
});
