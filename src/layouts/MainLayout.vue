<template>
    <q-layout view="hHh lpr fFf">
        <q-header v-if="userStore.getUserIsLogedIn">
            <q-toolbar>
                <q-btn dense flat round fab @click="$router.push('/')">
                    <q-avatar :icon="user.profile_pic ? 'img:/api/' + user.profile_pic : 'person'"
                        class="avatar fit"></q-avatar>
                    <!-- <q-menu>
                        <q-list flat>
                            <q-item clickable v-ripple dense unelivated>
                                <q-item-section>
                                    Log Out
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu> -->

                    <q-menu>
                        <q-list style="min-width: 200px">
                            <q-item clickable v-ripple @click="$router.push('/settings')">
                                <q-item-section avatar>
                                    <q-icon :name="user.profile_pic ? 'img:/api/' + user.profile_pic : 'person'"
                                        class="avatar"></q-icon>
                                </q-item-section>
                                <q-item-section>{{ user.username }}</q-item-section>
                            </q-item>
                            <q-item clickable @click="userStore.logOutUser">
                                <q-item-section avatar>
                                    <q-icon name="logout"></q-icon>
                                </q-item-section>
                                <q-item-section>Log Out</q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
                <q-toolbar-title>
                    Chat App
                </q-toolbar-title>
                <q-space></q-space>
                <q-btn flat round icon="search"></q-btn>
            </q-toolbar>
            <q-toolbar class="q-px-none">
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
import { userStore } from 'stores/global-store';
export default {
    data() {
        return {
            userStore: userStore()
        }
    },
    methods: {

    },
    mounted() {
        // this.userStore.verifyUser();
    },
    computed: {
        user: function () {
            return this.userStore.getUser;
        }
    }
}
</script>
