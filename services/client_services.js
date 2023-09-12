const clients_query = require('../repo/clients_query');

exports.register =  async (Client) => {
    try{
        const result= await clients_query.registerClient(Client);
        return{ message: result.message }
    } catch (error) {
        throw(error);
    }
}
exports.getAllClients =  async () => {
    try{
        const result= await clients_query.getAllClients();
        return{ message:  result.results }
    } catch (error) {
        throw(error);
    }
}

// 
// Handle fetching a  client by Mail
exports.getClientByEmail = async (req, res) => {
    const email = req.body.findEmail;
    try {
        console.log(email+'in try')
        const  client = await clients_query.getClientByEmail(email);
        if (! client) {
            return res.status(404).json({ error: "Client not found" });            
        }else{ res.status(200).json( client); }
        
        
    } catch (error) {
        console.error("Error getting  client by ID:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return error;
    }
};

// Handle fetching a client by ID
exports.getClientById = async (clientId) => {

    try {
        // console.log('req id', clientId)
        const client = await clients_query.getClientById(clientId);
        if (!client) {
            return { error: "Client not found" };
        }
        
            // console.log(error,"fdooo",client.clientId);
            return client;
        
    } catch (error) {
        throw error;
    }
    
    // voidVal = false;    
};

exports.getByName = async(keyword) => {
        try{
        const clients = await clients_query.getClientByName(keyword);

        if(clients.length===0){
            // console.log(error);
            return{error: "clients not found"}
        }else{
        return clients;}
    }catch(error){console.log(error);
        throw(error)}
}



// Handle updating a Client by ID
exports.editClient = async (clientId,Client) => {
    console.log(clientId,"ASsss",Client)
    const profilePic =  img.uploadImage; 
    if(profilePic){
        try{Client.pro_pic = 'profilePic';}catch(error){console.log(error)}
    }

    try {
        console.log(clientId,"hhhhhhhhhhhh",Client)
        const result = await clients_query.updateClientById(clientId,Client);
        let updatedClient = await clients_query.getClientById(clientId);
        return{ message: result.message,updatedClient };
    } catch (error) {
        throw { error: "Internal Server Error" }
    }

};
// Handle updating ProfilePic by Client ID
exports.editProfilePic = async (clientId,imageFile) => {
        const profilePic =  imageFile; 
        // console.log(profilePic.secure_url, "}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}>>>>>>>>>>>")
        if(profilePic){
            // try{Client.pro_pic = 'profilePic';}catch(error){console.log(error)}
            try {
            const result = await clients_query.updateClientPicById(clientId,profilePic.secure_url);
            let updatedClient = await clients_query.getClientById(clientId);
            return{ message: result.message,updatedClient };
        } catch (error) {
            throw { error: "Internal Server Error" }
        }
        }else{
            return{ message :"Profile image not valid"}
        }

        
    
};

//  delete  client by ID
exports.deleteClient = async (clientId) => {
    
    const existingRecord = await exports.getClientById(clientId); 

    if (existingRecord.clientId === null){
        console.log("clientId = not found"); 
        return { error: "Client not found" };
    }else if (clientId == parseInt(existingRecord.clientId)){
        console.log("clientId is defoned",clientId)
        try {
            const result = await clients_query.deleteClient(clientId);
            return{ message: result.message };
        } catch (error) {            
        throw error;
        };
    }

};