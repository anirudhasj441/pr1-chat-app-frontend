<template>
    <main class="fit">
        <q-scroll-area class="fit">
            <div class="container fit q-pt-md">
                <div class="profile-pic text-center">
                    <Lightgallery :settings="{ speed: 500, plugins: plugins }">
                        <a :href="user.profile_pic ? '/api/' + user.profile_pic : '/src/assets/person-fill.svg'">
                            <q-img :src="user.profile_pic ? '/api/' + user.profile_pic : '/src/assets/person-fill.svg'"
                                :ratio="1" width="200" class="round"></q-img>
                        </a>
                    </Lightgallery>
                    <q-btn icon="photo_camera" round color="primary" size="lg" @click="uploadProfilePic = true"></q-btn>
                </div>
                <div class="name q-mt-lg flex justify-center">
                    <q-list style="width: 500px; max-width: 100vw;">
                        <q-item clickable v-ripple @click="editName = true">
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
                        <q-item clickable v-ripple @click="editAbout = true">
                            <q-item-section avatar>
                                <q-icon name="sym_o_info"></q-icon>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label caption>About</q-item-label>
                                <q-item-label>{{ user.about }}</q-item-label>
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
                            <!-- <q-item-section side top>
                                <q-icon name="edit"></q-icon>
                            </q-item-section> -->
                        </q-item>
                    </q-list>
                </div>
            </div>
        </q-scroll-area>
        <q-dialog v-model="editName">
            <q-card>
                <!-- <q-card-section>
                </q-card-section> -->
                <q-card-section>
                    <div class="text-h6">Enter your name</div>
                    <q-input v-model="firstName" label="First Name"></q-input>
                    <q-input v-model="lastName" label="Last Name"></q-input>
                </q-card-section>
                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Save" v-close-popup @click="upadteName" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="editAbout">
            <q-card>
                <!-- <q-card-section>
                </q-card-section> -->
                <q-card-section>
                    <div class="text-h6">Add About</div>
                    <q-input v-model="about" label="About"></q-input>
                </q-card-section>
                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Save" v-close-popup @click="updateAbout" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="uploadProfilePic">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Upload Profile Pic</div>
                    <q-uploader ref="profilePicUploader" url="/api/user/update" :headers="uploaderHeader" method="PATCH"
                        flat style="width: 100%;" field-name="profile_pic" @added="onProfilePicAdded"
                        @uploaded="onProfilePicUploaded" @removed="onProfilePicRemoved">

                    </q-uploader>
                </q-card-section>
                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <!-- <q-btn flat label="Next" v-close-popup /> -->
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="cropProfilePic">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Crop Profile Pic</div>
                    <VueCropper ref="cropper" :src="profilePicUrl" :aspect-ratio="1"></VueCropper>
                </q-card-section>
                <q-card-actions align="right" class="text-primary">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Done" v-close-popup @click="profilePicUpload" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <Lightgallery :settings="{ speed: 500, plugins: plugins }">
            <!-- <a :href="user.profile_pic ? '/api/' + user.profile_pic : '/src/assets/person-fill.svg'">
                <q-img :src="user.profile_pic ? '/api/' + user.profile_pic : '/src/assets/person-fill.svg'"
                    :ratio="1"></q-img>
            </a> -->
        </Lightgallery>
        <NotificationChip ref="noti"></NotificationChip>
    </main>
</template>

