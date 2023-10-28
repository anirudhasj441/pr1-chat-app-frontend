<template>
    <main>
        <div class="absolute-top-right z-top bg-grey-3 search-component" :class="show ? 'show' : ''">
            <q-toolbar>
                <q-input dense v-model="s" standout="input-active" class="search-input full-width"
                    placeholder="Search or start new chat" @update:model-value="search">
                    <template v-slot:prepend>
                        <q-btn flat dense round color="dark" icon="arrow_back" @click="$emit('searchHide')"></q-btn>
                    </template>
                    <template v-if="s.length > 0" v-slot:append>
                        <q-btn flat dense round color="dark" icon="close" @click="clear"></q-btn>
                    </template>
                </q-input>
            </q-toolbar>
        </div>
    </main>
</template>

<script>
import { searchStore } from 'src/stores/global-store';

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            s: '',
            searchStore: searchStore()
        }
    },
    methods: {
        search: function (value) {
            if (value.length <= 3) {
                this.searchStore.setResult([]);
                return;
            }
            let data = {
                s: value
            }
            let url = '/api/search/';
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xhr.onload = () => {
                let response = JSON.parse(xhr.response);
                console.log(response);
                this.searchStore.setResult(response);
            }
            xhr.send(JSON.stringify(data));
        },
        clear: function () {
            this.s = '';
            this.searchStore.setResult([]);
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
