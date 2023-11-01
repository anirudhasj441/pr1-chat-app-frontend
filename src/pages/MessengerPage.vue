<template>
    <main class="fit bg-grey flex">
        <div class="fit flex column">
            <q-toolbar class="q-header" :class="!isMobile ? 'desktop-header' : ''">
                <q-btn v-if="isMobile" flat dense round icon="arrow_back_ios_new" @click="$router.push('/')"></q-btn>
                <q-avatar icon="person" class="avatar"></q-avatar>
                <q-toolbar-title>devil</q-toolbar-title>
                <q-space></q-space>
            </q-toolbar>
            <!-- <q-header v-if="isMobile">
            </q-header> -->
            <div class="col-grow">

            </div>
            <div class="chat-input bg-white q-pa-md col-auto">
                <div class="row items-center q-col-gutter-x-sm full-height">
                    <div class="col-grow">
                        <q-input filled autogrow dense class="rounded-borders" placeholder="Type a message"
                            standout="input-active"></q-input>
                    </div>
                    <div class="send-button">
                        <q-btn flat round icon="send" class="q-px-sm"></q-btn>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        isMobile() {
            return this.$q.screen.width < 1023;
        }
    }
}
</script>
<style lang="scss" scoped>
.desktop-header {
    transform: translateY(-100%);
}
</style>
