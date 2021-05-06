import Vue from 'vue'
import Toast from './toast/index.vue';
import Dialog from './dialog/index.vue'





const ToastConstructor = Vue.extend(Toast); // 扩展vue的属性
const DialogConstructor = Vue.extend(Dialog);
console.log("this")

function  transform(el,x,y,z=0) {
    // el.style.transform = `translate3d(30px,30px,30px)`
    // console.log(`translate3d(${x}px,${y}px,${z}px)`)
    el.style.transform = `translate3d(${x}px,${y}px,${z}px)`
}

Vue.directive('l-pull-down',{
    bind(el,binding){
        // console.log(binding,"binding")
        let target = el;
        if(binding.modifiers.body){
            target = document.body;
        }
        let y = 0;
        let disY = 0;
        let maxY = 60
        const onTouchStart = (event)=>{
            
            y = event.touches[0].pageY;
        }
        const onTouchMove = (event)=>{
            // console.log(event.touches[0].pageY)
            disY = event.touches[0].pageY - y;
            disY = disY > maxY ? maxY :disY;
            transform(target,0,disY)
        }
        const onTouchEnd = (event)=>{
            // console.log(`onTouchEnd`)
            // alert("end")
            disY = 0;
          
            transform(target,0,disY)
        }

        // console.log(target,"modifiers")
        target.addEventListener('touchstart',onTouchStart,false);
        target.addEventListener('touchmove',onTouchMove,false);
        target.addEventListener('touchend',onTouchEnd,false);

    },
    unbind(el,binding){
        
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

