import Vue from 'vue'
import App from './App.vue'

import './components/init.js'

// import './icon-svg'

// import Vant from 'vant';
// import 'vant/lib/index.css';

// Vue.use(Vant);

import router from './router/index'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
