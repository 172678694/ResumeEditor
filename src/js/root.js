//for Webpack: import App from './App.js'

const routes = [
  { path: '/', component: window.App },
  { path: '/login', component: window.Login },
  { path: '/signUp', component: window.SignUp },
  { path: '/share', component: window.Share }
]

const router = new VueRouter({
  routes: routes 
})

const app = new Vue({
  router:router,
  el:'#root',
  data(){
    return{
      currentUser:{},
      shareLink:'',
      resume:{}
    }
  }
})






