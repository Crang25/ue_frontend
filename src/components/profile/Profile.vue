<template>
    <div class="profile">
        <img class="avatar" src="http://n3.casa:5000/attachments?filename=avatar.png" alt="profile-image">
        <p><b>Email:</b> <u>{{ getUserEmail }}</u></p>
        <p><b>Username:</b> <u>{{ getUserName }}</u></p>
        <p><b>Дата создания:</b> <u>{{ getRegisteredDate }}</u></p>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    computed: {
        getUserEmail () {
            return this.$store.getters.getUserInfo.email;
        },
        getUserName () {
            return this.$store.getters.getUserInfo.username;
        },
        getRegisteredDate() {
            return this.$store.getters.getUserInfo.registerDate;
        }
    }
}
</script>

<style scoped>

.profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;
}

.avatar {
    border-radius: 50% ;
    margin-bottom: 20px;
}

p {
    font-size: 20px;
}
</style>