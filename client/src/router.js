import Vue from 'vue'
import Router from 'vue-router'
// import axios from "axios";

// const serverBaseUrl = 'http://localhost:3000'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'articles',
            component: () => import('./views/Articles.vue'),
            children: [
                {
                    path: 'articles/:id',
                    name: 'articleDetail',
                    component: () => import('./views/ArticleDetail.vue'),
                    // beforeEnter: (to, from, next) => {
                    //     let articleId = to.params.id

                    //     axios.get(`${serverBaseUrl}/articles/updateViewer/${articleId}`)
                    //     .then(() => {
                    //         next(true)
                    //     }).catch((err) => {
                    //         console.log(err.response);
                    //     });
                    // }
                }
            ]
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('./views/About.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/Register.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/Login.vue')
        },
        {
            path: '/createArticle',
            name: 'crerateArticle',
            component: () => import('./views/CreateArticle.vue')
        },{
            path: '/userAccount',
            name: 'userAccount',
            component: () => import('./views/UserAccount.vue')
        },
    ]
})