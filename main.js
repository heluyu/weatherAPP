import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import RouterConfig from './router.config.js';


Vue.use(VueRouter);
Vue.use(VueResource);

var router = new VueRouter;

router.map(RouterConfig);

router.redirect({
    '/':'/provincelist'
});

router.start(App , '#app');
