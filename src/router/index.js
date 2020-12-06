import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import Register from '../components/Register'
import UserBasic from '../components/admin/user/UserBasic'
import AdminIndex from '../components/admin/AdminIndex'
import AdminMenu from '../components/admin/AdminMenu';
import Header from '../components/admin/Header';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect:'/index',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        }
        
      ]
    },
    {
      path:'/admin',
      name:'Admin',
      component:AdminIndex,
      meta: {
         requireAuth: true
       }

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    }

  ] 
})
export const createRouter =routes=>new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect:'/index',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        }
        
      ]
    },
    {
      path:'/admin',
      name:'Admin',
      component:AdminIndex,
      meta: {
         requireAuth: true
       }

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/register',
      name:'Register',
      component:Register
    }

  ] 
})
