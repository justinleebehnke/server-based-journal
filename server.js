const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'))

let posts = [];
let id = 0;

app.get('/api/posts', (req, res) => {
  res.send(posts);
});

app.post('/api/posts', (req, res) => {
  id = id + 1;
  let post = {
          id:id,
          user:req.body.user,
          team:req.body.team,
          date:req.body.date,
          miles:req.body.miles,
          goal:req.body.goal,
          time:req.body.time,
          weather:req.body.weather,
          text:req.body.text
          };
  posts.push(post);
  res.send(post);
});

app.delete('/api/posts/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = posts.map(post => { return post.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  posts.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(4000, () => console.log('Server listening on port 4000!'))
