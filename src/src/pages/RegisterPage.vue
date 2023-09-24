<template>
    <q-layout view="hHh lpr fFf">
        <q-header>
            <q-toolbar>
                <q-btn v-if="step > 1" flat dense round icon="arrow_back_ios_new" @click="step -= 1"></q-btn>
                <q-btn v-else flat dense round icon="arrow_back_ios_new" @click="$router.push('/')"></q-btn>
                <!-- <q-space></q-space> -->
                <q-toolbar-title>Create account</q-toolbar-title>
                <!-- <q-space></q-space> -->
            </q-toolbar>
        </q-header>
        <q-page-container>
            <q-page :style-fn="pageStyleStore.setStyle">
                <div class="flex fit">
                    <q-space></q-space>
                    <q-stepper v-model="step" ref="stepper" animated flat contracted class="fit flex column"
                        style="max-width: 500px;">
                        <q-step :name="1">
                            <q-input v-model="firstName" label="First Name" />
                            <q-input v-model="lastName" label="First Name" />
                        </q-step>
                        <q-step :name="2">
                            <q-input v-model="birthDate" mask="date" :rules="['date']" label="Birthdate">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                            <q-date v-model="birthDate">
                                                <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </q-step>
                        <q-step :name="3">
                            <q-input v-model="userName" label="User Name" />
                        </q-step>
                        <q-step :name="4">
                            <q-input v-model="password" label="Password"></q-input>
                        </q-step>
                        <template v-slot:navigation>
                            <q-stepper-navigation>
                                <q-btn @click="$refs.stepper.next()" rounded color="primary" class="full-width"
                                    :label="step === 4 ? 'Create' : 'Continue'" />
                                <!-- <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back"
                            class="q-ml-sm" /> -->
                            </q-stepper-navigation>
                        </template>
                    </q-stepper>
                    <q-space></q-space>
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
            step: 1,
            firstName: '',
            lastName: '',
            birthDate: '',
            userName: '',
            password: '',
            userStore: userStore(),
            pageStyleStore: pageStyleStore(),
        }
    },
    mounted() {
        if (this.userStore.getUserIsLogedIn) {
            this.$router.push('/');
        }
    }
}
</script>

<style lang="scss">
.q-stepper__content {
    flex-grow: 1;
}

// .q-stepper__nav {
//     position: absolute;
//     bottom: 0;
//     width: 100%;
// }
</style>
