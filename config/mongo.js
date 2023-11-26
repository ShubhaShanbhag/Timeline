const mongoose = require ('mongoose');

mongoose.connect('mongodb+srv://shubhashanbhag32:shubhashanbhag32@cluster0.suxpr26.mongodb.net/')

.then(()=> console.log("db is connected"))
.catch(err => console.log(err));

module.exports = mongoose;