<template>
  <transition name="slide-up">
    <div
      v-if="show" class="l-number-keyboard"
      :disabled="disabled" :class="[
        wrapClass,
        bgClass,
        plainClass,
        blockClass,
        sizeClass,
        mapClass,loadingClass]"
      :style="wrapStyle"
    >
      <div class="l-number-keyboard__body">
        <div class="l-number-keyboard__keys">
          <div v-for="(item,idx) of keyboards" :key="idx" class="l-number-keyboard__key">
            <div class="l-key" @click="tapItem(item)">
              {{ item }}
            </div>

          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

const keynboardsOfNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'keyboard', 0, 'delete']

export default {
    name: 'LNumberKeyboard',
    props: {
        show: {
            type: [Boolean],
            default: false
        },
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

        disabled: {
            type: [Boolean],
            default: false
        },
        rules: {
            type: [Array],
            default: () => {
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
        }
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
            errorMessage: ''
        }
    },
    computed: {
        keyboards() {
            return keynboardsOfNum
        },
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
            const classList = []
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
                'normal': 'l-cell--normal'
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
            const bgClassMap = {
                'primary': 'l-button--primary',
                'danger': 'l-button--danger'
            }
            return bgClassMap[this.type] || 'l-button--primary'
        }
    },
    watch: {
        value(n, o) {
            if (n) {
                this.length = n.length
            }
            console.log(n, 'n')
        }
    },
    mounted() {

    },
    methods: {
        tapItem(item) {
            // console.log(item)
            if (isNaN(item)) {

            } else {
                this.$emit('input', parseInt(item))
            }
        },
        getError(value) {
            if (this.rules && this.rules.length > 0) {
                this.rules.forEach(rule => {
                    this.checkRule(rule, value)
                })
            }
        },
        checkRule(rule, value) {
            let errorCount = 0
            if (rule.required) {
                if (value === undefined || value === null || value === '') {
                    this.errorMessage = rule.message
                    errorCount++
                } else {
                    this.errorMessage = ''
                }
            }
            if (errorCount > 0) {
                this.$parent.getChildrenError()
            }
        },
        onInput(event) {
            const val = event.target.value
            this.getError(val)
            if (this.type === 'textarea') {
                this.length = val.length
                this.height = 'inherit'
                this.height = event.target.scrollHeight
                this.$nextTick(() => {
                    this.height = event.target.scrollHeight
                })
            }
        },
        onChage(event) {
            console.log(event.target.value, 'target')
            this.$emit('input', event.target.value)
        }

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
@import url("../style/index.less");
.l-number-keyboard {
    box-sizing: border-box;
    background-color: #eee;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    transition: all 500ms;
    .l-number-keyboard__body {
        .l-number-keyboard__keys {
            display: flex;
            flex-wrap: wrap;
        }
        .l-number-keyboard__key {
            width: calc(100% / 3);
        }
        .l-key {
            text-align: center;
            font-size: 30px;
            padding: 10px 0;
            background: #fff;
            border-radius: 10px;
            margin: 5px 5px;
            &:active {
                opacity: 0.6;
            }
        }
    }
}
</style>
