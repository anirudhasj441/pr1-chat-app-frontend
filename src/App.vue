<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { userStore, serverStore } from 'stores/global-store';

export default defineComponent({
    name: 'App',
    data() {
        return {
            userStore: userStore(),
            serverStore: serverStore()
        }
    },
    mounted() {
        this.userStore.verifyUser();
        this.serverStore.setWsRoot();
    }
})
</script>
