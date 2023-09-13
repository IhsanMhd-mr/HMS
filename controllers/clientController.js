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
    try{
        const result = await client_query.getAllClients();
        res.status(200).json({ message: result.message })
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

// Handle fetching a patient by ID
exports.getClientById = async (req, res) => {
    const clientId = req.params.clientId;

    try {
        // console.log('req id',userId)
        const patient = await client_query.getClientById(clientId);
        if (!patient) {
            return res.status(404).json({ error: "User not found" });
        }else
        {res.status(200).json(patient);}
       
    } catch (error) {
        console.error("Error getting user by ID:", error);
        res.status(500).json({ error: "Internal Server Error in fetching" });
    }
    
};

// exports.getClientByName = async (req,res) => {
//     const keyword = req.body.keyword;
//     try{
//         const patients = await client_query.getByName(keyword);
//         if(!patients){
//             return res.status(404).json({ error: "patients not found "});
//         }else{res.status(200).json(patients);}

//     }catch(error){
//         console.error("Error getting user by ID:", error);
//         res.status(500).json({ error: "Internal Server Error in fetching" });
//     }
// };




// Handle updating a Client by ID
exports.editClient = async (req, res) => {
    
    let clientId = req.params.clientId;
    // let Client1 = req.body;

    let {patient1Id, ...Client1} = req.body;
    const existingRecord = await client_query.getClientById(clientId); 
    let Client = Client1;
    // console.log(existingRecord.clientId,">>>>>>>>>>>>>>>>>>>>>>DDDDDDDDDDDDDDDD")

    if(parseInt(clientId)===parseInt(existingRecord.clientId)){
        try {
            const result = await client_query.updateClient(clientId,Client);
            let updatedClient = await client_query.getClientById(clientId);
            res.status(200).json({ message: result.message,updatedClient });
        } catch (error) {
            console.error("Error updating user:");
            res.status(500).json({ error: "Internal Server Error" });
        }
    }else{
        return res.status(404).json({ error: "Client not found" });
    }
};

//  delete user by ID
exports.deleteClient = async (req, res) => {
    let clientId = req.params.clientId;
    
    const existingRecord = await client_query.getClientById(clientId); 

    if (clientId === null){
        console.log("clientId = Undefoned"); 
        return res.status(404).json({ error: "User not found" });
    }else if (clientId == parseInt(existingRecord.clientId)){
        console.log("clientId is defoned",clientId)
        try {
            const result = await client_query.deleteClient(clientId);
            res.status(200).json({ message: result.message });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        };
    }
    return clientId;
};

