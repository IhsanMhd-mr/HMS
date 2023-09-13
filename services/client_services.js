const clients_query = require('../repo/clients_query');
const { log, error } = require("console");

const cloudinary = require('cloudinary')
require('../lib/cloudinary')


exports.register = async function (req, res, next) {
    
    console.log(req.file.path)
  
    try {
      const imgUpload = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "client_docs" }
      );
      console.log(imgUpload.secure_url);
  
      const newClient = new Client({
        patientId: req.body.patientId,
        updatedDateTime: req.body.updatedDateTime,
        heartRate: req.body.heartRate, 
        bloodGroup: req.body.bloodGroup, 
        height: req.body.height, 
        weight: req.body.weight, 
        disease: req.body.disease, 
        clientImage: imgUpload.secure_url,
        treatments: req.body.treatments,
        clientDocuments: req.body.clientDocuments,
      });
  


      Client.registerClient(newClient)
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
  
// Handle fetching all users
exports.getAll = async (req, res) => {
    try {
        const clients = await clients_query.getAllClients();
        return clients;
    } catch (error) {
        throw(error)
    }
};


// //get Clients list 
// exports.getClientClientById = async function (req, res) {
//     const patientId = req.body.patientId;
//     console.log(patientId,"patient id")

//     try {
//         const gotClients = await clients_query.getClientByClientId(patientId);
//         if (!gotClients) {
//             return res.status(404).json({ error: "Clients not found" });
//         }
//         res.status(200).json(gotClients);
        
//     } catch (error) {
//         console.error("Error getting user by ID:", error);
//         res.status(500).json({ error: "Internal Server Error in fetching" });
//     }
//   };

  //get by Client Id 
  exports.getClientById = async function (req, res) {
    // const patientId = req.body.patientId;
    const clientId = req.body.clientId;
  
      try {
          // console.log('req id',userId)
          const isClient = await clients_query.getClientById(clientId);
          if (!isClient) {
              return res.status(404).json({ error: "Client not found" });
          }
          res.status(200).json(isClient);
          
      } catch (error) {
          console.error("Error getting user by ID:", error);
          res.status(500).json({ error: "Internal Server Error in fetching" });
      }
      
    };
  
    // Handle updating a Client by ID
// exports.updateClient = async (req, res) => {
//     try {
//         // Get the existing client by ID
//         const existingClient = await clients_query.getClientById(req.params.clientId);

//         if (!existingClient) {
//             return res.status(404).json({ error: "Client not found" });
//         }

//         // Prepare the updated client data from the request body
//         const updatedClientData = {
//             ...existingClient, // Keep existing data
//             ...req.body,      // Update with new data from request body
//         };

//         // Handle image upload, if an image is provided
//         if (req.file && req.file.path) {
//             const imgUpload = await cloudinary.uploader.upload(
//                 req.file.path,
//                 { folder: "client_docs" }
//             );
//             updatedClientData.clientImage = imgUpload.secure_url;
//         }

//         // Update the client with the updated data
//         const result = await clients_query.editClient(req.params.clientId, updatedClientData);

//         // Get the updated client
//         const updatedClient = await clients_query.getClientById(req.params.clientId);

//         res.status(200).json({ message: result.message, updatedClient });
//     } catch (error) {
//         console.error("Error updating client:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// Handle updating a Client by ID
exports.updateClient = async (req, res) => {
// 
    try {
      const imgUpload = await cloudinary.uploader.upload(
        req.file.path,
        { folder: "client_docs" }
      );
    //   console.log(imgUpload.secure_url);
     
    //  console.log(imgUpload,"llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
    //   
    let {clientId, ...Client1} = req.body;
    // console.log(clientId,'clientId',Client1,'Client1')

    const existingRecord = await clients_query.getClientById(clientId); 
    // 
    const Clientx = new Client({
        patientId: Client1.patientId || existingRecord.patientId,
        updatedDateTime: Client1.updatedDateTime || existingRecord.updatedDateTime,
        heartRate: Client1.heartRate || existingRecord.heartRate,
        bloodGroup: Client1.bloodGroup || existingRecord.bloodGroup,
        height: Client1.height || existingRecord.height,
        weight: Client1.weight || existingRecord.weight,
        disease: Client1.disease || existingRecord.disease,
        clientImage: imgUpload ? imgUpload.secure_url : existingRecord.clientImage,
        treatments: Client1.treatments || existingRecord.treatments,
        clientDocuments: Client1.clientDocuments || existingRecord.clientDocuments,
    });
    
    
    console.log(Clientx,"fffffffffffffffffffffffffffffffffff") ;
    

    if(parseInt(clientId)===existingRecord.clientId)
    {
        try {
            // console.log("Clientx",Clientx)

            const result = await clients_query.editClient(clientId,Clientx);
            // console.log("result",result)
            let updatedClient = await clients_query.getClientById(clientId);
            // console.log("clientId",clientId)
            return{ message: result.message,updatedClient };
        } catch (error) {
            throw(error);
        }
    }else{
        console.log(error)
        // return res.status(404).json({ error: "Client not found" });
    };
    }catch{console(error)};
};


// Delete a client by ID
exports.deleteClient = async (req, res) => {
    try {
        const clientId = req.body.clientId; 
        
        if (clientId === undefined || clientId === null) {
            return res.status(400).json({ error: "clientId is required" });
        }

        const existingRecord = await clients_query.getClientById(clientId); 
        
        if (!existingRecord) {
            return res.status(404).json({ error: "Client not found" });
        }
        else{const result = await clients_query.deleteClient(clientId);
        res.status(200).json({ message: "Client deleted successfully" ,result:result});
    }
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// //  delete All clients for patient ID
// exports.deleteAllClient = async (req, res) => {
//     let patientId = req.body.patientId;
    
//     const existingRecord = await exports.getClientById(req, res); 

//     if (patientId === null){
//         console.log("patientId = Undefoned"); 
//         return res.status(404).json({ error: "patient not found" });
//     }else if (patientId == parseInt(existingRecord.patientId)){
//         console.log("patientId is defoned",patientId)
//         try {
//             const result = await clients_query.deleteAllClients(patientId);
//             res.status(200).json({ message: result.message });
//         } catch (error) {
//             console.error("Error deleting clients:", error);
//             res.status(500).json({ error: "Internal Server Error" });
//         };
//     }

//     return patientId;
// };