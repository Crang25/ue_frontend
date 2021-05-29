import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/home/Home.vue'
import Login from '@/components/auth/Login.vue'
import Register from '@/components/auth/Register.vue'
import UserProfile from '@/components/profile/Profile.vue'
import Map from '@/components/map/Map.vue';

// Define routes
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/profile/:userId',
        name: 'Profile',
        component: UserProfile,
    },
    {
        path: '/map',
        name: 'Map',
        component: Map,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;