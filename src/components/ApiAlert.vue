<template>
    <q-banner rounded inline-actions class="text-white z-top" :class="status === 'success' ? 'bg-positive' : 'bg-negative'">
        {{ message }}
        <template v-slot:action>
            <q-btn flat round icon="close" @click="$emit('close')"></q-btn>
        </template>
    </q-banner>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "success"
        }
    }
}
</script>

<style scoped lang="scss">
.q-banner {
    width: 100%;
    max-width: 500px;
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
}
</style>
