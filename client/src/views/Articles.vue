<template>
    <div class="container">

        <featuredArticle
            v-if="$route.name == 'articles'"
            :articles='articles'
        ></featuredArticle>

        <div class="row">
            <div class="col-3">
                <sidebar
                    :user='user'
                    :articles='articles'
                ></sidebar>
            </div>
            
            <div class="col-9">
                <div v-if="$route.name == 'articles'">
                    
                    <div  v-for="article in articles" :key="article._id">
                        <articleCard 
                            :logNotification='logNotification' 
                            :user='user' 
                            :article='article'
                            :fetchArticles='fetchArticles'
                        ></articleCard>
                    </div>

                </div>
                <transition name="fade" mode="out-in">
                    <router-view
                        v-if="$route.name == 'articleDetail'" 
                        :key="$route.params.id"
                        :logNotification='logNotification' 
                        :user='user'  
                        :articles='articles'
                        :fetchArticles='fetchArticles'
                    ></router-view>
                </transition>
            </div>
        </div>

        <chatcomponent :user='user'></chatcomponent>

    </div>
</template>

<script>


export default {
    props: ['logNotification','user'],
    components: {
        sidebar : () => import('../components/Sidebar.vue'),
        articleCard : () => import('../components/ArticleCard.vue'),
        chatcomponent : () => import('../components/Chat.vue'),
        featuredArticle : () => import('../components/FeaturedArticle.vue'),
    },
    data () {
        return {
            articles : [],

            currentPage: 1
        }
    },
    created () {
    
    },
    mounted () {
        this.fetchArticles()
    },
    methods: {

        fetchArticles(){

            this.$server.get('/articles')
                .then((result) => {
                    this.articles = result.data
                }).catch((err) => {
                    console.log(err.response);
                });

        },

        onPageChange: function onPageChange(page) {
            this.currentPage = page;
        } 

    }
}
</script>

<style>

</style>
