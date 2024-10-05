import express from "express"
import { bookTicketController, createTicketController, deleteTicketController, editTicketController, getAllTicketController, getTicketByIdController, userBookingController } from "../controller/ticketController.js"

const router = express.Router()

router.post('/', createTicketController)

router.get('/', getAllTicketController)
router.get('/:id', getTicketByIdController)
router.delete('/:id', deleteTicketController)
router.put('/:id', editTicketController)

// Book Tickets
router.get('/book/:userId', userBookingController)
router.post('/book/:id', bookTicketController)


export default router