const Client = require('../services/client_services');
const cloudinary = require('cloudinary')
console.log("llllllll")
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
exports.register = async function (req, res, next) {
    
    console.log(req.file.path)
  
    try {
      const imgUpload = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "client_docs" }
      );
      console.log(imgUpload.secure_url);
  
      const newClient = new Client({
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email, 
        phone_no: req.body.phone_no, 
        project_id: req.body.project_id, 
        desc: req.body.desc, 
        pro_pic: req.body.pro_pic
      });
  


      Client.createClient(newClient)
      .then(data => {
        return res.status(200).json({ success: "Success",  data});
      })
      .catch(err => {
        console.log(err);
        res.status(500).send({success: "not success"});
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
    const clientId = req.params.clientId;

    try {
        // console.log('req id',userId)
        const patient = await Client.getClientById(clientId);
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
    
    let clientId = req.params.clientId;
    // let Client1 = req.body;

    let {patient1Id, ...Client1} = req.body;
    const existingRecord = await Client.getClientById(clientId); 
    let Client = Client1;
    // console.log(existingRecord.clientId,">>>>>>>>>>>>>>>>>>>>>>DDDDDDDDDDDDDDDD")

    if(parseInt(clientId)===parseInt(existingRecord.clientId)){
        try {
            const result = await Client.updateClient(clientId,Client);
            let updatedClient = await Client.getClientById(clientId);
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
    
    const existingRecord = await Client.getClientById(clientId); 

    if (clientId === null){
        console.log("clientId = Undefoned"); 
        return res.status(404).json({ error: "User not found" });
    }else if (clientId == parseInt(existingRecord.clientId)){
        console.log("clientId is defoned",clientId)
        try {
            const result = await Client.deleteClient(clientId);
            res.status(200).json({ message: result.message });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        };
    }
    return clientId;
};

