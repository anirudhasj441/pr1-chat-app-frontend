<template>
    <main class="fit bg-grey">
        <div class="fit flex column">
            <div class="col-grow">

            </div>
            <div class="chat-input bg-white q-pa-md col-auto">
                <div class="row items-center q-col-gutter-x-sm full-height">
                    <div class="col-grow">
                        <q-input filled autogrow dense class="rounded-borders" placeholder="Type a message"
                            standout="input-active"></q-input>
                    </div>
                    <div class="send-button">
                        <q-btn flat round icon="send" class="q-px-sm"></q-btn>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {

        }
    }
}
</script>
