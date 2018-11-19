<template>
    <transition name="fade" mode="out-in">

    <div v-if="article" class="col m-3 cardarticle">
        <div class="card">
            <div class="row no-gutters">
                <div v-if="article.img" class="col-auto">
                    <img src="//placehold.it/200" class="img-fluid" alt="">
                </div>
                <div class="col">
                    <div class="card-block">
                        <div class="card-header">
                            <input v-if="editMode" type="text" maxlength="50" class="form-control" v-model="editArticleModel.title" id="editArticleTitle" placeholder="Article Title" required=1>                        
                            <h4 v-if="!editMode" >{{article.title}}</h4>
                        </div>
                        <div class="card-body">
                            <vue-editor  v-if="editMode" v-model="editArticleModel.content" id="editArticleContent"></vue-editor>
                            <span v-if="!editMode">
                                <div v-if="$route.name == 'articles'" v-html="article.content.length > 200 ? article.content.slice(0,200) +' ...' : article.content"></div>
                                <span v-if="$route.name == 'articles'" class="tohover" @click.prevent="$router.push({name: 'articleDetail',params: {id: article._id}})"> 
                                    <span class="badge badge-pill badge-success pull-right">
                                        <i>Read More >> </i>
                                    </span> 
                                    <br>
                                </span>
                                <div v-if="$route.name == 'articleDetail'" v-html="article.content"></div>
                            </span>
                            <span v-if="editMode" class="text-centered row pull-right p-3 mx-auto">
                                <button type="button" class="btn btn-secondary m-3" @click="editMode = false">Cancel</button>
                                <button type="button" class="btn btn-warning m-3" @click="updateArticle">Update</button>
                            </span>
                            <hr>
                            <small class="pull-right"><b>{{article.author.name}}</b></small> <br>
                            <small class="pull-right"><i>{{article.updatedAt}}</i></small> <br>
                        </div>
                        <div v-if="$route.name == 'articleDetail'" class="card-footer">
                            <Related
                                :article='article'
                            ></Related>
                        </div>
                    </div>
                </div>
                <div v-if="$route.name =='articles'" style="width:50px;" class=" p-3 d-flex align-content-around flex-wrap bg-primary text-light">
                    <span>
                        <span class="badge badge-pill badge-success">{{article.viewCount}}</span>
                        <i class="fa fa-eye fa-lg"></i>
                    </span>
                    <span>
                        <span class="badge badge-pill badge-warning"> {{article.likes.length}} </span>
                        <i class="fa fa-heart fa-lg"></i>
                    </span>
                    <span>
                        <span class="badge badge-pill badge-info">{{article.comments.length}}</span>
                        <i class="fa fa-comments fa-lg"></i>
                    </span>
                </div>
            </div>
            <div v-if="$route.params.id === article._id" class="card-footer">
                <div class=" d-flex justify-content-between p-2 px-5">
                    <span style="cursor: pointer;" @click="like()">
                        <i v-if=" user && article.likes.indexOf(user._id) != -1" class="fa fa-heart fa-lg"></i>
                        <i v-else class="fa fa-heart-o fa-lg" aria-hidden="true"></i>
                        <span class="badge badge-pill badge-danger">{{article.likes.length}}</span>
                    </span>
                    <span>
                        <i class="fa fa-comments fa-lg"></i>
                        <span class="badge badge-pill badge-warning">{{article.comments.length}}</span>
                    </span>
                    <span>
                        <i class="fa fa-eye fa-lg"></i>
                        <span class="badge badge-pill badge-success">{{article.viewCount}}</span>
                    </span>
                    <span v-if=" user && article.author._id == user._id" style="cursor: pointer;" @click="editArticle()">
                        <i class="fa fa-pencil-square fa-lg"></i>
                    </span>
                    <span v-if=" user && article.author._id == user._id" style="cursor: pointer;" @click="deleteArticle()">
                        <i class="fa fa-remove fa-lg"></i>
                    </span>

                </div>
            </div>

            <div v-if="$route.params.id === article._id" class="card-footer">
                <CommentBar 
                    :article='article' 
                    :logNotification='logNotification'
                    :user='user'
                    :fetchArticle='fetchArticle'
                    :fetchArticles='fetchArticles'
                ></CommentBar>
            </div>

        </div>
    </div>
    </transition>
</template>

<script>
    import CommentBar from "./CommentBar";
    import { VueEditor } from 'vue2-editor';
    import Related from './Related';
    
    export default {
        props: ['article','user','logNotification','fetchArticles','fetchArticle'],
        components: {
            CommentBar,
            VueEditor,
            Related
        },
        data () {
            return {
                editMode : false,

                editArticleModel : {
                    title : this.article.title,
                    content : this.article.content
                }
            }
        },
        created () {
            
        },
        methods: {

            like() {

                if(!this.user) {
                    return this.logNotification(' Please Register/Login First ', 'info', 1000)
                } else if (this.user._id == this.article.author._id) {
                    return this.logNotification(' Please like others article ;) ', 'warning', 1000)
                }

                this.$server.post(`/articles/likes/${this.article._id}`, {}, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.logNotification(result.data.message, 'info', 3000)
                    this.fetchArticles()
                    this.fetchArticle()
                }).catch((err) => {
                    this.logNotification(err.response.data.message, 'danger', 3000)
                });

            },

            deleteArticle() {

                this.$server.delete(`/articles/${this.article._id}`, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then(() => {
                    this.logNotification(`Article Deleted`, 'info', 3000)
                    this.fetchArticles()
                    this.$router.push('/')
                }).catch((err) => {
                    this.logNotification(err.response.data.message, 'danger', 3000)
                });

            },

            editArticle() {
                this.editMode = true
                this.editArticleModel = {
                    title : this.article.title,
                    content : this.article.content
                }
            },

            updateArticle() {
                this.$server.put(`/articles/${this.article._id}`, this.editArticleModel, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.logNotification(result.data.message, 'info', 3000)
                    this.fetchArticles()
                    this.fetchArticle()
                    this.editMode = false
                }).catch((err) => {
                    this.logNotification(err.response.data.message, 'danger', 3000)
                });
            }
            

        },
        
    }
</script>

<style>
    .tohover {
        font-size: 15px;    
    }

    .tohover :hover {
        transition: .2s;
        margin-right: 6px;
        cursor: pointer;
    }

</style>