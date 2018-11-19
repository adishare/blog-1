<template>
    <div>
        <h5 class=""> Realted Videos</h5>
        <transition name="fade" mode="out-in">
        <div v-if="!playVideoMode" class="card-deck">
            <div class="card hover" v-for="(realatedVideo,i) in relatedVideos" :key="i" @click="playVideo(realatedVideo.id.videoId)">
                <img class="card-img-top" :src="realatedVideo.snippet.thumbnails.medium.url" :alt="realatedVideo.snippet.title">
                <div class="card-body">
                    <h6 class="card-title">{{realatedVideo.snippet.title}}</h6>
                </div>
            </div>
        </div>
        </transition>
        <transition name="fade" mode="out-in">
        <span v-if="playVideoMode">
            <iframe width="100%" height="400px" :src="playVideoMode"></iframe>
            <button type="button" class="btn btn-success btn-lg btn-block " @click="playVideoMode = ''">Back</button>
        </span>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['article'],
    data () {
        return {
            relatedVideos : [],
            playVideoMode : ''
        }
    },
    created () {
        this.getRelatedVideos()  
    },
    methods: {

        playVideo(videoId) {
            this.playVideoMode = `https://www.youtube.com/embed/${videoId}` 
        },

        getRelatedVideos() {

            let self = this
            axios.get('https://www.googleapis.com/youtube/v3/search', {
                params: {
                    key: 'AIzaSyB14D6HhI49S1hlpYeySp0u09fHIB0DrGg',
                    part : 'snippet,id',
                    maxResults : 3,
                    order : 'relevance',
                    type : 'video',
                    q : self.article.title
                }
            })
            .then((result) => {
                self.relatedVideos = result.data.items
            }).catch((err) => {
                console.log(err);
            });

        },

    }

}
</script>

<style scoped>
    .hover {
        cursor: pointer;
    }
</style>
