<template>
    <div class="mt-3">
        
        <ProfileCard
            :user='user'
            :articles='articles'
        ></ProfileCard>

        <div v-if="$route.name == 'articleDetail'" @click="$router.push('/')" class="d-flex justify-content-between goanim mb-3 list-group-item list-group-item-action bg-light text-dark" style="cursor : pointer;">
            <h5 class="mb-1"> All Articles </h5>
        </div>
        <div v-for="(article,index) in articles" :key="index">
            <a href="#" @click.prevent="$router.push({name: 'articleDetail',params: {id: article._id}})"  class="goanim list-group-item list-group-item-action bg-primary text-light">
                <div class="d-flex justify-content-between ">
                    <h5 class="mb-1">{{article.title.length > 20 ? article.title.slice(0,20)+'...' : article.title.slice(0,20) }}</h5>
                </div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['articles','user'],
        components: {
            ProfileCard : () => import('./ProfileCard.vue')
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
    .goanim {
        transition: .1s;
        margin-bottom: 5px;
    }

    .goanim:hover {
        margin-left: 20px !important;
    }
</style>