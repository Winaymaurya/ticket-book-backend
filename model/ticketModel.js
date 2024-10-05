import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    location: { 
        type: String, 
        required: true 
    },
    price: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('tickets', ticketSchema);
