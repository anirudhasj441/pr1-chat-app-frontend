<template>
    <div class="fit">
        <div class="fit flex">
            <q-space></q-space>
            <div class="fit flex column q-pa-lg" style="max-width: 500px;">
                <div class="logo" style="flex-grow: 1"></div>
                <div class="links flex column q-gutter-y-sm">
                    <q-btn rounded color="primary" class="full-width" label="Sign Up"
                        @click="$router.push('/create_account')"></q-btn>
                    <div class="text-center">Already have an account? <router-link to="/login">Log in</router-link></div>
                </div>
            </div>
            <q-space></q-space>
        </div>
    </div>
</template>

<script>
import { pageStyleStore } from 'src/stores/global-store';
export default {
    data() {
        return {
            pageStyleStore: pageStyleStore()
        }
    }
}
</script>

<style scoped lang="scss">
.links {
    a {
        color: $primary;
        text-decoration: none;
    }
}
</style>
