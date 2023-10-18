<template>
    <q-page class="flex flex-center" :style-fn="pageStyleStore.setStyle">
        <NonLogedInView v-if="!this.userStore.getUserIsLogedIn" />
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
