<template>
    <div v-if="user" class="mb-3">
        <div class=" bg-light card text-center">
            <img v-if="user.avatar" class="card-img-top" width="100%" height="150px" style="object-fit: cover;"  :src="user.avatar" alt="">
            <div class="card-body p-2">
                <i class="hover fa fa-edit fa-lg pull-right" @click="$router.push('/userAccount')"></i>
                <h5 class="">{{user.name}}</h5>
                <h6 class="">{{user.email}}</h6>
            </div>
            <div class="card-footer p-1">
                <!-- <button type="button" class="btn btn-sm btn-info mx-1 ">{{user.subscribers.length}} Subscibers</button> -->
                <button type="button" class="btn btn-sm btn-danger mx-1 ">{{userArticles.length}} Articles</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['user','articles'],
    data () {
        return {
            userArticles : [...this.articles].filter( val => {
                return val.author._id == this.user._id
            })
        }
    },
    created () {
        // this.getUserArticles()  
    },
    methods: {
        getUserArticles() {
            let inArtilces = [...this.articles]
            let result = inArtilces.filter( val => {
                return val.author._id == this.user._id
            })
            this.userArticles = result
        }
    },
    watch: {
        articles : function() {
            this.getUserArticles()
        }
    }

}
</script>

<style>

</style>
