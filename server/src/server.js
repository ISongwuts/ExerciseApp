const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const postRouter = require('./routes/post/postRouter');
const userRouter = require('./routes/user/userRouter');
const categoryRouter = require('./routes/category/categoryRouter');
const uploadRouter = require('./routes/upload/uploadRouter');

const app = express();
const PORT = '3001';
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static(__dirname));
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/src/style/index.css");
  });

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname+'/src/index.html'));
});

app.use(postRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(uploadRouter);

app.listen(PORT, () => console.log("Server is running on port: " + PORT));

module.exports = app;