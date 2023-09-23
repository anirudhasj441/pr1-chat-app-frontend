<template>
    <q-layout view="hHh lpr fFf">
        <q-header>
            <q-toolbar>
                <q-toolbar-title>
                    Chat App
                </q-toolbar-title>
                <q-space></q-space>
                <q-btn flat round icon="search"></q-btn>
            </q-toolbar>
            <q-toolbar v-if="false" class="q-px-none">
                <q-space></q-space>
                <q-tabs class="full-width">
                    <q-tab name="messages" label="messages"></q-tab>
                    <q-tab name="groups" label="groups"></q-tab>
                    <q-tab name="calls" label="calls"></q-tab>
                </q-tabs>
                <q-space></q-space>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>
