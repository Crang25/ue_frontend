export default {
    // Auth
    REGISTER: 'http://n3.casa:5000/users',  // POST: username, password, email -> user info
    GET_TOKEN: 'http://n3.casa:5000/auth',    // GET: Basis auth: email, password -> token
    
    // POST. HTTPTokenAuth, 
    STATEMENT: 'http://n3.casa:5000/statements',
    // GET
    GET_MARK: 'http://n3.casa:5000/marks',
    // POST
    LOAD_ATTACHMENTS: 'http://n3.casa:5000/attachments'

}