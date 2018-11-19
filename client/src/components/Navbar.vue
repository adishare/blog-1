<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="" @click.prevent="$router.push('/')">
                <i class="fa fa-bicycle fa-lg"></i>
                H8ikeBlog
            </a>
            <a v-if="user" class="nav-link" href="" @click.prevent="$router.push('/createArticle')">
                <div class="text-light">
                    <i class="fa fa-plus fa-lg  "></i>
                    New Article
                </div>
            </a>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="" @click.prevent="$router.push('/')">
                            <i class="fa fa-home fa-lg"></i>
                            Home
                        </a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="" @click.prevent="$router.push('/about')">
                            <i class="fa fa-address-card fa-lg"></i>
                            About
                        </a>
                    </li>
                    <li  v-if="user" class="nav-item active">
                        <a class="nav-link" href="" @click.prevent="$router.push('/userAccount')">
                            <i class="fa fa-lg fa-user-circle-o" aria-hidden="true"></i>
                            {{user.email}}
                        </a>
                    </li>
                    <li v-if="!user" class="nav-item active">
                        <a class="nav-link" href="" @click.prevent="$router.push('/register')">
                            <i class="fa fa-beer fa-lg  "></i>
                            Register
                        </a>
                    </li>
                    <li v-if="!user" class="nav-item active">
                        <a class="nav-link" href="" @click.prevent="$router.push('/login')">
                            <i class="fa fa-sign-in fa-lg"></i>
                            Login
                        </a>
                    </li>
                    <li v-if="user" class="nav-item active">
                        <a class="nav-link" href=""  @click.prevent="logout">
                            <i class="fa fa-sign-out fa-lg"></i>
                            Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        props: ['user','logNotification'],
        methods: {
             logout() {

                localStorage.clear()
                this.$router.push('/')
                this.$emit('fetchUser', null)
                this.logNotification('Sayonaraaaa :)','secondary',3000)
            },
        }
    }
</script>

<style>

</style>