const client_query = require('../services/client_services');

exports.register = async (req,res) => {
    Client = req.body;
    try{
        const result = await client_query.register(Client);
        res.status(200).json({ message: result.message })
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}
exports.getAll = async (req,res) => {
    Client = req.body;
    try{
        const result = await client_query.getAllClients(Client);
        res.status(200).json({ message: result.message })
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}