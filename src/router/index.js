import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Error from '@/components/Error'
import Profile from '@/components/Profile'
import LoginForm from '@/components/LoginForm'
import Google from '@/components/Google'
import LoginOkta from '@/components/LoginOkta'
import Registration from '@/components/Registration'
import O365 from '@/components/O365'
import { validateAccess, logout, redirect, redirectOkta, loginOkta } from '../auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    //Public pages
    { path: '*', redirect: '/home'}, //redirect to make sure you land in a page
    { path: '/home', component: Home}, //home page
    { path: '/loginform', component: LoginForm},
    { path: '/error', component: Error},
    //Private pages (displayed only user access is validated)
    { path: '/profile', beforeEnter: validateAccess, component: Profile},
    //Functions without page
    { path: '/login', component: loginOkta },
    { path: '/logout', component: logout },
    { path: '/redirect', component: redirect },//calls redirect() to extract tokens
    { path: '/google', beforeEnter: validateAccess, component: Google},
    { path: '/O365', beforeEnter: validateAccess, component: O365},
    { path: '/registration', component: Registration },
    { path: '/loginOkta', component: LoginOkta },
    //{ path: '/applications', component: Application }
  ]
})
