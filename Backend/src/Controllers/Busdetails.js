import BusDetails from "../models/BusSchema.js";
import BusTimeSeries from "../models/BusTimeSeries.js";
import BusLocation from "../models/BusLocation.js";

export async function getbyFromTo(req,res){
    try{
        const { from, to } = req.params; 
        const details = await BusDetails.find({
            FromLocation: from,
            ToLocation: to,
        });

        if (details.length == 0) {
            return res.status(404).json({ message: "No bus found" });
        }
        res.json({
            buses: details.map((bus)=>({
                BusNumber:bus.BusNumber,
                FromLocation: bus.FromLocation,
                ToLocation: bus.ToLocation,
                Esp32id: bus.Esp32id,
                No_of_seates: bus.No_of_seates
            }))
        })
    }
    catch(e){
        console.log('Error while getting data',e);
        res.status(500).json({message:'Error while Fetching!'})
    }
}

export async function postdata(req,res){
    try{
        const {BusNumber,FromLocation,ToLocation,Esp32id,No_of_seates,capacity} = req.body;
        const newbus = new BusDetails({BusNumber,FromLocation,ToLocation,Esp32id,No_of_seates,capacity});
        await newbus.save();
        res.status(200).json("Details created sucussfully");
    }
    catch(e){
        console.log('Error while creating the details',e);
        res.status(500).json({message:'Internal server error'})
    }
}


//This is the ESP32 API Key 
export async function getdetails(req,res){
    try{
        const {busnumber} = req.params;
        const bus = await BusDetails.findOne({BusNumber:busnumber});
        if (!bus) return res.status(404).json({ message: "Bus not found" });
        const latestcount = await BusTimeSeries.findOne({
            "meta.Esp32id": bus.Esp32id
        }).sort({time:-1});
        res.json(
            {
                BusNumber: bus.BusNumber,
                FromLocation: bus.FromLocation,
                ToLocation: bus.ToLocation,
                Esp32id: bus.Esp32id,
                personCount: latestcount ? latestcount.personCount : 0,
                No_of_seates:bus.No_of_seates,
                capacity:bus.capacity
            }
        );
    }catch(e){
        res.status(500).json({message:"Error while fetching the data in busdetails with person count"});
        console.log("Error while fetching the data in busdetails with person count");
    }
}

export async function postesp32(req,res){
    try{
        const {Esp32id,personCount} = req.body;

        if(!Esp32id || personCount==undefined){
            return res.status(400).json("Esp32 and personcount required");
        }

        const bus = await BusDetails.findOne({Esp32id});
        if(!bus){
            return res.status(400).json("No bus found on this Esp32 id");
        }

        const update = await BusTimeSeries.findOneAndUpdate(
            {"meta.Esp32id" : Esp32id},
            {
                $set: {
                    "meta.BusNumber": bus.BusNumber,
                    "meta.Esp32id": Esp32id,
                    personCount:personCount,
                    time: new Date(),
                    },
            },
            { upsert: true, new: true }
        );
        res.status(200).json({message: "Data is saved in the database",data:update});
        console.log("Received from ESP32:", Esp32id, "Count:", personCount);
    }
    catch(e){
        console.log("Error While getting data from esp32",e);
        res.status(500).json({message:'Error Getting data from esp32'});
    }
}

// POST — ESP32 sends GPS coords
export async function post_loca(req, res) {
    try {
        const { Esp32id, latitude, longitude, speed } = req.body;

        if (!Esp32id || latitude == undefined || longitude == undefined) {
            return res.status(400).json({ message: 'Esp32id, latitude and longitude are required' });
        }

        const bus = await BusDetails.findOne({ Esp32id });
        if (!bus) return res.status(404).json({ message: 'No bus found for this Esp32id' });

        const location = await BusLocation.findOneAndUpdate(
            { Esp32id },
            {
                $set: {
                    BusNumber: bus.BusNumber,
                    Esp32id,
                    latitude,
                    longitude,
                    speed: speed || 0,
                    updatedAt: new Date()
                }
            },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: 'Location updated', data: location });
        console.log(`GPS — Bus: ${bus.BusNumber} | Lat: ${latitude} | Lon: ${longitude} | Speed: ${speed || 0} km/h`);
    } catch (e) {
        console.log('Error saving bus location', e);
        res.status(500).json({ message: 'Error saving location' });
    }
}

// GET — frontend fetches live location by bus number
export async function get_loca(req, res) {
    try {
        const { busnumber } = req.params;
        const location = await BusLocation.findOne({ BusNumber: busnumber });
        if (!location) return res.status(404).json({ message: 'No location data found for this bus' });
        res.json(location);
    } catch (e) {
        console.log('Error fetching bus location', e);
        res.status(500).json({ message: 'Error fetching location' });
    }
}










