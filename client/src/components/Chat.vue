<template>
    <section class="chat bg-light">
        <div class="chatdisplay pt-2 bg-light text-dark" id="chatdisplay">
            <div class="chatitem px-2 mb-2 " v-for="chat in chats" :key="chat.id">
                <small>{{chat.user}}</small>
                <small>: <b> {{chat.chatinput}} </b> </small>
                <small class="justify-self: end !important;">{{chat.createdAt}}</small>
            </div>
        </div>
        <div class="chatinput mt-0 mb-2">
            <span v-if="!user"> please login to join chat </span>
            <div v-if="user"  class="input-group">
                <input type="text" id="chatinput" v-model="chatinput" @keyup.enter="submitChat" placeholder="Type chat ..." class="form-control">
            </div>
        </div>
    </section>
</template>

<script>
import db from '../assets/config'
import moment from 'moment'
import $ from 'jquery'

export default {
    name: 'chat',
    props: ['user'],
    created() {
        this.getChats()
    },
    mounted() {
        $(document).ready(function () {
            $("#chatdisplay").scrollTop(function () {
                return this.scrollHeight;
            });

            $('.chat').mouseleave(function () {
                $("#chatdisplay").hide("fast")
            });

            $('.chat').mouseenter(function () {
                $("#chatdisplay").show("fast")
                $('#chatinput').focus()
            });
        });
    },
    data() {
        return {
            chats: [],
            chatinput : ''
        }
    },
    methods: {

        getChats() {
            db.ref('/globalChat').on('value', snapshot => {
                if (snapshot.val()) {
                    this.chats = Object.values(snapshot.val())
                }
            })
        },

        submitChat() {
            // if(this.chatinput.trim() != '') {
                db.ref(`/globalChat/`).push({
                    user: this.user.name.slice(0,10),
                    chatinput: this.chatinput,
                    createdAt: moment(new Date()).format('DD-MMM-YY hh:mm')
                })

                $(document).ready(function () {
                    $("#chatdisplay").scrollTop(function () {
                        return this.scrollHeight;
                    });
                });

    
                this.chatinput = ''
            // }

        }
    }
}
</script>

<style scoped>
    .chat {
        display: grid;
        position: fixed;
        bottom: 0px;
        right: 2%;
        z-index: 100;
        max-width: 500px;
        background-color: rgb(255, 255, 255);
        padding: 10px 10px 0 10px;
        max-height: 400px;
        border-radius: 7px 7px 0 0;
        box-shadow: 0 0 5px 1px rgb(202, 202, 202);
    }

    .chatdisplay {
        max-height: 300px;
        display: none;
        margin-bottom: 15px;
        overflow: auto;
    }

    .chatitem {
        display: grid;
        grid-template-columns: 1fr 5fr 90px;
        text-align: left;
        grid-gap: 10px;
    }

    ::-webkit-scrollbar {
        display: none;
    }
</style>