const { default: mongoose } = require("mongoose")
const mongogose = require("mongoose")

const PropertySchema = new mongoose.Schema({
    currentOwner:{
        type: mongoose.Types.ObjectId,
        ref:"User",
        required : true
    },

    title:{
        type: String,
        required: true,
        min: 8,

    },

    type:{
        type: String,
        enum:["flat", "apartment", "house"],
        required: true
    },

    desc:{
        type:String,
        require: true,
        min: 20,

    },

    img:{

        type: String,
        require: true,

    },

    price:{
        type: Number,
        require:true
    },
    
    purpose:{

        type:String,
        require: true,
        min: 20,
    },

    phone:{
        type:Number,
        require:true
    },

    sqmeters:{
        type:Number,
        require:true
    },

    continent:{
        type: String,
        require: true
    },

    beds:{
        type: Number,
        require: true,
        min: 2
    },

    featured: {
        type: Boolean,
        default: true ,
    }
}, {timestamps: true})

module.exports = mongoose.model("Property", PropertySchema)