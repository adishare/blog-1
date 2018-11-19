<template>
    <div class="col py-5  bg-success">
<div class="col-5 mx-auto p-5 bg-light">
    <form>
        <h4> <b class="text-dark"> Account Profle  </b> </h4>
        <div class="form-group">
            <input type="email" v-model="editUserModel.email" disabled  class="form-control" autocomplete="email" placeholder="Email">
            <small><i>email can't be change</i></small>
        </div>
        <div class="input-group mb-3">
            <div class="custom-file">
                <input type="file" class="custom-file-input" accept="image/*" id="pictureFile" v-on:change="getImgInput($event)">
                <label class="custom-file-label" for="pictureFile">Avatar {{imgFileName}}</label>
            </div>
        </div>
        <div class="form-group">
            <input type="text" v-model="editUserModel.name" autocomplete="username" class="form-control" placeholder="Name" >
        </div>
        <div class="form-group">
            <input type="password" v-model="editUserModel.password" autocomplete="current-password" class="form-control" placeholder="password">
            <small><i>let empty if u won't change password</i></small>
        </div>
        <button  @click.prevent="$router.push('/')"  class="btn btn-success"> Back </button>
        <input name="updateUserbtn"  @click.prevent="updateUser" id="updateUserbtn" class="btn btn-warning pull-right" type="submit" value="Update">
        
    </form>
</div>
</div>
</template>

<script>
export default {
    props: ['user','logNotification','getUserByToken'],
    data () {
        return {
            editUserModel : {
                name : this.user.name,
                email: this.user.email
            },
            imgFileName : '',
            imgInput : ''
        }
    },
    methods: {
        updateUser() {

            let formdata1 = new FormData()
            formdata1.append('picturefile', this.imgInput)

            this.$server.post(`/upload`, formdata1, {
                    headers : {
                        token : localStorage.getItem('token')
                    }
                })
                .then((image) => {

                    if(image) this.editUserModel.avatar = image.data.link
            
                    this.$server.put(`/users/${this.user._id}`, this.editUserModel, {
                        headers : {
                            token : localStorage.getItem('token')
                        }
                    })
                    .then(result => {
                        this.logNotification(result.data.message)
                        this.getUserByToken()
                        this.$router.push('/')
                    }).catch(err => {
                        this.logNotification(err.response.data.message)
                    });

                })
                .catch(err => {
                    this.logNotification(err.response.data.message)
                });

        },
        getImgInput(link) {
            this.imgInput = link.target.files[0]
            this.imgFileName = link.target.files[0].name
        },
    }
}
</script>

<style>

</style>
