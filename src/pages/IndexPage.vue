<template>
    <q-page class="flex flex-center" :style-fn="pageStyleStore.setStyle">
        <NonLogedInView v-if="!this.userStore.getUserIsLogedIn" />
        <div class="fit row">
            <div class="full-height menu-list drawer col-auto"
                :class="$route.fullPath === '/settings' ? isMobile ? 'full-width' : 'col-3' : isMobile ? 'width-none' : 'col-3'">

            </div>
            <div class="col-grow bg-grey-4 full-height flex column">
                <div class="col-grow">

                </div>
                <div class="chat-input bg-white q-pa-md">
                    <div class="row items-center q-col-gutter-x-sm">
                        <div class="col-grow">
                            <q-input filled autogrow dense class="rounded-borders" placeholder="Type a message"></q-input>
                        </div>
                        <div class="send-button">
                            <q-btn flat round icon="send" class="q-px-sm"></q-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>
import { event } from 'quasar';
import NonLogedInView from 'src/components/NonLogedInView.vue';
import { pageStyleStore, userStore, serverStore } from 'src/stores/global-store';
export default {
    components: {
        NonLogedInView
    },
    data() {
        return {
            pageStyleStore: pageStyleStore(),
            userStore: userStore(),
            serverStore: serverStore()
        }
    },
    methods: {
        testWebSocket: function () {
            console.log("websocje test!!!!!!");
            let loc = window.location;
            console.log(window.location.host);
            console.log(window.location.pathname);
            let url = this.wsRoot + '/ws/test/';
            console.log(url);
            const socket = new WebSocket(url);

            socket.onopen = () => {
                console.log("socket Connected!!");
            }

            socket.onmessage = (event) => {
                console.log(event.data);
            }


        }
    },
    mounted() {
        this.testWebSocket();
    },
    computed: {
        isLogedIn() {
            return this.userStore.getUserIsLogedIn;
        },
        wsRoot() {
            return this.serverStore.getWsRoot;
        }
    },
    watch: {
        isLogedIn(value) {
            console.log("isLogedin:", value)
        }
    }
}
</script>

<style scoped lang="scss"></style>
