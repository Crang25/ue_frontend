<template>
    <div class="register">
        <form @submit.prevent="register()">
            <div class="auth-fields-wrapper">
                <h1>Регистрация</h1>
                <p>Пожалуйста заполните форму, чтобы создать аккаунт.</p>
                <hr>

                <label class="auth-label" for="username"><b>Username</b></label>
                <input v-model="username" class="auth-input" type="text" placeholder="Введите username" name="username" id="username" required>

                <label class="auth-label" for="email"><b>Email</b></label>
                <input v-model="email" class="auth-input" type="email" placeholder="Введите email" name="email" id="email" required>

                <label class="auth-label" for="psw"><b>Пароль</b></label>
                <input v-model="password" class="auth-input" type="password" placeholder="Введите пароль" name="psw" id="psw" required>

                <hr>

                <button type="submit" class="auth-submit">Зарегистрироваться</button>
            </div>

            <div class="signin">
                <p>Уже есть аккаунт? <router-link to="/login" class="auth-link">Войти</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            username: '',
            email: '',
            password: '',
        }
    },
    methods: {
        register() {
            const user = {
                username: this.username,
                email: this.email,
                password: this.password,
            };
            this.$store.dispatch('register', user);
        },
    },
}
</script>

<style>

.auth-fields-wrapper {
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 0 20%;
}

.auth-label {
    text-align: left;
    margin-top: 10px;
}

.auth-input {
    border: none;
    background: #f1f1f1;
    padding: 15px;
}

.auth-input:focus {
    outline: none;
    background-color: #ddd;
}

.auth-submit {
    background-color: #3d6b7e;
    color: white;
    padding: 16px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    opacity: 0.9;
    font-size: 18px;
}

.auth-submit:hover {
    background-color: #608c9e;
}

.auth-link {
    text-decoration: none;
    cursor: pointer;
    font-size: 18px;
}

.auth-link:hover {
    color: cornflowerblue;
}

</style>