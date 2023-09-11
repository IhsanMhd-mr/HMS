const clients_query = require('../repo/clients_query');

exports.register =  async (Client) => {
    try{
        const result= await clients_query.registerClient(Client);
        return{ message: result.message }
    } catch (error) {
        throw(error);
    }
}