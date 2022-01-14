const mongoose  = require('mongoose')
const config = require('./index')
mongoose.connect(config.URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  // we're connected!
  console.log('openOk')
});

