<template>
    <main class="fit">
        <q-scroll-area class="fit">
            <div class="container fit q-pt-md">
                <div class="profile-pic text-center">
                    <q-img src="~assets/person-fill.svg" :ratio="1" width="200" class="round"></q-img>
                    <q-btn icon="photo_camera" round color="primary" size="lg"></q-btn>
                </div>
                <div class="name q-mt-lg flex justify-center">
                    <q-list style="width: 500px; max-width: 100vw;">
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="person"></q-icon>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label caption>Name</q-item-label>
                                <q-item-label>{{ user.first_name }} {{ user.last_name }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                                <q-icon name="edit"></q-icon>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon name="phone"></q-icon>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label caption>Phone</q-item-label>
                                <q-item-label>{{ user.phone_number }}</q-item-label>
                            </q-item-section>
                            <q-item-section side top>
                                <q-icon name="edit"></q-icon>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
            </div>
        </q-scroll-area>
    </main>
</template>

<script>
import { userStore } from 'src/stores/global-store';

export default {
    data() {
        return {
            userStore: userStore()
        }
    },
    methods: {

    },
    mounted() {

    },
    computed: {
        user() {
            return this.userStore.getUser;
        },
        profile_pic() {
            return this.user.profile_pic;
        }
    }

}

</script>
