const table_name = "clients";

// Handle user registration
exports.registerClient = async (Client) => {
    try {
        console.log('before query')
        
        const query = `INSERT INTO ${table_name} (firstName, lastName, email,  phone_no, project_id, ClientDesc, pro_pic) VALUES (?,?,?,?,?,?,?)`;
        const [results] = await pool.query(query, [
            Client.fname, 
            Client.lname,          
            Client.email, 
            Client.phone_no, 
            Client.project_id, 
            Client.desc, 
            Client.pro_pic
        ]);

        console.log('after query')
        return { success: true, message: 'Client registered successfully', 'results.insertId ':results.insertId };
    } catch (error) {
        console.error('Error registering client:', error.message);
        
        if (error.code === 'ER_DUP_ENTRY') {
            return { success: false, message: 'Client email already exists in database' };
        }
        
        return { success: false, message: 'An error occurred during client registration :'+ error };
    }
};