import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.ObjectId, 
        ref: 'users' 
    },
    ticket: { 
        type: mongoose.ObjectId, 
        ref: 'tickets' 
    }
}, { timestamps: true });

export default mongoose.model('booking', bookingSchema);
