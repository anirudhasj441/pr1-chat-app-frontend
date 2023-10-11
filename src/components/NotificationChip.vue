<template>
    <main>
        <q-chip v-if="showNotification">{{ message }}</q-chip>
    </main>
</template>

<script>

export default {
    data() {
        return {
            message: '',
            showNotification: false
        }
    },
    methods: {
        show: function (message) {
            this.message = message;
            this.showNotification = true;
            setTimeout(() => {
                this.showNotification = false;
                // return resolve();
            }, 2000)
        }
    }
}
</script>

<style scoped lang="scss">
.q-chip {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
}
</style>
