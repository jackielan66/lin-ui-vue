import Vue from 'vue'
import Toast from './components/toast'
var ToastConstructor = Vue.extend(Toast); // 扩展vue的属性

Vue.prototype.$toast = function (msg, duration = 2000) {
    const _toast = new ToastConstructor({
        data:{
            msg,
        }
    })
    _toast.$mount()
    let element = _toast.$el;
    document.body.appendChild(element)
    setTimeout(()=>{
        document.body.removeChild(element)
    },duration)
}