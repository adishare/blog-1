<template>
    <div>
        <div class="row my-2 mx-1">
            <nav class="nav nav-pills ">
                <a class="nav-link text-success" href="" @click.prevent="getPopularArticles">
                    <i class="fa fa-eye fa-lg"></i>
                    Popular
                </a>
                <a class="nav-link text-warning" href="" @click.prevent="getMostLikedArticles">
                    <i class="fa fa-heart fa-lg"></i>
                    Most Liked
                </a>
                <a class="nav-link text-info" href="" @click.prevent="getMostActiveArticles">
                    <i class="fa fa-comments fa-lg"></i>
                    Most Active
                </a>
            </nav>
        </div>
        <div class="row  mb-2">
            <div class="col">
                <div class="card-deck">
                    <div class="card" v-for="article in inArticles.slice(0,5)" :key="article._id">
                        <a class="hover" @click.prevent="$router.push({name: 'articleDetail',params: {id: article._id}})">
                            <div class="card-header pb-2">
                                <span v-if="featuredMode == 'popular'" class="badge pull-right badge-pill badge-success">{{article.viewCount}} views</span>
                                <span v-if="featuredMode == 'mostLiked'" class="badge badge-pill pull-right badge-warning">{{article.likes.length}} Likes</span>
                                <span v-if="featuredMode == 'mostActive'" class="badge badge-pill pull-right badge-info">{{article.comments.length}} Comments</span>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title">{{article.title}}</h5>
                                <span class="pull-right"> <small>by</small> <i> {{article.author.name}} </i> </span> <br>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['articles'],
    data () {
        return {
            inArticles : [],
            featuredMode : 'popular'
        }
    },
    mounted () {
        this.getPopularArticles()
    },
    methods: {
        getPopularArticles() {
            let result = []
            let init = [...this.articles]
            result = init.sort((a,b) => {
                return b.viewCount - a.viewCount
            })
            this.featuredMode = 'popular'
            this.inArticles = result
        },

        getMostLikedArticles() {
            let result = []
            let init = [...this.articles]
            result = init.sort((a,b) => {
                return b.likes.length - a.likes.length
            })
            this.featuredMode = 'mostLiked'
            this.inArticles = result
        },

        getMostActiveArticles() {
            let result = []
            let init = [...this.articles]
            result = init.sort((a,b) => {
                return b.comments.length - a.comments.length
            })
            this.featuredMode = 'mostActive'
            this.inArticles = result
        }
    },
    watch: {
        articles : function() {
            this.getPopularArticles()
        }
    }
}
</script>

<style>
.hover {
    cursor: pointer;
}

</style>
