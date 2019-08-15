import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      redirect:'/home',
      component: ()=> import('./views/index.vue'),
      meta:{noAuth:true},
      children:[
        {
          path: "/home",
          name: "home",
          component: ()=> import('./views/home/index.vue'),
          meta:{noAuth:true},
        },
        {
          path: "/generalize",
          name: "generalize",
          component: ()=> import('./views/generalize/index.vue'),
          
        },
        {
          path: "/record",
          name: "record",
          component: ()=> import('./views/record/index.vue'),
          meta:{noAuth:true},
        },
        {
          path: "/mine",
          name: "mine",
          component: ()=> import('./views/mine/index.vue'),
          children:[
            
          ]
        },
      ]
    },
    {
      path: '/recharge-record',
      name: 'recharge-record',
      component: ()=> import('./views/recharge-record/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('./views/login/index.vue'),
      meta:{noAuth:true},
    },
    {
      path: '/register',
      name: 'register',
      component: ()=> import('./views/register/index.vue'),
      meta:{noAuth:true},
    },
    {
      path: '/changepswd',
      name: 'changepswd',
      component: ()=> import('./views/changepswd/index.vue')
    },
    {
      path:'/bank-mange',
      name:'bank-mange',
      component: ()=> import('./views/mine/bank-mange'),
    },
    {
      path:'/addBank',
      name:'addBank',
      component: ()=> import('./views/mine/bank-mange/addBank'),
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: ()=> import('./views/recharge/index.vue')
    },
    {
      path: '/recharge-bank',
      name: 'recharge-bank',
      component: ()=> import('./views/recharge-bank/index.vue'),
    },
    {
      path: '/recharge-qrcode/:type',
      name: 'recharge-qrcode',
      component: ()=> import('./views/recharge-qrcode/index.vue')
    },
    {
      path:'/myAccount',
      name:'myAccount',
      component: ()=> import('./views/mine/myAccount'),
    },
    {
      path: '/bank-order',
      name: 'bank-order',
      component: ()=> import('./views/bank-order/index.vue')
    },
    {
      path: '/qrcode-order',
      name: 'qrcode-order',
      component: ()=> import('./views/qrcode-order/index.vue')
    },
    {
      path:'/Presentation',
      name:'Presentation',
      component: ()=> import('./views/mine/myAccount/components/Presentation.vue'),
    },
    {
      path: '/bill-record',
      name: 'bill-record',
      component: ()=> import('./views/bill-record/index.vue'),
    },
    {
      path: '/safe-center',
      name: 'safe-center',
      component: ()=> import('./views/safe-center/index.vue'),
    },
    {
      path: '/setUser',
      name: 'setUser',
      component: ()=> import('./views/safe-center/setUser/index.vue'),
    },
    {
      path: '/setMobile',
      name: 'setMobile',
      component: ()=> import('./views/safe-center/setMobile/index.vue'),
    },
    {
      path: '/setEmail',
      name: '/setEmail',
      component: ()=> import('./views/safe-center/setEmail/index.vue'),
    },
    {
      path: '/setPassword',
      name: 'setPassword',
      component: ()=> import('./views/safe-center/setPassword/index.vue'),
    },
    {
      path: '/setPayPassword/:id',
      name: 'setPayPassword',
      component: ()=> import('./views/safe-center/setPayPassword/index.vue'),
    },
    {
      path: '/games',
      name: 'games',
      meta:{noAuth:true},
      component: ()=> import('./views/games'),
    },
    {
      path: '/room-detail/:id',
      name: 'room-detail',
      component: ()=> import('./views/room-detail/index.vue'),
    },
    {

      path: '/agent-center',
      name: 'agent-center',
      component: ()=> import('./views/agent-center/index.vue')
    },
    {
      path: '/invite/:code',
      name: 'invite',
      component: ()=> import('./views/invite/index.vue'),

    },
    {
      path: '/game-order',
      name: 'game-order',
      component: ()=> import('./views/game-order/index.vue'),

    },
    {
      path: '/user-list',
      name: 'user-list',
      component: ()=> import('./views/user-list/index.vue')
    },
    {
      path: '/edit-info',
      name: 'edit-info',
      component: ()=> import('./views/edit-info/index.vue')
    }
  ]
});
