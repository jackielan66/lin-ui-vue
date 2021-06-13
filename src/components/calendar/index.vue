<template>
    <transition :name="transitionName">
        <div class="l-calendar" :class="wrapClass" v-if="show">
            <div class="l-calendar__header">
                <div class="l-calendar__header--title">日期选择</div>
                <div class="l-calendar__header--subtitle">{{year}}-{{month}}-{{day}} </div>
                <div class="l-calendar__weekdays">
                    <span class="l-calendar__weekday" v-for="(week,idx) in weekDayList" :key="idx">
                        {{week}}
                    </span>
                </div>
            </div>
            <div class="l-calendar__body">
                <div class="l-calendar__month-mark">{{month}}</div>
                <div @click="onSelectDay(d)"  class="l-calendar__day" v-for="(d,idx) in dayList" :class="{'on':day===d}"  :key="idx" :style="getDayStyle(d)">
                    {{d}}
                </div>
            </div>
            <div class="l-calendar__footer">
                <l-button type="danger" round block size="lg" @click="sumbit">确认</l-button>
            </div>
        </div>
    </transition>
</template>

<script>
import * as dayjs from '../dayjs'

let $maskEl = null;
let $parentEl = null;
export default {
    name: 'l-calendar',
    props: {
        value: false,
        title: '',
        message: '',
        type: '',
        round: Boolean,
        position: {
            type: [String],
            default: () => {
                return ''
            }
        }
    },
    data() {
        return {
            show: true,
            options: {

            },
            date: null,
            year: 0,
            month: 0,
            day: 0,
            weekDayList: ['日', '一', '二', '三', '四', '五', '六'],
            dayList: [],
        }
    },
    watch: {
        value: {
            handler(n, o) {
                this.show = n;
                this.toggleMask()
            },
            immediate: true
        }
    },
    computed: {
        transitionName() {
            if (this.position === 'top') {
                return 'popup-top';
            }
            if (this.position === 'bottom') {
                return 'popup-bottom';
            }
        },
        mapTitle() {
            return this.title || this.options.title
        },
        mapMessage() {
            return this.message || this.options.message
        },
        wrapClass() {
            let classNames = [];
            if (this.position === 'top') {
                classNames.push('l-popup--top')
            }
            if (this.position === 'bottom') {
                classNames.push('l-popup--bottom')
            }
            if (this.round) {
                classNames.push('l-popup--round')
            }
            return classNames
        },

    },
    created() {
        this.init()
    },
    mounted() {

    },
    methods: {
        init() {
            let date = new Date();
            let curMonthTotalDays = dayjs.getCurMonthTotalDays(date);
            this.year = dayjs.getFullYear(date);
            this.month = dayjs.getMonth(date);
            this.day = dayjs.getDay(date)
            this.dayList = []
            for (let k = 1; k <= curMonthTotalDays; k++) {
                this.dayList.push(k)
            }
        },

        getDayStyle(day) {
            let date = new Date();
            let startWeek = dayjs.getStartWeek(date);
            if (day === 1 && startWeek) {
                return { marginLeft: 100 / 7 * startWeek + '%' }
            }
        },

        toggleMask() {
            this.$nextTick(() => {
                $parentEl = this.$el.parentNode;
                if ($maskEl) {
                    $maskEl.removeEventListener('click', this.handleCancel)
                    setTimeout(() => {
                        $parentEl.removeChild($maskEl)
                        $maskEl = null
                    }, 500)
                } else {
                    $maskEl = document.createElement('div');
                    $maskEl.classList.add('l-mask');
                    $parentEl.insertBefore($maskEl, this.$el)
                    $maskEl.addEventListener('click', this.handleCancel)
                }
            })

        },
        sumbit() {
            // console.log(`handleConfirm`)
            this.$emit('handleConfirm')

        },
        handleCancel(event) {
            this.show = false;
            this.$emit('input', false)
            this.$emit('handleCancel')
        },
        onSelectDay(d) {
           this.day = d
        },
    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
@import url('../style/index.less');
.l-mask {
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    animation: fadeIn 500ms;
}

.l-calendar {
    position: fixed;
    background: #fff;
    z-index: 100;
    width: 100%;
    transition: all 500ms;
    .l-calendar__header {
    }
    .l-calendar__header--title {
        font-size: 16px;
        font-weight: bold;
        line-height: 44px;
        text-align: center;
    }
    .l-calendar__header--subtitle{
        font-size: 15px;
        // font-weight: bold;
        // line-height: 40px;
        text-align: center;
    }
    &.l-popup--top {
        top: 0;
    }
    &.l-popup--bottom {
        bottom: 0;
        &.l-popup--round {
            border-radius: 16px 16px 0 0;
        }
    }

    .l-calendar__weekdays {
        display: flex;
        .l-calendar__weekday {
            flex: 1;
            text-align: center;
        }
    }

    .l-calendar__body {
        position: relative;
        .l-calendar__day {
            position: relative;
            display: inline-block;
            width: calc(100% / 7);
            text-align: center;
            line-height: 44px;
            z-index: 99;
            &.on{
                background-color: @danger-color;
                color: #fff;
                border-radius: 10px;
            }
        }
        .l-calendar__month-mark {
            position: absolute;
            font-size: 150px;
            color: #eee;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}

.popup-top-enter {
    transform: translate3d(0, -100%, 0);
}
.popup-top-enter-to {
    transform: translate3d(0, 0, 0);
}
.popup-top-leave {
    transform: translate3d(0, 0, 0);

    // top: 0px;
}
.popup-top-leave-to {
    transform: translate3d(0, -100%, 0);
}

.popup-bottom-enter,
.popup-bottom-leave-to {
    transform: translate3d(0, 100%, 0);
}
.popup-bottom-enter-to,
.popup-bottom-leave {
    transform: translate3d(0, 0, 0);
}
</style>
