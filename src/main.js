import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import mavonEditor from 'mavon-editor'
 import moment from 'moment'

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8442/api'
Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.withCredentials=true
Vue.use(ElementUI)
Vue.use(mavonEditor)






router.beforeEach((to, from, next) => {
  if (store.state.user && to.path.startsWith('/admin')) {

    initAdminMenu(router, store)
  }
  
  // 如果前端没有登录信息则直接拦截，如果有则判断后端是否正常登录（防止构造参数绕过）
  if (to.meta.requireAuth) {
    if (store.state.user) {
      axios.get('/authentication').then(resp => {
        if (resp.data) {
          next()
        }
      })
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
}
)

//全局过滤器
Vue.filter('dateFormat', (input, formatString = "YYYY-MM-DD HH:mm:ss") => {
  //es5函数参数设置默认值
  //const lastFormatString = formatString || 

  
   // moment(input) 把时间字符串转成时间对象
   // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
  return moment(input).format(formatString)
}) 

const formatRoutes = (routes) => {
  let fmtRoutes = []
  if(routes!=null){
   
    routes.forEach(route => {
      console.log(route)
      if (route.children) {
        route.children = formatRoutes(route.children)
        console.log(route.children)
      }

  
      let fmtRoute = {
        path: route.path,
        
        component: resolve => {
          require(['./components/admin/' + route.component + '.vue'], resolve)
          console.log( route.path)
        },
        name: route.name,
        nameZh: route.nameZh,
        iconCls: route.iconCls,
        meta: {
          requireAuth: true
        },
        children: route.children
      }
      console.log(fmtRoute.name)
      fmtRoutes.push(fmtRoute)
    })
  }
  console.log(fmtRoutes.name)
 
  return fmtRoutes
}

const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  if (store.state.adminMenus.length > 0) {

    return
  }
  axios.get('/menu').then(resp => {
    if (resp && resp.status === 200) {
      console.log(resp.data)
      var fmtRoutes = formatRoutes(resp.data)
      console.log(1111)
      console.log(fmtRoutes)
      router.addRoutes(fmtRoutes)
      store.commit('initAdminMenu', fmtRoutes)
    }
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})

