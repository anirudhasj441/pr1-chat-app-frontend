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
                <ApiAlert v-if="showAlert" :message="message" :status="status" @close="showAlert = false" />
                <div class="flex fit">
                    <q-space></q-space>
                    <q-stepper v-model="step" ref="stepper" animated flat contracted done-icon="check" done-color="positive"
                        inactive-icon="edit" class="fit flex column" style="max-width: 500px;">
                        <q-step :name="1" :done="doneSteps[1]" title="name input">
                            <q-input v-model="firstName" ref="firstname_input" label="First Name"
                                :rules="validationRules" />
                            <q-input v-model="lastName" ref="lastname_input" label="Last Name" :rules="validationRules" />
                        </q-step>
                        <q-step :name="2" :done="doneSteps[2]" type="email" title="email input">
                            <q-input v-model="email" ref="email_input" label="Email" :rules="emailValidationRules"
                                lazy-rules="ondemand" @blur="$refs.email_input.validate()" />
                        </q-step>
                        <q-step :name="3" :done="doneSteps[3]" title="phone number input">
                            <q-input v-model="phone_number" mask="##########" ref="phone_number_input" label="Phone Number"
                                :maxlength="10" :rules="[validatePhoneNumber]" lazy-rules="ondemand"
                                @blur="$refs.phone_number_input.validate()" />
                        </q-step>
                        <q-step :name="4" :done="doneSteps[4]" title="birthdate input">
                            <q-input v-model="birthDate" ref="birthdate_input" mask="date"
                                :rules="['date', validateBirthdate]" lazy-rules="ondemand" label="Birthdate"
                                @blur="$refs.birthdate_input.validate()">
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
                        <q-step :name="5" :done="doneSteps[5]" title="username input">
                            <q-input v-model="userName" ref="username_input" label="User Name" :rules="[validateUsername]"
                                lazy-rules="ondemand" @blur="$refs.username_input.validate()" />
                        </q-step>
                        <q-step :name="6" :done="doneSteps[6]" title="password input">
                            <q-input v-model="password" ref="password_input" :type="showPassword ? 'text' : 'password'"
                                label="Password" :rules="validationRules">
                                <template v-slot:append>
                                    <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" class="cursor-pointer"
                                        @click="showPassword = !showPassword" />
                                </template>
                            </q-input>
                        </q-step>
                        <template v-slot:navigation>
                            <q-stepper-navigation>
                                <q-btn v-if="step !== 6" @click="nextStep" rounded color="primary" class="full-width"
                                    label="Continue" />
                                <q-btn v-else rounded color="primary" class="full-width" label="Create" @click="register" />
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
import ApiAlert from 'src/components/ApiAlert.vue';
export default {
    components: {
        ApiAlert
    },
    data() {
        return {
            step: 1,
            firstName: '',
            lastName: '',
            email: '',
            phone_number: '',
            birthDate: '',
            userName: '',
            password: '',
            message: '',
            status: '',
            showAlert: false,
            doneSteps: {
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false
            },
            stepInputsList: {
                1: ['firstname_input', 'lastname_input'],
                2: ['email_input'],
                3: ['phone_number_input'],
                4: ['birthdate_input'],
                5: ['username_input'],
                6: ['password_input']
            },
            validationRules: [val => !!val.trim() || 'Field is required'],
            emailValidationRules: [val => !!val.includes('@') || 'Not valid email'],
            showPassword: false,
            userStore: userStore(),
            pageStyleStore: pageStyleStore(),
        }
    },
    methods: {
        // stepChange: function (newVal, oldVal) {
        //     for (let input of this.stepInputsList[oldVal]) {
        //         if (!Object.keys(this.$refs).includes(input)) return;
        //     }
        //     console.log(Object.keys(this.$refs));
        //     if (!this.validateStep(oldVal)) {
        //         this.$refs.stepper.goTo(oldVal);
        //         // return false;
        //     }
        //     else {
        //         this.doneSteps[oldVal]
        //     }
        //     // console.log(this.doneSteps);
        // },
        nextStep: function () {
            this.validateStep(this.step).then((result) => {
                if (!result) return;
                this.doneSteps[this.step] = true;
                this.$refs.stepper.next();
            })
            // if (!this.validateStep(this.step)) return;
        },
        validateStep: async function (step) {
            if (step == 1) {
                return this.$refs.firstname_input.validate() && this.$refs.lastname_input.validate()
            }

            if (step == 2) {
                return this.$refs.email_input.validate();
            }

            if (step == 3) {
                return await this.$refs.phone_number_input.validate();
            }

            if (step == 4) {
                return this.$refs.birthdate_input.validate();
            }

            if (step == 5) {
                return await this.$refs.username_input.validate();
            }

            if (step == 6) {
                return this.$refs.password_input.validate();
            }
        },
        validateUsername: function (value) {
            return new Promise((resolve, reject) => {
                let url = '/api/user/availibility';
                let data = {
                    'username': value
                }
                const xhr = new XMLHttpRequest();
                xhr.open('post', url);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = () => {
                    let response = JSON.parse(xhr.response);
                    if (xhr.status !== 200) {
                        resolve(false || 'Something wents wrong!');
                        return;
                    }
                    resolve(response.user_available || 'Username not available')
                }
                xhr.send(JSON.stringify(data));
            })
        },
        validatePhoneNumber: function (value) {
            if (value.length < 10) {
                return false || 'Phone number not valid';
            }
            return new Promise((resolve, reject) => {
                let url = '/api/user/phone_number_exists';
                let data = {
                    'phone_number': value
                }
                const xhr = new XMLHttpRequest();
                xhr.open('post', url);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = () => {
                    let response = JSON.parse(xhr.response);
                    // if (response.phone_number_exists) {
                    // }
                    if (xhr.status !== 200) {
                        resolve(false || 'Something wents wrong!');
                        return;
                    }
                    resolve(!response.phone_number_exists || 'Phone number already exists');
                    // resolve(true)
                }
                xhr.send(JSON.stringify(data))
            })
        },
        validateBirthdate: function (value) {
            let birtdate = new Date(value);
            let currentDate = new Date();
            let diffrence = currentDate - birtdate;
            let age = new Date(diffrence).getFullYear() - 1970;
            console.log(age);
            return age >= 18 || 'You need to be atleast 18 years old!';
        },
        register: function () {
            if (!this.validateStep(this.step)) return;
            let birtdate_list = this.birthDate.split('/');
            let dob = `${birtdate_list[0]}-${birtdate_list[1]}-${birtdate_list[2]}`;
            let url = '/api/user/register';
            let data = {
                username: this.userName,
                first_name: this.firstName,
                last_name: this.lastName,
                phone_number: this.phone_number,
                email: this.email,
                dob: dob,
                password: this.password
            }
            console.log("data: ", data);
            const xhr = new XMLHttpRequest();
            xhr.open('post', url);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = () => {
                let response = JSON.parse(xhr.response);
                if (xhr.status !== 200) {
                    this.message = response.message;
                    this.status = 'failed';
                    return;
                }
                localStorage.setItem('token', response.access);
                this.userStore.$state = {
                    isLogIn: true,
                    user: response.payload
                }
                this.$router.push('/');
                // console.log(response);
            }
            xhr.send(JSON.stringify(data))
        }
    },
    mounted() {
        if (this.userStore.getUserIsLogedIn) {
            this.$router.push('/');
        }
        // this.doneSteps[1] = this.$refs.firstname_input.validate() && this.$refs.lastname_input.validate();
    },
    computed: {
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
