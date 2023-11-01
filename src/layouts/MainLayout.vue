<template>
    <q-layout view="hHh lpr fFf">
        <q-header v-if="showHeader">
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
            showHeader: true,
            showSearch: false,
            messagePage: false
        }
    },
    methods: {
        setShowHeader: function (isMessagePage) {
            if (!this.userStore.getUserIsLogedIn) {
                this.showHeader = false;
                return;
            }
            if (!isMessagePage) {
                this.showHeader = this.userStore.getUserIsLogedIn;
                return;
            }
            this.showHeader = !this.isMobile;
        }
    },
    mounted() {
        // this.userStore.verifyUser();

        this.messagePage = this.$route.fullPath.startsWith('/messenger');
        this.setShowHeader(this.messagePage);
        this.$router.beforeEach((to, from) => {
            this.showSearch = false;
            this.messagePage = to.fullPath.startsWith('/messenger');
            // if (to.fullPath.startsWith('/messenger')) {
            //     this.messagePage = true;
            // }
            // else {
            //     this.messagePage = false
            // }
        })
    },
    computed: {
        user: function () {
            return this.userStore.getUser;
        },
        isMobile: function () {
            return this.$q.screen.width < 1023;
        },
        // showHeader() {
        //     if (this.isMobile) {
        //         console.log("path", this.$router.fullPath);
        //         console.log("cond1: ", this.$router.fullPath == '/');
        //         console.log("cond2: ", this.userStore.getUserIsLogedIn)
        //         return this.$router.fullPath == '/' && this.userStore.getUserIsLogedIn;
        //     }
        //     return this.userStore.getUserIsLogedIn;
        // },

    },
    watch: {
        messagePage(value) {
            console.log("value: ", value)
            this.setShowHeader(value);
        },
        isMobile(value) {
            this.setShowHeader(value && this.messagePage);
        }
    }
}
</script>
