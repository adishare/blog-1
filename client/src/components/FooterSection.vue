<template>
    <footer class="footer1">
        <div class="footer">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="footer-desc text-center">
                            <p>
                                <a href="" rel="home" title="Super Dev Resources">H8ike</a> is a popular online
                                Blogging, Store and Community for<br>awesome bike .
                            </p>
                        </div>
                        <hr>
                    </div>
                    <div class="col">
                        <form>
                            <div class="form-group text-light" style="max-width: 80%; margin: 0 auto;">
                                <label for="subscription">Subscribe H8ike Blog Post</label>
                                <input v-model="subscribeEmailInput" type="email" class="form-control" @keyup.prevent=""
                                    name="subscription" id="subscriptionEmail" autocomplete="email" placeholder="Your@Email.com">
                                <br>
                                <button type="submit" class="btn btn-dark pull-right btn-dark-outline" @click.prevent="subscribe">Subscibe</button>
                            </div>
                        </form>
                    </div>
                    <div class="col">
                        <ul class="social">
                            <li><a href="#" @click.prevent="openFacebook"><i class="fa fa-facebook"></i></a></li>
                            <li><a href="#" @click.prevent="openTwitter"><i class="fa fa-twitter"></i></a></li>
                            <li><a href="#" @click.prevent="openGplus"><i class="fa fa-google-plus"></i></a></li>
                            <li><a href="#" @click.prevent="openPinterest"><i class="fa fa-pinterest"></i></a></li>
                            <li><a href="#" @click.prevent="openLinkedin"><i class="fa fa-linkedin"></i></a></li>
                        </ul>

                    </div>


                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container">
                <div class="text-center"> Copyright © <a>Fathul Q.</a>All right reserved.</div>

            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        props: ['user','logNotification'],
        data () {
            return {
                subscribeEmailInput : '',

                url : this.$clientBaseUrl,
                title : 'H8ike Blog',
                source : this.$clientBaseUrl,
                media : '',
                twit : 'Amazing Blog visit h8ikeblogid'
            }
        },
        methods: {
            subscribe() {

                this.$server.post('/subscribes',{
                    user : this.user ? this.user : undefined,
                    email : this.subscribeEmailInput
                })
                .then((result) => {
                    this.logNotification(result.data.message, 'success', 4000)
                }).catch((err) => {
                    this.logNotification(err.response, 'danger', 4000)                    
                });

            },

            openFacebook() {
                window.open(`https://www.facebook.com/share.php?u=${this.url}&title=${this.title}`, 'popup', 'width=600,height=600')
            },
            openTwitter() {
                window.open(`https://twitter.com/intent/tweet?url=${this.url}&text=${this.twit}&hashtags=h8ikeblogid`,'popup','width=600,height=600')
            },
            openGplus() {
                window.open(`https://plus.google.com/share?url=${this.url}`, 'popup', 'width=600,height=600')
            },
            openLinkedin() {
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${this.url}&title=${this.title}&source=${this.url}`, 'popup', 'width=600,height=600')
            },
            openPinterest() {
                window.open(`https://pinterest.com/pin/create/bookmarklet/?url=${this.url}&is_video=false&description==${this.title}`, 'popup', 'width=600,height=600')
            }
        }
    }
</script>

<style scoped>
/* footer */
.footer1 a {
    color: #DDD;
}

.footer1 a:hover,
.footer1 a:focus,
.footer1 a:active {
    color: #FFF;
}

.footer1 .footer {
    background-color: rgba(0, 0, 0, 0.821);
    padding: 35px 0;
    margin-top: 5em;
}

.footer1 .footer .footer-desc p {
    color: #DDD;
    margin: 15px 0 8px;
}

.footer1 .footer .social {
    margin: 0 auto;
    display: table;
    list-style-type: none;
}

.footer1 .footer .social li {
    float: left;
}

.footer1 .footer .social li a {
    display: block;
    font-size: 1em;
    color: #DDD;
    width: 30px;
    height: 30px;
    line-height: 32px;
    text-align: center;
    background-color: #222728;
    border-radius: 2px;
    margin: 15px 4px
}

.footer1 .footer .social li a:hover {
    background-color: #3A4144;
}

.footer1 .footer .input-group {
    margin: 15px 0;
}

.footer1 .footer .form-control {
    border-radius: 2px 0 0 2px;
    background-color: #585C5D;
    border-color: #585C5D;
    color: #DDD;
    font-size: 15px;
}

.footer1 .footer .form-control:hover,
.footer1 .footer .form-control:focus {
    border: 1px solid #222728;
    background-color: #222728;
}

.footer1 .footer .input-group-addon {
    border-radius: 0 2px 2px 0;
    background-color: #F7931D;
    color: #FFF;
    border-color: #F7931D;
    font-size: 15px;
}

.footer1 .footer-bottom {
    background-color: #222728;
    padding: 15px 0;
    color: #DDD;
    font-size: 13px;
}

.footer1 .footer-bottom ul li {
    display: inline-block;
}

.footer1 .footer-bottom ul li a {
    display: block;
    padding-left: 8px;
}

.footer1 .footer-bottom ul li a:after {
    content: "-";
    padding-left: 8px;
}

.footer1 .footer-bottom ul li:last-child a:after {
    content: "";
}

@media (max-width: 550px) {

    .footer1 .footer-bottom .pull-left,
    .footer1 .footer-bottom .pull-right {
        float: none !important;
        width: 100%;
        padding: 10px;
        text-align: center;
    }
}

</style>