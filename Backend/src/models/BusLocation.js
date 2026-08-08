import mongoose from 'mongoose';

const BusLocationSchema = new mongoose.Schema({
    BusNumber: { type: String, required: true },
    Esp32id:   { type: Number, required: true },
    latitude:  { type: Number, required: true },
    longitude: { type: Number, required: true },
    speed:     { type: Number, default: 0 },
    updatedAt: { type: Date,   default: Date.now }
}, { versionKey: false });

const BusLocation = mongoose.model('BusLocation', BusLocationSchema);
export default BusLocation;
