import Vue from 'vue'
import Toast from './components/toast/index.vue';
import Dialog from './components/dialog/index.vue'


const ToastConstructor = Vue.extend(Toast); // 扩展vue的属性
const DialogConstructor = Vue.extend(Dialog);

Vue.prototype.$toast = function (msg, duration = 2000) {
    const _toast = new ToastConstructor({
        data: {
            msg,
        }
    })
    _toast.$mount()
    let element = _toast.$el;
    document.body.appendChild(element)
    setTimeout(() => {
        document.body.removeChild(element)
    }, duration)
}



window.Dialog = {
    alert(opt){
        const dialog = new DialogConstructor({
            propsData: {
                value:true
            },
        })
        dialog.$mount();
        let element = dialog.$el;
        document.body.appendChild(element)
        return dialog.alert(opt)
    },
    confirm(opt){
        const dialog = new DialogConstructor({
            propsData: {
                value:true,
                type:'confirm'
            },
        })
        dialog.$mount();
        let element = dialog.$el;
        document.body.appendChild(element)
        return  dialog.confirm(opt)
    },
}

Vue.prototype.$dialog = function () {
    const dialog = new DialogConstructor({
        propsData: {
            value:true
        },
    })
    console.log(dialog,"dialog")
    dialog.$mount();
    let element = dialog.$el;
    document.body.appendChild(element)

    return {
        alert: dialog.alert,
        confirm:dialog.confirm,
    }

}

