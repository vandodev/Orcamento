const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const orcamentoSchema = new Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  phone:{
    type:String
  },
  watsApp:{
    type:String
  },
  msg:{
    type:String
  },
},{
 timestamp:true
});

mongoose.model('Orcamento', orcamentoSchema);