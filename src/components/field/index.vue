<template>
    <div class="l-field" :disabled="disabled" :class="[
    wrapClass,
    bgClass,
    plainClass,
    blockClass,
    sizeClass,
    mapClass,loadingClass]" :style="wrapStyle">
        <div class="l-field--label" :style="{width:labelWidth}">
            {{label}}
        </div>
        <div class="l-field--value">
            <textarea :style="textAreaStyle" ref="textarea" v-if="type==='textarea'" :maxlength="maxlength" :minlength="minlength" rows="1" :type="type" :disabled="disabled" :placeholder="placeholder" @input="onInput" @scroll="scroll" @change="onChage" class="l-field__input"></textarea>
            <input v-else :type="type" :maxlength="maxlength" :minlength="minlength" :disabled="disabled" :placeholder="placeholder" @change="onChage" class="l-field__input" />
            <div v-if="errorMessage" class="l-field__error-message">{{errorMessage}}</div>
            <div v-if="showWordLimit" class="l-field__word-limit"> {{length}} /{{maxlength}}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'l-field',
    props: {
        value: {
            type: String,
            default() {
                return ''
            }
        },
        label: {
            type: String,
            default() {
                return ''
            }
        },
        labelWidth: {
            type: [String, Number],
            default() {
                return '100px'
            }
        },
        placeholder: {
            type: String,
            default() {
                return ''
            }
        },
        type: {
            type: String,
            default() {
                return 'text'
            }
        },
        maxlength: {
            type: [String, Number],
            default() {
                return 50
            }
        },
        minlength: {
            type: [String, Number],
            default() {
                return 0
            }
        },
        showWordLimit: Boolean,
        required: {
            type: [Boolean],
            default: false
        },
        isLink: {
            type: [Boolean],
            default: false
        },
        disabled: {
            type: [Boolean],
            default: false
        },
        rules: {
            type: [Array],
            default: ()=>{
                return []
            }
        },
        plain: {
            type: [Boolean],
            default: false
        },

        size: {
            type: String,
            default() {
                // large small mini
                return 'normal'
            }
        },
        title: {
            type: String,
            default() {
                // large small mini
                return ''
            }
        },
        duration: {
            type: Number,
            default() {
                return 2000
            }
        },
    },
    data() {
        return {
            message: '',
            $textarea: null,
            panelAnimateClass: '',
            isShow: false,
            moveDis: 0,
            initHeigth: 0,
            height: 0,
            length: 0,
        }
    },
    computed: {
        textAreaStyle() {
            if (this.height) {
                if (isNaN(this.height)) {
                    return { height: this.height }
                } else {
                    return { height: this.height + 'px' }
                }

            }
        },
        wrapStyle() {

        },
        wrapClass() {
            let classList = [];
            if (this.required) {
                classList.push('l-field--required')
            }

            if (this.disabled) {
                classList.push('l-field--disabled')
            }

            return classList.join(' ')
        },

        sizeClass() {
            // large small mini
            // return 'normal'
            const sizeClassMap = {
                'large': 'l-cell--large',
                'small': 'l-cell--small',
                'mini': 'l-cell--mini',
                'normal': 'l-cell--normal',
            }
            return sizeClassMap[this.size] || 'l-cell--normal'
        },
        blockClass() {
            return this.block ? 'l-button--block' : ''
        },
        loadingClass() {
            return this.loading ? 'l-button--loading' : ''
        },
        disabledClass() {
            return this.disabled ? '.l-field--disabled ' : ''
        },
        plainClass() {
            return this.plain ? 'l-button--plain' : ''
        },
        mapClass() {
            return this.show ? 'show' : ''
        },
        bgClass() {
            // const bgClassMap = {
            //     'primary': 'l-button--primary',
            //     'danger': 'l-button--danger'
            // }
            // return bgClassMap[this.type] || 'l-button--primary'
        },
        errorMessage(){
            return ''
        }
    },
    watch: {
        value(n, o) {
            if (n) {
                this.length = n.length;
            }
            console.log(n, 'n')
        }
    },
    mounted() {
        // console.log(this.$slots,"====")
        // this.$slots.tab
        // window.setTimeout(() => {
        //     this.isShow = false
        // }, this.duration)
        this.$nextTick(() => {
            let $textarea = this.$refs.textarea;
            // console.log(this.$refs, "== this.$refs ==")
            if ($textarea) {
                const { height } = getComputedStyle($textarea)
                this.initHeigth = parseInt(height)
            }
        })
    },
    methods: {
        scroll(event) {

        },
        onInput(event) {
            const val = event.target.value;
            this.length = val.length;
            console.log(event.target.scrollHeight, 'event');
            this.height = 'inherit';
            this.height = event.target.scrollHeight;
            this.$nextTick(() => {
                this.height = event.target.scrollHeight;
            });
        },
        onChage(event) {
            console.log(event.target.value, 'target')
            this.$emit('input', event.target.value)
        },

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
@import url("../style/index.less");
.l-field {
    box-sizing: border-box;
    background-color: #fff;
    position: relative;
    // height: 44px;
    display: flex;
    // justify-content:space-between;
    // align-items: center;
    outline: none;
    border: none;
    font-size: 14px;
    position: relative;
    .l-field--label {
        // min-width: 100px;
    }
    .l-field--value {
        flex-grow: 1;
    }
    .l-field__input {
        margin: 0;
        padding: 0;
        height: inherit;
        &:focus {
            border: none;
            outline: none;
        }
    }
    &::after {
        content: " ";
        width: 100%;
        position: absolute;
        bottom: 0px;
        left: 1px;
        border-bottom: 1px solid #ccc;
        transform: scale(1, 0.5);
    }
    &.l-field--required::before {
        content: "*";
        color: @danger-color;
        position: absolute;
        // top: px;
        left: 5px;
    }
    &.l-field--disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
    .l-field__word-limit {
        text-align: right;
    }
    .l-field__error-message {
        color: @danger-color;
        font-size: 12px;
    }
    &.l-button--plain.l-button--danger {
        color: @danger-color;
        border: 1px solid @danger-color;
        border-width: 0;
    }

    // 大小
    &.l-button--large {
        height: 50px;
        padding: 0 24px;
        font-size: 16px;
    }
    &.l-cell--normal {
        padding: 10px 16px;
        font-size: 14px;
    }
    &.l-button--small {
        height: 32px;
        padding: 0 8px;
        font-size: 12px;
    }
    &.l-button--mini {
        height: 24px;
        padding: 0 4px;
        font-size: 10px;
    }
    // 大小end

    &.l-button--block {
        display: block;
        width: 100%;
    }

    // &:active {
    //     opacity: 0.7;
    // }
}
</style>
