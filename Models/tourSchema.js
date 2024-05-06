const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tourSchema = new schema({

    name:{
        type:String,
        require:true,
        unique:true
    },

    price:{
        type:String,
        require:true,
        unique:true
    },

    rating:{
        type:String,
        require:true,
        unique:true
    }
},
{timestamps:true}
);