<script>
import { userStore } from 'src/stores/global-store';
import VueCropper from 'vue-cropperjs';
import Lightgallery from 'lightgallery/vue';
import lgZoom from 'lightgallery/plugins/zoom';
import 'cropperjs/dist/cropper.css';
import styles from 'lightgallery/scss/lightgallery.scss';
import NotificationChip from 'src/components/NotificationChip.vue';
export default {
    components: {
        VueCropper,
        Lightgallery,
        NotificationChip
    },
    data() {
        return {
            firstName: '',
            lastName: '',
            about: '',
            editName: false,
            editAbout: false,
            uploadProfilePic: false,
            cropProfilePic: false,
            showImage: false,
            showNotification: true,
            profilePicUrl: '',
            profiePic: '',
            plugins: [lgZoom],
            uploaderHeader: [{ name: 'Authorization', value: 'Bearer ' + localStorage.getItem('token') }],
            userStore: userStore()
        }
    },
    methods: {
        upadteName: function () {
            let data = {
                first_name: this.firstName,
                last_name: this.lastName
            }
            let url = '/api/user/update';
            const xhr = new XMLHttpRequest();
            xhr.open('PATCH', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xhr.onload = () => {
                let response = JSON.parse(xhr.response)
                console.log(response);
                if (xhr.status !== 200) {
                    console.log(response.error);
                    return;
                }
                this.userStore.$state = { user: response.user }
                this.$refs.noti.show("Name updated");
            }
            xhr.send(JSON.stringify(data))
        },
        updateAbout: function () {
            let data = {
                about: this.about
            }
            let url = '/api/user/update';
            const xhr = new XMLHttpRequest();
            xhr.open('PATCH', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            xhr.onload = () => {
                let response = JSON.parse(xhr.response)
                console.log(response);
                if (xhr.status !== 200) {
                    console.log(response.error);
                    return;
                }
                this.userStore.$state = { user: response.user };
                this.$refs.noti.show("About updated");
            }
            xhr.send(JSON.stringify(data));
        },
        onProfilePicAdded: async function (files) {
            console.log(files[0]);
            this.profiePic = files[0];
            this.profilePicUrl = URL.createObjectURL(files[0]);
            this.uploadProfilePic = false;
            this.cropProfilePic = true;

            // this.$refs.profilePicUploader.upload();

            // let data = {
            //     profile_pic: files[0]
            // }
            // let url = '/api/user/update';
            // const xhr = new XMLHttpRequest();
            // xhr.open('PATCH', url);
            // xhr.setRequestHeader('Content-Type', 'application/json');
            // xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
            // xhr.onload = () => {
            //     let response = JSON.parse(xhr.response);
            //     console.log(response);
            // }
            // xhr.send(JSON.stringify(data))


            // await new Promise((resolve) => {
            //     setInterval(() => {
            //         if (this.$refs.imgCropper) resolve();
            //     })
            // })

        },
        onProfilePicRemoved: function (files) {
            this.profilePicUrl = '';
            this.profiePic = '';
        },
        profilePicUpload: function () {
            let canvas = this.$refs.cropper.getCroppedCanvas();
            // canvas = this.getRoundedCanvas(canvas);
            canvas.toBlob((blob) => {
                const fd = new FormData();
                let filename = this.profiePic.name;
                console.log(filename);
                fd.append('profile_pic', new File([blob], filename));
                let url = '/api/user/update';
                const xhr = new XMLHttpRequest();
                xhr.open('PATCH', url);
                // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
                xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('token'));
                xhr.onload = () => {
                    let response = JSON.parse(xhr.response);
                    console.log(response);
                    if (xhr.status !== 200) {
                        console.log(response.error);
                        return;
                    }
                    this.userStore.$state = { user: response.user };
                    this.$refs.noti.show("Profile pic Updated");
                }
                xhr.send(fd);
                // let data = {
                //     profile_pic: new File([blob], 'profile_pic')
                // }
            })
            // console.log(this.$refs.cropper.getCroppedCanvas().toBlob());
        },
        getRoundedCanvas: function (sourceCanvas) {
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            var width = sourceCanvas.width;
            var height = sourceCanvas.height;

            canvas.width = width;
            canvas.height = height;
            context.imageSmoothingEnabled = true;
            context.drawImage(sourceCanvas, 0, 0, width, height);
            context.globalCompositeOperation = 'destination-in';
            context.beginPath();
            context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
            context.fill();
            return canvas;
        },
        onProfilePicUploaded: function (info) {
            console.log(info);
            let xhr = info.xhr;
            console.log(xhr.response);
        },
        showImg: function () {

        }
    },
    mounted() {
        this.firstName = this.user.first_name;
        this.lastName = this.user.last_name;
        this.about = this.user.about;
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

<style scoped lang="css">
.q-uploader__file--img {
    background-size: contain !important;
}
</style>
