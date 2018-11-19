<template>
    <div class="container-fluid p-5 bg-light">
        <div class="row">
            <div class="col mx-auto" style="max-width: 890px;">
                <form>
                    <div class="form-group">
                        <input type="text" maxlength="50" class="form-control" v-model="newArticleModel.title" id="newArticleTitle" placeholder="Article Title" required=1>
                    </div>
                    <div class="form-group">
                        <div v-if="newArticleModel.content" v-html="newArticleModel.content" class="bg-light p-3 mb-2"></div>
                        <vue-editor v-model="newArticleModel.content" id="newArticleContent"></vue-editor>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" name="sendEmailcek" id="sendEmailcek" v-model="sendEmail">
                        <label class="custom-control-label" for="sendEmailcek">Send Email Notification to Subscribers</label>
                    </div>
                    <input @click.prevent="submitArticle" id="newarticleBtn" class="btn btn-success pull-right" type="submit" value="Create">
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
    props: ['logNotification'],
    components: {
        VueEditor
    },
    data () {
        return {
            newArticleModel : {
                title : '',
                content : ''
            },

            sendEmail : false

        }
    },
    methods: {
        submitArticle() {
            
            this.$server.post('/articles', this.newArticleModel, {
                headers : {
                    token : localStorage.getItem('token')
                }
            })
            .then((result) => {
                if(this.sendEmail) {
                    this.sendEmailToSubscribers(result.data)
                }
                this.logNotification(`Create Article Success, Title : ${result.data.title}`, 'success', 4500)
                this.$router.push(`/articles/${result.data._id}`)
            }).catch(() => {
                this.logNotification('Error when Creating Article','danger')
            });

        },

        sendEmailToSubscribers(article) {
            this.$server.post('/subscribes/notify', {
                article : article,
                content : `<h5> ${article.title} </h5> 
                    ${article.content}
                    <br>
                    visit ${this.$clientBaseUrl}/articles/${article._id}
                `
            })
            .then(() => {
                this.logNotification(`Your Article shared to subscibers`, 'success', 5000)                
            }).catch(() => {
                this.logNotification(`Sharing article failed`, 'danger', 4500)                                
            });
        }
    }

}
</script>

<style>

</style>
