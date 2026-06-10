import mongoose from 'mongoose'

const BusSchema = new mongoose.Schema({
    BusNumber:{
        type:String,
        required:true
    },
    FromLocation:{
        type:String,
        required:true
    },
    ToLocation:{
        type:String,
        required:true
    },
    Esp32id:{
        type:Number,
        required:true
    },
    No_of_seates:{
        type:Number,
        required:true
    },
    capacity:{
        type:Number,
        required:true
    }
},
{
    timestamps:true
}
);

const BusDetails = mongoose.model("BusDetails",BusSchema);
export default BusDetails 