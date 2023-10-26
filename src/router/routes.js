
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                name: 'home',
                path: '',
                component: () => import('pages/IndexPage.vue'),
                children: [
                    {
                        name: 'messenger',
                        path: 'messenger',
                        component: () => import('pages/MessengerPage.vue')
                    }
                ]
            },
        ]
    },
    { path: '/login', component: () => import('pages/LoginPage.vue') },
    { path: '/create_account', component: () => import('pages/RegisterPage.vue') },
    {
        path: '/settings',
        component: () => import('pages/SettingsPage.vue'),
        children: [
            { path: 'profile', component: () => import('pages/ProfileSettings.vue') }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]

export default routes
