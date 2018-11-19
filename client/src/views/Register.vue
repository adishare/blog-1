<template>
        <div class="col py-5  bg-success">
            <div class="col-5 mx-auto p-5 bg-light">
                <form class="py-4">
                    <h3 class="text-center">Register New Account</h3>
                    <div class="form-group">
                        <label for="registerName">Name</label>
                        <input type="text" v-model="registerModel.name" class="form-control" placeholder="Name"
                            aria-describedby="regName">
                    </div>
                    <div class="form-group">
                        <label for="registerEmail">Email</label>
                        <input type="email" class="form-control" v-model="registerModel.email" id="registerEmail"
                            autocomplete="email" placeholder="you@example.com">
                    </div>
                    <div class="form-group">
                        <label for="registerPassword">Password</label>
                        <input type="password" v-model="registerModel.password" autocomplete="current-password" class="form-control"
                            placeholder="Password" aria-describedby="regPass">
                    </div>
                    <input name="registerBtn" @click.prevent="register" id="registerBtn" class="btn btn-warning pull-right"
                        type="submit" value="Register">
                </form>
            </div>
        </div>
</template>

<script>
    export default {
        name : 'RegisterView',
        props: ['logNotification'],
        data () {
            return {
                registerModel : {
                    name : '',
                    email : '',
                    password : ''
                }
            }
        },
        methods: {
            register() {
                this.$server.post('/register', this.registerModel)
                .then((result) => {
                    this.logNotification(result.data.message + 'please login to continue', 'success', 4500)
                    this.$router.push('/login')
                }).catch((err) => {
                    console.log(err.response.data.err.message)
                    this.logNotification(err.response.data.err.message,'warning')
                });
            }
        }
    }
</script>

<style>

</style>