<template>
    <q-page class="flex flex-center" :style-fn="pageStyleStore.setStyle">
        <NonLogedInView v-if="!this.userStore.getUserIsLogedIn" />
        <div class="fit row">
            <div class="full-height menu-list drawer relative-position"
                :class="$route.fullPath === '/' ? isMobile ? 'full-width' : 'col-3' : isMobile ? 'width-none' : 'col-3'">
                <div class="flex column fit">
                    <!-- Messenger toolbar tabs -->
                    <q-toolbar class="q-pa-none q-header">
                        <q-tabs class="full-width ">
                            <q-tab name="messages" label="messages"></q-tab>
                            <q-tab name="groups" label="groups"></q-tab>
                            <q-tab name="calls" label="calls"></q-tab>
                        </q-tabs>
                    </q-toolbar>

                    <div class="col-grow">
                        <q-scroll-area class="fit">
                            <q-list>
                                <q-item clickable v-ripple exact-active-class="router-active text-dark" to="/messenger">
                                    <q-item-section avatar>
                                        <q-icon name="person"></q-icon>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>Devil</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-scroll-area>
                    </div>
                    <div class="absolute" style="bottom: 20px; right: 20px;">
                        <q-btn icon="chat" size="sm" color="dark" style="border-radius: 10px; aspect-ratio: 1;"></q-btn>
                    </div>
                </div>


            </div>
            <div class="col-grow full-height">
                <router-view />
            </div>
        </div>
    </q-page>
</template>

<script>
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
        },
        isMobile() {
            return this.$q.screen.width < 1023;
        },
    },
    watch: {
        isLogedIn(value) {
            console.log("isLogedin:", value)
        }
    }
}
</script>

<style scoped lang="scss"></style>
