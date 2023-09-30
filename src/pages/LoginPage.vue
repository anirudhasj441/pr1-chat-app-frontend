<template>
    <q-layout view="hHh lPp fFf">
        <q-header>
            <q-toolbar>
                <q-btn flat dense round icon="arrow_back_ios_new" @click="$router.push('/')"></q-btn>
                <q-toolbar-title>Login</q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-page-container>
            <q-page :style-fn="pageStyleStore.setStyle">
                <ApiAlert v-if="showAlert" :message="message" :status="status" @close="showAlert = false" />
                <div class="flex fit q-pa-lg">
                    <q-space></q-space>
                    <div class="form-container fit flex column" style="max-width: 500px;">
                        <div class="inputs-container">
                            <q-input v-model="username" label="Username"></q-input>
                            <q-input v-model="password" label="Password"></q-input>
                        </div>
                        <div class="">
                            <q-btn rounded :loading="loading" :disable="username.trim() === '' || password.trim() === ''"
                                color="primary" class="full-width" label="Sign In" @click="login">
                            </q-btn>
                        </div>
                    </div>
                    <q-space></q-space>
                </div>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script>
import { pageStyleStore, userStore } from 'stores/global-store';
import ApiAlert from 'src/components/ApiAlert.vue';
export default {
    components: {
        ApiAlert
    },
    data() {
        return {
            username: '',
            password: '',
            status: 'success',
            message: '',
            showAlert: false,
            loading: false,
            userStore: userStore(),
            pageStyleStore: pageStyleStore()
        }
    },
    methods: {
        login: function () {
            this.userStore.logInUser(this.username, this.password).then((message) => {
                this.$router.push('/');
            }).catch((message) => {
                this.message = 'Invali Credentials!';
                this.status = 'failed';
                this.showAlert = true;
            })
        }
    },
    mounted() {
        if (this.userStore.getUserIsLogedIn) {
            this.$router.push('/');
        }
    }
}
</script>

<style scoped lang="scss">
.inputs-container {
    flex-grow: 1;
}
</style>
