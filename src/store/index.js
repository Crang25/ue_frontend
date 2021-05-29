import { createStore } from 'vuex';
import auth from './modules/auth'
import markers from './modules/markers'

export default createStore({
    modules: {
        auth,        
        markers,
    }
})