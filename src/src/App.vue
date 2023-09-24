<template>
    <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { userStore } from 'stores/global-store';

export default defineComponent({
    name: 'App',
    data() {
        return {
            userStore: userStore()
        }
    },
    mounted() {
        this.userStore.verifyUser();
    }
})
</script>
