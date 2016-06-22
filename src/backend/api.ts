// Our API for demos only
import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/angulartest');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error..'));
db.once('open', function () {
  console.log('Connection to angulartest database opened');
});

var dataSchema = mongoose.Schema({
  name: String,
  sex: String,
  age: Number,
  country: String,
  dateCreated: Number
});

var userData = mongoose.model('Data', dataSchema);

// Our API for demos only
export function serverApi(req, res) {
  var data = new userData(req.body);

  data.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.send(req.body);
    }
  });
}
