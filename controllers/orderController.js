import {Order} from "../models/orderModel.js"


//Create Order
export const createOrder = async (req, res) => {
    const { orderData } = req.body;
    try {
        
        console.log(req.body)

        const order = await Order.create({
            cart:req.body.cart.data,
            user:req.body.user,
            price:req.body.price,
            paymentInfo:req.body.paymentInfo,
            khaltiPIDX:req.body.paymentData
        })
        // await Order.save(); 
        res.status(201).json({
            success:true,
            message:"Order Placed", orderData
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: error.message,
            success: false,
        });
    }
}

