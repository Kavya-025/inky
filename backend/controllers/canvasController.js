const userModel = require('../models/userModel');
const Canvas = require('../models/CanvasModel'); 

const getAllCanvases = async (req,res) => {
    const email= req.email;

    try{
        const canvases = await Canvas.getAllCanvases(email);
        res.status(200).json(canvases);
    }catch(error){
        res.status(400).json({message: error.message })
    }
};  

const createCanvas = async (req, res) => {
    try {
        const { name } = req.body;
        const canvas = await Canvas.createCanvas(req.email, name);
        res.status(201).json(canvas);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// const deleteCanvas = async (req, res) => {
//     try {
//         const { email, canvasId } = req.body;
//         const canvas = await Canvas.deleteCanvas(email, canvasId);
//         res.status(200).json({
//             message: "Canvas deleted successfully",
//             canvas
//         });
//     } catch (error) {
//         res.status(400).json({
//             message: error.message
//         });
//     }
// };


const loadCanvas = async (req,res) => {
    const email =  req.email;
    const id = req.params.id;
    try{
        const canvas = await Canvas.loadCanvas(email,id);
        res.status(200).json(canvas);
    } catch (error){
        res.status(400).json({message: error.message})
    }
};

const updateCanvas = async (req, res) => {
    try {
        const email = req.email;
        const { id } = req.params;
        const { elements } = req.body;
        const canvas = await Canvas.updateCanvas(email, id, elements);
        res.status(200).json(canvas);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


const shareCanvas = async (req, res) => {
    const email = req.email;
    const id = req.params.id;
    const { shared_with } = req.body;

    try {
        const canvas = await Canvas.shareCanvas(email, id, shared_with);

        res.status(200).json(canvas);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllCanvases,
    createCanvas,
    loadCanvas,
    updateCanvas,
    shareCanvas,
    // deleteCanvas,
}