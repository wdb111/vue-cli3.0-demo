import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/view/HelloWorld'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: "HelloWorld",
        component: HelloWorld,
    }]
})

//路由跳转前做点什么
router.beforeEach((to, from, next) => {
    // console.log(to)
    next()
});

//路由跳转后做点什么
router.afterEach(to => {
    // window.scrollTo(0, 0)
});
export default router;