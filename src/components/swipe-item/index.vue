<template>
    <div class="swipe-item" :style="style">
        <slot></slot>
    </div>
</template>

<script>
const bodyClientWidth = document.documentElement.clientWidth;

console.log(bodyClientWidth,"bodyClientWidth")
export default {
    name: 'l-swipe-item',
    props: {
        msg: String
    },
    data() {
        return {
            index: 0,
            left: 0,
            width:bodyClientWidth
        }
    },
    computed: {
        style() {
            return { left: this.left + 'px' ,width:this.width+'px'}
        }
    },
    mounted() {
        let foundAt = this.$parent.$children.findIndex(child => child === this);
        console.log(foundAt)

        this.index = foundAt;
        this.left = foundAt * bodyClientWidth;
        console.log(this.$parent)


    },
    methods: {

    }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.swipe-item {
    position: absolute;
}
</style>
