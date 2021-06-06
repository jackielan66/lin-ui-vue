import Vue from 'vue'
import Toast from './toast/index.vue';
import Dialog from './dialog/index.vue'
import Icon from './icon/index.vue'
import Notify from './notify/index.vue'
import Button from './button/index.vue'
import Line from './line/index.vue'
import Cell from './cell/index.vue'
import Image from './image/index.vue' 
import { Row,Col } from './layout/index'
import Popup from './popup/index' 
// import './style/index.less'

// todo 使用require.context() 批量引入组件

// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);

// import all svg
const req = require.context('../icon-svg', true, /\.svg$/);
// console.log(req,"req")
// console.log(req.id,"id")
requireAll(req);


Vue.component('l-icon', Icon)
Vue.component('l-button',Button)
Vue.component('l-line',Line);
Vue.component('l-cell',Cell)
Vue.component('l-image',Image)
Vue.component('l-row',Row)
Vue.component('l-col',Col)
Vue.component('l-popup',Popup)



const ToastConstructor = Vue.extend(Toast); // 扩展vue的属性
const DialogConstructor = Vue.extend(Dialog);
const NotifyConstructor = Vue.extend(Notify)


function transform(el, x, y, z = 0) {
    // el.style.transform = `translate3d(30px,30px,30px)`
    // console.log(`translate3d(${x}px,${y}px,${z}px)`)
    el.style.transform = `translate3d(${x}px,${y}px,${z}px)`
}

Vue.directive('l-pull-down', {
    bind(el, binding) {
        // console.log(binding,"binding")
        let target = el;
        if (binding.modifiers.body) {
            target = document.body;
        }
        let y = 0;
        let disY = 0;
        let maxY = 60;

        const loadElement = document.createElement('div')
        loadElement.style.textAlign = 'center'
        loadElement.style.display = 'none';
        loadElement.innerHTML = `下拉中`
        target.insertBefore(loadElement, target.childNodes[0])
        // document.body.childNodes

        const onTouchStart = (event) => {
            y = event.touches[0].pageY;
        }
        const onTouchMove = (event) => {
            // console.log(event.touches[0].pageY)
            if (loadElement.style.display === 'none') {
                loadElement.style.display = 'block';
            }

            disY = event.touches[0].pageY - y;
            disY = disY > maxY ? maxY : disY;
            transform(target, 0, disY)
        }
        const onTouchEnd = (event) => {
            // console.log(`onTouchEnd`)
            // alert("end")
            disY = 0;

            transform(target, 0, disY)
        }

        // console.log(target,"modifiers")
        target.addEventListener('touchstart', onTouchStart, false);
        target.addEventListener('touchmove', onTouchMove, false);
        target.addEventListener('touchend', onTouchEnd, false);

    },
    unbind(el, binding) {

    },
})

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
    alert(opt) {
        const dialog = new DialogConstructor({
            propsData: {
                value: true
            },
        })
        dialog.$mount();
        let element = dialog.$el;
        document.body.appendChild(element)
        return dialog.alert(opt)
    },
    confirm(opt) {
        const dialog = new DialogConstructor({
            propsData: {
                value: true,
                type: 'confirm'
            },
        })
        dialog.$mount();
        let element = dialog.$el;
        document.body.appendChild(element)
        return dialog.confirm(opt)
    },
}

Vue.prototype.$dialog = function () {
    const dialog = new DialogConstructor({
        propsData: {
            value: true
        },
    })
    // console.log(dialog, "dialog")
    dialog.$mount();
    let element = dialog.$el;
    document.body.appendChild(element)

    return {
        alert: dialog.alert,
        confirm: dialog.confirm,
    }

}

Vue.prototype.$notify = function (params) {
    let defCfg = {
        type:'primary',
        duration: 2000,
    };
    if (typeof params === 'string') {
        defCfg.message = params;
    }
    if (typeof params === 'object') {
        defCfg.message = params.message;
        defCfg.duration = params.duration || defCfg.duration;
        defCfg.type = params.type || defCfg.type;
    }
    const notify = new NotifyConstructor({
        propsData: {
            type: defCfg.type
        },
        data() {
            return {
                message: defCfg.message
            }
        }
    })
    notify.$mount();
    notify.toggleShow()
    let element = notify.$el;
    document.body.appendChild(element);
}

Vue.directive('long-tap',{
    bind:function (el,binding,vnode) {
        console.log(el,'el')
        console.log(binding,'binding')
        console.log(vnode,'vnode');
        let timer = null;
        let startTime = '';
        let endTime = '';
        let LONG_TIME = binding.arg || 800;
        const onTouchStart = function (params) {
            startTime = Date.now();
            timer = window.setTimeout(()=>{
                binding.value()
            },LONG_TIME)
        };
        const onTouchMove = function (params) {
            window.clearTimeout(timer)
        }
        const onTouchEnd = function (params) {
            endTime=Date.now();
            if(endTime-startTime<LONG_TIME){
                window.clearTimeout(timer)
            }
        }
        el.addEventListener('touchstart',onTouchStart,false);
        el.addEventListener('touchmove',onTouchMove,false)
        el.addEventListener('touchend',onTouchEnd,false)
        el._fnObj = {
            onTouchStart,
            onTouchMove,
            onTouchEnd
        }
    },
    inserted:function (params) {
        
    },
    update:function (params) {
        
    },
    componentUpdated:function (params) {
        
    },
    unbind:function (el,binding) {
        el.removeEventListener('touchstart',el._fnObj.onTouchStart);
        el.removeEventListener('touchmove',el._fnObj.onTouchMove);
        el.removeEventListener('touchend',el._fnObj.onTouchEnd);

    }
})

