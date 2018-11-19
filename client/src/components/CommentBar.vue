<template>
    <div class="">
        <ul class="list-group">
            <li v-for="comment in comments" :key="comment._id" class="list-group-item">
                <div class="d-flex justify-content-between ">
                    <span>
                        {{comment.comment}} 
                        <br>
                        <small  class="ml-3"> - {{comment.user.name}} @ <i> {{comment.createdAt}} </i> </small>
                    </span>
                    <div v-if="user && comment.user._id == user._id" style="cursor : pointer;" @click="deleteComment(comment._id)">
                        <i class="fa fa-trash fa-sm" ></i>
                    </div>
                </div>
            </li>
            
            <li v-if="user" class="list-group-item active">
                <form>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="commentInput" placeholder="Comment...">
                        <input type="submit" class="btn btn-sm btn-warning mt-2 pull-right " @click.prevent="postComment()" value="Post Comment">
                    </div>
                </form>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        props: ['article','logNotification','user','fetchArticle','fetchArticles'],
        data () {
            return {
                commentInput : '',
                comments : this.article.comments
            }
        },
        created () {
            
        },
        methods: {
            
            postComment() {

                if(this.commentInput.trim() == '') {
                    return this.logNotification('Please Write your Comment','warning', 3000)
                }

                this.$server.post(`/comments/${this.article._id}`, {
                    comment : this.commentInput
                }, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.commentInput = ''
                    this.comments = result.data.comments
                    this.fetchArticle()
                    this.fetchArticles()
                }).catch((err) => {
                    console.log(err.response);
                });

            },

            deleteComment(commentId) {

                this.$server.delete(`/comments/${commentId}`, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then((result) => {
                    this.fetchArticle()
                    this.fetchArticles()
                    this.comments = result.data.article.comments
                    this.logNotification(result.data.message, 'info', 2000)
                }).catch((err) => {
                    this.logNotification(err.response, 'danger', 5000)
                });

            }
          
        }
    }
</script>

<style>

</style>