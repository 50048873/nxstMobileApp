<template>
  <div 
    class="NAdd" 
    @touchstart.prevent="start" 
    @touchmove.prevent="move" 
    @touchend.prevent="end" 
    :style="getPos" 
    ref="nAdd">
    <i :class="iconClass"></i>
  </div>
</template>

<script>
const addSize = 54,
      screenWidth = window.innerWidth,
      screenHeight = window.innerHeight
export default {
  name: 'NTab',
  props: {
    iconClass: {
      type: String,
      default: 'nxst-add'
    },
    top: {
      type: [String, Number]
    },
    right: {
      type: [String, Number]
    },
    bottom: {
      type: [String, Number]
    },
    left: {
      type: [String, Number]
    }
  },
  computed: {
    getPos() {
      let top, right, bottom, left
      if (this.top) {
        top = parseInt(this.top) + 'px'
      }
      if (this.right) {
        right = parseInt(this.right) + 'px'
      }
      if (this.bottom) {
        bottom = parseInt(this.bottom) + 'px'
      }
      if (this.left) {
        left = parseInt(this.left) + 'px'
      }
      return {
        top,
        right,
        bottom,
        left
      }
    }
  },
  methods: {
    getTop(top) {
      if ((top + addSize) >= screenHeight) {
        top = screenHeight - addSize
      }
      if (top < 0) {
        top = 0
      }
      return top
    },
    getBottom(bottom) {
      if ((bottom + addSize) >= screenHeight) {
        bottom = screenHeight - addSize
      }
      if (bottom < 0) {
        bottom = 0
      }
      return bottom
    },
    getRight(right) {
      if ((right + addSize) >= screenWidth) {
        right = screenWidth - addSize
      }
      if (right < 0) {
        right = 0
      }
      return right
    },
    getLeft(left) {
      if ((left + addSize) >= screenWidth) {
        left = screenWidth - addSize
      }
      if (left  < 0) {
        left = 0
      }
      return left
    },
    start(e) {
      // this.touch.initiated = true
      this.touch.startY = e.touches[0].pageY
      this.touch.startX = e.touches[0].pageX

      if (this.top && this.left) { // 上左
        this.touch.originTop = parseInt(this.$refs.nAdd.style.top)
        this.touch.originLeft = parseInt(this.$refs.nAdd.style.left)
      } else if (this.top && this.right) { // 上右
        this.touch.originTop = parseInt(this.$refs.nAdd.style.top)
        this.touch.originRight = parseInt(this.$refs.nAdd.style.right)
      } else if (this.bottom && this.left) { // 下左
        this.touch.originBottom = parseInt(this.$refs.nAdd.style.bottom)
        this.touch.originLeft = parseInt(this.$refs.nAdd.style.left)
      } else if (this.bottom && this.right) { // 下右
        this.touch.originBottom = parseInt(this.$refs.nAdd.style.bottom)
        this.touch.originRight = parseInt(this.$refs.nAdd.style.right)
      }
      
      this.$refs.nAdd.style.backgroundColor = 'rgba(38, 194, 209, 0.9)';
    },
    move(e) {
      // if (!this.touch.initiated) {
      //   return
      // }
      let deltaY = e.touches[0].pageY - this.touch.startY,
          deltaX = e.touches[0].pageX - this.touch.startX

      if (this.top && this.left) { // 上左
        let top = this.getTop(this.touch.originTop + deltaY),
            left = this.getLeft(this.touch.originLeft + deltaX)
        this.$refs.nAdd.style.top = `${top}px`
        this.$refs.nAdd.style.left = `${left}px`
      } else if (this.top && this.right) { // 上右
        let top = this.getTop(this.touch.originTop + deltaY),
            right = this.getRight(this.touch.originRight - deltaX)
        this.$refs.nAdd.style.top = `${top}px`
        this.$refs.nAdd.style.right = `${right}px`
      } else if (this.bottom && this.left) { // 下左
        let bottom = this.getBottom(this.touch.originBottom - deltaY),
            left = this.getLeft(this.touch.originLeft + deltaX)
        this.$refs.nAdd.style.bottom = `${bottom}px`
        this.$refs.nAdd.style.left = `${left}px`
      } else if (this.bottom && this.right) { // 下右
        let bottom = this.getBottom(this.touch.originBottom - deltaY),
            right = this.getRight(this.touch.originRight - deltaX)
        this.$refs.nAdd.style.bottom = `${bottom}px`
        this.$refs.nAdd.style.right = `${right}px`
      }  
    },
    end(e) {
      this.$refs.nAdd.style.backgroundColor = 'rgba(38, 194, 209, 0.6)';
      this.touch.initiated = false

      //如果抬起值与按下值相同，说明是单击
      if (e.changedTouches[0].pageX == this.touch.startX) { 
        this.click()
        return;
      }
    },
    click() {
      this.$emit('click')
    }
  },
  created() {
    this.touch = {}
  }
}
</script>

<style scoped lang="less">
  .NAdd {
    position: fixed;
    //left: 0;
    width: 54px;
    height: 54px;
    z-index: 9;
    background-color: rgba(38, 194, 209, 0.6);
    border-radius: 50%;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.3);
    transition: background-color 0.4s;
    [class*="nxst"]{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 28px;
      color: white;
    }
  }
</style>