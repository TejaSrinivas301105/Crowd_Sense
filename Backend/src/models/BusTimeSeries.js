import mongoose from "mongoose";

const BusTimeSchema = new mongoose.Schema({
    time:{
        type:Date,
        required:true,
        default:Date.now
    },
    meta:{
        BusNumber: { type: String, required: true },
        Esp32id: { type: Number, required: true }
    },
    personCount: { type: Number, required: true }

},{ versionKey: false })

const BusTimeSeries = mongoose.model("BusTimeSeries",BusTimeSchema);
export default BusTimeSeries;