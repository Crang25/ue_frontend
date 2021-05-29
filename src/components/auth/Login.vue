<template>
    <div class="login">
        <form @submit.prevent="login()">
            <div class="auth-fields-wrapper">
                <h1>Вход в аккаунт</h1>
                <p>Пожалуйста заполните форму, чтобы войти в аккаунт.</p>
                <hr>

                <label class="auth-label" for="email"><b>Email</b></label>
                <input v-model="email" class="auth-input" type="email" placeholder="Введите email" name="email" id="email" required>

                <label class="auth-label" for="psw"><b>Пароль</b></label>
                <input v-model="password" class="auth-input" type="password" placeholder="Введите пароль" name="psw" id="psw" required>

                <hr>

                <button type="submit" class="auth-submit">Войти</button>
            </div>

            <div class="signin">
                <p>Еще нет аккаунта? <router-link to="/register" class="auth-link">Зарегистрироваться</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            email: '',
            password: '',
        }
    },
    methods: {
        login() {
            const user = {
                email: this.email,
                password: this.password,
            };
            this.$store.dispatch('login', user);
        },
    },
}
</script>