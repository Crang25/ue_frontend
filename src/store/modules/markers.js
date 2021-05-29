import axios from 'axios';
import config from '@/config';

export default {
    state: {
        statements: null,
        marks: null,
        myStatements: null,
    },
    mutations: {
        setAllStatements(state, statements) {
            state.statements = statements;
            console.log(state.statements);
        },
    },
    getters: {
        getAllStatements: state => {
            return state.statements;
        },
    },
    actions: {
        async createStatement(context, data) {
            try {
                const resp = await axios.post(config.STATEMENT, data, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                if (resp.status !== 200) {
                    console.log(`Create statement error status: ${resp.status}`);
                    return;
                }
                document.querySelector('.add-popup').style.display = 'none';
                document.querySelector('.add-btn').style.display = 'inline-block';
                document.querySelector('header').style.display = 'flex';
                console.log(resp.data);
            } catch (error) {
                console.log(`Error to create statement: ${error}`);
            }
        },

        async fetchAllStatements(context) {
            try {
                const resp = await axios.get(config.STATEMENT + '/all');
                if (resp.status !== 200) {
                    console.log(`Error fetch my statements status: ${resp.status}`);
                    return;
                }
                context.commit('setAllStatements', resp.data.response);

            } catch (error) {
                console.log(`Error fetch my statements: ${error}`);
            }
        }
    },
}