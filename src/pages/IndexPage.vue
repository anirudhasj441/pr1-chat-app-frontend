<template>
    <q-page class="flex flex-center" :style-fn="pageStyleStore.setStyle">
        <NonLogedInView v-if="!this.userStore.getUserIsLogedIn" />
        <div class="fit row">
            <div class="full-height menu-list drawer relative-position"
                :class="$route.fullPath === '/' ? isMobile ? 'full-width' : 'col-3' : isMobile ? 'width-none' : 'col-3'">
                <div class="flex column fit">
                    <!-- Messenger toolbar tabs -->
                    <!-- <q-toolbar class="q-pa-none q-header"> -->
                    <q-tabs class="full-width bg-grey-3">
                        <q-tab name="messages" label="messages"></q-tab>
                        <q-tab name="groups" label="groups"></q-tab>
                        <q-tab name="calls" label="calls"></q-tab>
                    </q-tabs>
                    <!-- </q-toolbar> -->

                    <div class="col-grow">
                        <q-scroll-area class="fit">
                            <q-list v-if="showResult">
                                <q-item v-if="result.length < 1">
                                    <q-item-section>
                                        <q-item-label class="text-center">No result Found</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item v-for="user in result" v-bind:key="user.username" clickable v-ripple
                                    exact-active-class="router-active text-dark">
                                    <q-item-section avatar>
                                        <Lightgallery :settings="{ speed: 500, plugins: plugins }">
                                            <a class="text-dark"
                                                :href="user.profile_pic ? '/api/' + user.profile_pic : '/src/assets/person-fill.svg'">
                                                <q-icon size="md"
                                                    :name="user.profile_pic == null ? 'person' : 'img:/api/' + user.profile_pic"
                                                    class="round"></q-icon>
                                            </a>
                                        </Lightgallery>
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label>{{ user.username }}</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                            <q-list v-else>
                                <q-item clickable v-ripple exact-active-class="router-active text-dark" to="/messenger">
                                    <q-item-section avatar>
                                        <Lightgallery :settings="{ speed: 500, plugins: plugins }">
                                            <a href="/src/assets/person-fill.svg" class="text-dark q-pa-none">
                                                <q-icon size="md" name="person"></q-icon>
                                            </a>
                                        </Lightgallery>
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
import Lightgallery from 'lightgallery/vue';
import lgZoom from 'lightgallery/plugins/zoom';
import styles from 'lightgallery/scss/lightgallery.scss';
import { pageStyleStore, userStore, serverStore, searchStore } from 'src/stores/global-store';
export default {
    components: {
        NonLogedInView,
        Lightgallery
    },
    data() {
        return {
            showSearchResult: false,
            plugins: [lgZoom],
            pageStyleStore: pageStyleStore(),
            userStore: userStore(),
            serverStore: serverStore(),
            searchStore: searchStore()
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
        result() {
            return this.searchStore.getResult;
        },
        showResult() {
            return this.searchStore.getShowResult;
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
