<template>
    <q-page class="flex flex-center" :style-fn="pageStyleStore.setStyle">
        <NonLogedInView v-if="!this.userStore.getUserIsLogedIn" />
    </q-page>
</template>

<script>
import NonLogedInView from 'src/components/NonLogedInView.vue';
import { pageStyleStore, userStore } from 'src/stores/global-store';
export default {
    components: {
        NonLogedInView
    },
    data() {
        return {
            pageStyleStore: pageStyleStore(),
            userStore: userStore()
        }
    },
    methods: {

    },
    mounted() {

    },
    computed: {
        isLogedIn() {
            return this.userStore.getUserIsLogedIn;
        }
    },
    watch: {
        isLogedIn(value) {
            console.log("isLogedin:", value)
        }
    }
}
</script>
