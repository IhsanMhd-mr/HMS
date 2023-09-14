const table_name = "clients";
const pool = require("../config/db_server")

// Handle client registration
exports.registerClient = async (Client) => {
    try {
        console.log('before query')
        
        const query = `INSERT INTO ${table_name} (firstName, lastName, client_email,  phone_no, project_id, client_Desc, pro_pic) VALUES (?,?,?,?,?,?,?)`;
        const [results] = await pool.query(query, [
            Client.firstName, 
            Client.lastName,          
            Client.client_email, 
            Client.phone_no, 
            Client.project_id, 
            Client.client_Desc, 
            Client.pro_pic
        ]);

        console.log('after query')
        return { success: true, message: 'Client registered successfully', 'results.insertId ':results.insertId };
    } catch (error) {
        console.error('Error registering client:', error.message);
        
        if (error.code === 'ER_DUP_ENTRY') {
            const errMessage = { success: false, message: 'Client email already exists in database' };
            throw(errMessage)
            return errMessage
        }
        
        return { success: false, message: 'An error occurred during client registration :'+ error };
    }
};


// Get All
exports.getAllClients = async () => {
    // filtered coulums
        console.log('getall query')
    const query = `SELECT *  FROM ${table_name}`; 
    try {
        console.log('getall query')
        let [results] = await pool.query(query);
        // let [x] = results
        // console.log(x)
        return { success: true, message: 'Client recieved successfully', 'results':results };;
    } catch (error) {
        console.error('Error fetching all Clients:', error.message);
        throw error;
    }
};

// Get Clientby Id
exports.getClientById = async (clientId) => {
    const query = `SELECT * FROM ${table_name} WHERE client_id = ?`;
    try {
        const results = await pool.query(query, [clientId]);
        if (results.length === 0) {
            return null;
        } else {
            return results[0][0];
        }
    } catch (error) {
        console.error('Error fetching Client by ID:', error.message);
        throw error;
    }
};



// Update by Client Id
exports.updateClientById = async (clientId, Client) => {
    
    const query = `
    UPDATE ${table_name} 
    SET firstName = ?, lastName = ?,   email = ?,  phone_no = ?, project_id = ?, client_Desc = ?,   pro_pic=?,   
    WHERE client_id = ?`;
    try {
        // console.log(Client.name, Client.client_email, Client.password, ClientId);
        const results = await pool.query(query, [
            Client.firstName, 
            Client.lastName,          
            Client.client_email, 
            Client.phone_no, 
            Client.project_id, 
            Client.client_Desc, 
            Client.pro_pic,

            clientId
        ]);

        if (results.affectedRows === 0) {
            // No rows were affected by the update, indicating Client not found
            return { success: false, message: 'Client not found' };
        } else {
            // Successful update
            // console.log(Client.name, Client.client_email, Client.password, ClientId, 'in queryfunc');
            return { success: true, message: 'Client updated successfully', clientId };
        }
    } catch (error) {
        console.error('Error updating Client by ID:', error.message);
        throw error; // Rethrow the error to be handled by the caller
    }
};



// Update by Client Id
exports.updateClientPicById = async (clientId, pro_pic) => {
    
    const query = `
    UPDATE ${table_name} 
    SET  pro_pic=?
    WHERE client_id = ?`;
    try {
        const results = await pool.query(query, [ 
            pro_pic,
            clientId
        ]);

        if (results.affectedRows === 0) {
            return { success: false, message: 'Client not found' };
        } else {
            return { success: true, message: 'Client pic updated successfully', clientId };
        }
    } catch (error) {
        console.error('Error updating Client by ID:', error.message);
        throw error;// Rethrow the error to be handled by the caller
    }
};

// Delete by Client Id
exports.deleteClient = async (clientId) => {
    
    // const ClientId = await exports.getClientByEmail(req, res); // Call getClientByEmail function to get the ClientId
    // console.log(ClientId);

    const query = `DELETE FROM ${table_name} WHERE client_id = ?`;
    try {
        const results = await pool.query(query, [clientId]);
        if (results.affectedRows === 0) {
            return { success: false, message: 'Client not found' };
        } else {
            return { success: true, message: 'Client deleted successfully', clientId };
        }
    } catch (error) {
        console.error('Error deleting Client:', error.message);
        throw error;
    } 
};
