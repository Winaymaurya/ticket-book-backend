import bookingModel from "../model/bookingModel.js";
import ticketModel from "../model/ticketModel.js"

export const createTicketController = async (req, res) => {

    try {
        const { name, date, location, price, description } = req.body;
        if (!name || !date || !location || !price) {
            return res.status(200).send({
                success: false,
                message: "Fill All the details"
            })
        }
        const ticket = await ticketModel(req.body).save()
        res.status(201).send({
            success: true,
            message: "Ticket Created",
            ticket
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const getAllTicketController = async (req, res) => {
    try {
        const tickets = await ticketModel.find()
        res.status(200).send({
            success: true,
            message: "All Tickets are fetched",
            tickets
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
export const deleteTicketController=async(req,res)=>{
    try {
        const {id}=req.params
        await ticketModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:"Ticket Deleted "
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}
export const getTicketByIdController=async(req,res)=>{
    try {
        const ticket = await ticketModel.findById(req.params.id)
        if(!ticket){
            res.status(200).send({
                success:false,
                message:"Not found"
            })
        }
        res.status(200).send({
            success:true,
            message:"Ticket Fetched",
            ticket
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
        
    }
}

export const editTicketController=async(req,res)=>{
   try {
    const ticket=await ticketModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

    if(!ticket){
        res.status(300).send({
            success:false,
            message:"Not found"
        })
    }
    res.status(200).send({
       success:true,
       message:"Ticket Updated",
       ticket
    })
   } catch (error) {
    res.status(500).send({
        success: false,
        message: "Something went wrong",
        error
    })
   }
}
export const bookTicketController = async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const ticket = await ticketModel.findById(id);
        console.log(ticket)
        if (!ticket) {
            return res.status(200).send({
                success: false,
                message: "Ticket not found"
            })
        }
        const alreadyBooking = await bookingModel.findOne({ ticket: id, user: req.body.userId })
        if (alreadyBooking) {
            return res.status(200).send({
                success: false,
                message: "Ticket is already booked by you"
            })
        }
        const payload = { ticket: id, user: req.body.userId }

        const booking = await bookingModel(payload).save()
        if (booking) {
            return res.status(200).send({
                success: true,
                message: "Ticket Booked"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

export const userBookingController = async (req, res) => {
    try {
        const { userId } = req.params

        const booking = await bookingModel.find({ user: userId }).populate('ticket').select("ticket")
        return res.status(200).send({
            success: true,
            message: "Ticket booked by you",
            data: booking
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}