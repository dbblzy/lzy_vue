import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import Register from '../components/Register'
 import AdminIndex from '../components/admin/AdminIndex'
import AdminMenu from '../components/admin/AdminMenu';
import Header from '../components/admin/Header';
import Dashboard from '../components/admin/dashboard/admin/index'
import Editor from '../components/admin/content/ArticalEditor'
import Jotter from '../components/jotter/Articles'
import Articles from '../components/jotter/ArticleDetails'



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
        },
        {
          path: '/jotter',
          name: 'Jotter',
          component: Jotter
        },
        {
          path: '/jotter/article',
          name: 'Article',
          component: Articles
        },
        
      ]
    },
    {
      path:'/admin',
      name:'Admin',
      component:AdminIndex,
      meta: {
         requireAuth: true
       },
       children:[{
         path:'/admin/dashboard',
         name:'Dashboard',
         component:Dashboard,
         meta:{
           requireAuth:true
         }
       }]

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
        },
        {
          path: '/admin/content/editor',
          name: 'Editor',
          component: Jotter
        },
        
      ]
    },
    {
      path:'/admin',
      name:'Admin',
      component:AdminIndex,
      meta: {
         requireAuth: true
       },
       children:[{
         path:'/admin/dashboard',
         name:'Dashboard',
         component:Dashboard,
         meta:{
           requireAuth:true
         }
       }]

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
