<template>
    <header>
        <!-- <router-link class="header-link" to="/">Главная</router-link> -->
        <router-link class="header-link" to="/map">Карта</router-link>
        <router-link class="header-link" to="/login">Login/Register</router-link>
        <button v-if="isLoggedIn" class="header-link" @click="logout">Выйти</button>
        <router-link v-if="isLoggedIn&&getUserId" :to="{ name: 'Profile', params: { userId: getUserId} }">
            <img class="avatar" src="http://n3.casa:5000/attachments?filename=avatar.png" alt="profile-image">
        </router-link>
    </header>
</template>

<script>

export default {
    name: 'Header',

    computed: {
        isLoggedIn() {
            return this.$store.getters.ifLoggedIn;
        },
        getUserId() {
            return this.$store.getters.getUserInfo.userId;
        }
    },

    methods: {
        logout() {
            this.$store.commit('resetInfo');
            this.$router.push('/map');
        }
    },
}
</script>

<style scoped>
header {
    background-color: #1abc9c;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 100px;
}

.header-link {
    height: 40px;
    background-color: #f1bb4e;
    padding: 10px 30px;
    margin: 0 0.1em 0.1em 0;
    border: 1px solid rgba(255,255,255,0);
    border-radius: 1px;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Roboto',sans-serif;
    font-weight: 300;
    color: #FFFFFF;
    text-shadow: 0 0.04em 0.04em rgb(0 0 0 / 35%);
    text-align: center;
    transition: all 0.2s;
}

.header-link:hover {
    border-color: white;
}

.avatar {
    border-radius: 50%;
    width: 50px;
    height: 50px
}

</style>