const mongoose = require ("mongoose")

const patschema = new mongoose.Schema({
    patientname:{
        type:String
    },
    age:{
        type:Number
    },
    problems:{
        type:String
    },
    issues:{
        type:String
    },
    problemsfacing:{
        type:String
    },
})

const Pat= mongoose.model('Pat',patschema)
module.exports= Pat;