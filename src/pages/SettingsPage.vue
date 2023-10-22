<template>
    <q-layout view="hHh lpr fFf">
        <q-header>
            <q-toolbar>
                <q-btn flat dense round icon="arrow_back_ios_new" @click="back"></q-btn>
                <q-toolbar-title>Settings</q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <q-page :style-fn="pageStyleStore.setStyle">
                <div class="fit row">
                    <div class="full-height menu-list drawer"
                        :class="$route.fullPath === '/settings' ? isMobile ? 'full-width' : 'col-3' : isMobile ? 'width-none' : 'col-3'">
                        <q-list>
                            <q-item clickable v-ripple exact-active-class="router-active text-dark" to="/settings/profile">
                                <q-item-section avatar>
                                    <q-icon :name="user.profile_pic ? 'img:/api/' + user.profile_pic : 'person'"
                                        class="avatar"> </q-icon>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>{{ user.first_name }} {{ user.last_name
                                    }}</q-item-label>
                                    <q-item-label caption>{{ user.username }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <q-item clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon name="key" round></q-icon>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>Account</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                    <div class="col-grow full-height">
                        <router-view />
                    </div>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { pageStyleStore, userStore } from 'src/stores/global-store';
export default {
    data() {
        return {
            userStore: userStore(),
            pageStyleStore: pageStyleStore()
        }
    },
    methods: {
        back: function () {
            if (this.$route.fullPath === '/settings') {
                this.$router.push('/');
                return;
            }
            if (this.isMobile) {
                this.$router.push('/settings');
                return;
            }
            this.$router.push('/');
        }
    },
    mounted() {
        // this.$router.beforeEach((to, from, next) => {
        //     if (to === '/') {
        //         return next();
        //     }
        if (this.$route.fullPath === '/settings') {
            if (!this.isMobile) {
                this.$router.push('/settings/profile')
            }
        }


        // })
    },
    computed: {
        isMobile() {
            return this.$q.screen.width < 1023;
        },
        user() {
            return this.userStore.getUser
        }
    }
}
</script>
