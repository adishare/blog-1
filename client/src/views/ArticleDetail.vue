<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <articleCard 
                    :logNotification='logNotification' 
                    :fetchArticles='fetchArticles' 
                    :fetchArticle='fetchArticle'
                    :article='article' 
                    :user='user'
                ></articleCard>
            </div>
        </div>
    </div>
</template>

<script>
import ArticleCard from "../components/ArticleCard";

export default {
    name : 'ArticleDetail',
    props: ['user','logNotification','fetchArticles'],
    components: {
        ArticleCard
    },
    data () {
        return {
            article : ''
        }
    },
    created () {
        // this.fetchArticle()
    },
    methods: {

        fetchArticle() {
            this.$server.get(`/articles/${this.$route.params.id}`)
            .then((result) => {
                this.article = result.data
            }).catch((err) => {
                console.log(err.response);
            });
        }

    },
    watch: {

        '$route.params.id': {
            handler: function(newVal) {
                let articleId = newVal
                this.$server.get(`/articles/updateViewer/${articleId}`)
                .then(() => {
                    this.fetchArticle()
                    this.fetchArticles()
                }).catch((err) => {
                    console.log(err.response);
                });
            },
            deep: true,
            immediate: true
        },

    },
}
</script>

<style>

</style>
