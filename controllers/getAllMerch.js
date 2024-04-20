import  {Merch}  from '../models/merchModel.js';

const getAllMerch = async (req, res) => {
    try {
        const merch = await Merch.find();

        res.status(200).json({
            success: true,
            merch,
        });
        
    } catch (error) {
        console.error('Error creating merchandise:', error);
    res.status(500).json({ success: false, error: 'Failed to find merchanise merchandise' });
    }
}

export const getMerchbyId = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        const merch = await Merch.findById(id);

        res.status(200).json({
            success: true,
            merch,
        });
        
    } catch (error) {
        console.error('Error finding product by id:', error);
    res.status(500).json({ success: false, error: 'Failed to find product' });
    }
}

export default getAllMerch
