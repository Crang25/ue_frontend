import axios from 'axios'
import config from '@/config'

export default {
    state: {
        token: localStorage.getItem('token') || null,
        userId: null,
        username: null,
        email: null,
        registerDate: null,
    },
    mutations: {
        setUser(state, user) {
            console.log(user);
            state.token = user.token;
            state.userId = user.id;
            state.username = user.username;
            state.email = user.email;
            state.registerDate = user.registerDate;
        },
        resetInfo(state) {
            localStorage.removeItem('token');
            state.userId = null;
            state.username = null;
            state.email = null;
            state.token = null;
            state.registerDate = null;
        },
    },
    getters: {
        getToken: () => localStorage.getItem('token'),
        ifLoggedIn: state => !!state.token,
        getUserInfo: state => ({
            userId: state.userId,
            username: state.username,
            email: state.email,
            registerDate: state.registerDate,
        }),
    },
    actions: {
        async getToken(user) {
            try {
                const resp = await axios.get(config.GET_TOKEN, {
                    auth: {
                        username: user.email,
                        password: user.password,
                    }
                })
                if (resp.status !== 200) {
                    console.error(`Error get token status: ${resp.status}`);
                    return;
                }
                return resp.data.response.token;
            } catch (error) {
                console.log(`Error get token: ${error}`);
            }
        },
        async register(context, user) {
            try {
                const resp = await axios.post(config.REGISTER, {
                    username: user.username,
                    password: user.password,
                    email: user.email,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (resp.status !== 200) {
                    console.error(`Error register token status: ${resp.status}`);
                    return;
                }

                
                const res = await axios.get(config.GET_TOKEN, {
                    auth: {
                        username: user.email,
                        password: user.password,
                    }
                })
                if (res.status !== 200) {
                    console.error(`Error get token status: ${resp.status}`);
                    return;
                }
                
                const token = res.data.response.token;
                console.log(resp.data, token);
                
                localStorage.setItem('token', token);
                context.commit('setUser', {
                    token: token,
                    id: resp.data.id,
                    username: resp.username,
                    email: resp.email,
                    registerDate: resp.data.register_date
                })

            } catch (error) {
                console.error(`Error to register: ${error}`);
                context.commit('resetInfo')
            }
        },

        async login(context, user) {
            try {
                const res = await axios.get(config.GET_TOKEN, {
                    auth: {
                        username: user.email,
                        password: user.password,
                    }
                })
                if (res.status !== 200) {
                    console.error(`Error get token status: ${resp.status}`);
                    return;
                }
                const token = res.data.response.token;

                const resp = await axios.get(config.REGISTER, {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    }
                });
                if (resp.status !== 200) {
                    console.error(`Error to login status: ${resp.status}`);
                    return;
                }

                console.log(resp.data);

                localStorage.setItem('token', token);
                context.commit('setUser', {
                    token: token,
                    id: resp.data.response.id,
                    username: resp.data.response.username,
                    email: resp.data.response.email,
                    registerDate: resp.data.response.register_date
                });

            } catch (error) {
                console.error(`Error to login: ${error}`);
                context.commit('resetInfo');
            }
        }
    },
    
}