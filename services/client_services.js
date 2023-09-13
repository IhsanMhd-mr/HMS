const clients_query = require('../repo/clients_query');
const rep_query = require('../repo/rep_query.js');
const jwt = require('../config/JWT.js');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());
// class Client {
//   constructor(ClientData) {
//     this.patientId = ClientData.patientId;
//     this.updatedDateTime = ClientData.updatedDateTime;
//     this.heartRate = ClientData.heartRate;
//     this.bloodGroup = ClientData.bloodGroup;
//     this.height = ClientData.height;
//     this.weight = ClientData.weight;
//     this.disease = ClientData.disease;
//     this.clientImage = ClientData.clientImage;
//     this.treatments = ClientData.treatments;
//     this.clientDocuments = ClientData.clientDocuments;
//   }
// }


const Client = function (ClientData) {
    this.fname = ClientData.fname, 
    this.lname = ClientData.lname,          
    this.email = ClientData.email, 
    this.phone_no = ClientData.phone_no, 
    this.project_id = ClientData.project_id, 
    this.desc = ClientData.desc, 
    this.pro_pic = ClientData.pro_pic
  };
  



Client.createClient = async (Client) => {
  try {
    const addResults = await rep_query.addClient(Client);
    console.log(addResults,"results added");
    return { message: "Client Created successfully" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

Client.editClient = async (clientId,Client) => {
  try {
    const existingClient = await rep_query.getClientById(clientId);
    console.log(existingClient,"existingClient")
    if (existingClient ) {
      console.log(Client,"puuuuuuuuuuuuuuuuuuuuuuuuuunnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnddddddddddddddddddddddddaaaaaaaaaaaaa")
      await rep_query.updateClientById(clientId,Client); // Check query ==>>>
      return { message: "Client Updated Successfully" };
    } else {
      return { message: "Patient not found!" };
    }
  } catch (error) {
    console.log(error,"in service")
    throw error;
  }
};

Client.deleteClient = async (clientId) => {
    try {
      const existingClient = await rep_query.getClientById(clientId);
      console.log(existingClient);
      if (existingClient) {
        await rep_query.deleteClient(clientId);
        return { message: "Client Deleted Successfully" };
      }else{
        return { message: "Client not found!" };
      }
    } catch (error) {
      throw error;
    }
  };

Client.deleteAllClients = async (clientId) => {
    try {
      const existingClient = await rep_query.getClientById(clientId);
      if (existingClient) {
        await rep_query.deleteAllClients(clientId);
        return { message: "Clients Deleted Successfully" };
      }else{
        return { message: "Clients not found!" };
      }
    } catch (error) {
      throw error;
    }
  };
// list of clients
Client.getClientByPatientId = async (PatientId) => {
    try {
      const existingClients = await rep_query.getClientByPatientId(PatientId);
      return existingClients;
    } catch (error) {
      throw error;
    }
  };
// one client by specific client id
Client.getClientById = async (clientId) => {
    try {
      const existingClients = await rep_query.getClientById(clientId);
      return existingClients;
    } catch (error) {
       throw error;
    }
};


module.exports = Client;
