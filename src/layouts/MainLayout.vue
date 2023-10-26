<template>
    <q-layout view="hHh lpr fFf">
        <q-header v-if="userStore.getUserIsLogedIn">
            <div class="row no-wrap">
                <q-toolbar :class="isMobile ? 'full-width' : 'col-3'">
                    <q-btn dense flat round fab>
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
                    <q-btn flat round icon="search" @click="showSearch = true"></q-btn>
                    <search-input :show="showSearch" @searchHide="showSearch = false"></search-input>
                </q-toolbar>
            </div>
            <!-- <q-toolbar class="q-px-none">
                <q-space></q-space>
                <q-tabs class="full-width">
                    <q-tab name="messages" label="messages"></q-tab>
                    <q-tab name="groups" label="groups"></q-tab>
                    <q-tab name="calls" label="calls"></q-tab>
                </q-tabs>
                <q-space></q-space>
            </q-toolbar> -->
        </q-header>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { userStore } from 'stores/global-store';
import SearchInput from 'src/components/SearchInput.vue';
export default {
    components: {
        SearchInput
    },
    data() {
        return {
            userStore: userStore(),
            showSearch: false,
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
        },
        isMobile: function () {
            return this.$q.screen.width < 1023;
        }
    }
}
</script>
