const { error } = require('console');
const Client = require('../services/client_services');
const cloudinary = require('cloudinary')
require('../lib/cloudinary')

// console.log("llllllll")
// require('../lib/cloudinary')

// exports.register = async (req,res) => {
//     Client = req.body;
//     try{
//         const result = await Client.register(Client);
//         res.status(200).json({ message: result.message })
//     } catch (error) {
//         res.status(500).json({error:"Internal Server Error"})
//     }
// }

// Handele register clients
exports.register = async function (req, res, next) {
    
    // console.log(req.file.path)
  
    try {
      const imgUpload = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "client_docs" }
      );
      console.log(imgUpload.secure_url);
  
      const newClient = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        client_email: req.body.client_email, 
        phone_no: req.body.phone_no, 
        project_id: req.body.project_id, 
        client_Desc: req.body.client_Desc, 
        // pro_pic: imgUpload.secure_url
      });
      console.log(newClient,"my new client")
  


      Client.createClient(newClient)
      .then(data => {
        return res.status(200).json({ success: "Success",  message:data.message});
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({success: "not success",message:err.message});
      });


    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: "not success",error   });
    }
  };

//  Handle get list of clients 
exports.getAll = async (req,res) => {
    try{
        const result = await Client.getAllClients();
        res.status(200).json({ message: result.message,result:result.results })
    } catch (error) {
        res.status(500).json({error:"Internal Server Error"})
    }
}

// Handle fetching a patient by ID
exports.getClientById = async (req, res) => {
    const client_id = req.params.client_id;

    try {
        // console.log('req id',userId)
        const patient = await Client.getClientById(client_id);
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
//         const patients = await Client.getByName(keyword);
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
    
    let client_id = req.params.client_id;
    // let Client1 = req.body;

    let updateClientData = req;
    console.log(updateClientData)
    const existingRecord = await Client.getClientById(client_id); 
    // let Client = Client1;
    console.log(existingRecord.client_id,">>>>>>>>>>>>>>>>>>>>>>DDDDDDDDDDDDDDDD",parseInt(existingRecord.client_id))

    if(parseInt(client_id)===parseInt(existingRecord.client_id)){
        try {
            const result = await Client.editClient(client_id,updateClientData);
            let updatedClient = await Client.getClientById(client_id);
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
    let client_id = req.params.client_id;
    
    const existingRecord = await Client.getClientById(client_id); 

    if (client_id === null){
        console.log("client_id = Undefoned"); 
        return res.status(404).json({ error: "User not found" });
    }else if (client_id == parseInt(existingRecord.client_id)){
        console.log("client_id is defoned",client_id)
        try {
            const result = await Client.deleteClient(client_id);
            res.status(200).json({ message: result.message });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        };
    }
    return client_id;
};

