<template>
    <main>
        <div class="absolute-top-right z-top bg-grey-3 search-component" :class="show ? 'show' : ''">
            <q-toolbar>
                <q-input dense standout="input-active" class="search-input full-width" v-model="text"
                    placeholder="Search or start new chat">
                    <template v-slot:prepend>
                        <q-btn flat dense round color="dark" icon="arrow_back" @click="$emit('searchHide')"></q-btn>
                    </template>
                </q-input>
            </q-toolbar>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.search-component {
    width: 0;
    opacity: 0;
    overflow-x: hidden;
    transition: width 0.5s ease-in-out, opacity 0.5s ease-in-out;

    &.show {
        width: 100%;
        opacity: 1;
    }
}
</style>
