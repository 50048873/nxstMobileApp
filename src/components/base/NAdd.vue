<template>
  <div 
    class="NAdd" 
    @touchstart.prevent="start" 
    @touchmove.prevent="move" 
    @touchend.prevent="end" 
    :style="setPos" 
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
      default: 'fa fa-plus'
    },
    top: {
      type: [String, Number],
      default: 0
    },
    left: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {
    setPos() {
      let top = this.getTop(parseInt(this.top)),
          left = this.getLeft(parseInt(this.left))
      return {
        top: top + 'px',
        left: left + 'px'
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
      this.touch.initiated = true
      this.touch.startY = e.touches[0].pageY
      this.touch.startX = e.touches[0].pageX
      this.touch.originTop = parseInt(this.$refs.nAdd.style.top)
      this.touch.originLeft = parseInt(this.$refs.nAdd.style.left)
      this.$refs.nAdd.style.backgroundColor = 'rgba(38, 194, 209, 0.9)';
      this.startTime = new Date()
    },
    move(e) {
      if (!this.touch.initiated) {
        return
      }
      let deltaY = e.touches[0].pageY - this.touch.startY,
          deltaX = e.touches[0].pageX - this.touch.startX
      let top = this.getTop(this.touch.originTop + deltaY),
          left = this.getLeft(this.touch.originLeft + deltaX)
      this.$refs.nAdd.style.top = `${top}px`
      this.$refs.nAdd.style.left = `${left}px`
    },
    end() {
      this.$refs.nAdd.style.backgroundColor = 'rgba(38, 194, 209, 0.6)';
      this.touch.initiated = false
      this.endTime = new Date()
      let deltaTime = this.endTime - this.startTime
      if (deltaTime < 200) {
        this.add()
      }
    },
    add() {
      this.$emit('add')
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
    top: 0;
    left: 0;
    width: 54px;
    height: 54px;
    z-index: 9;
    background-color: rgba(38, 194, 209, 0.6);
    border-radius: 50%;
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, 0.3);
    transition: background-color 0.4s;
    .fa {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      color: white;
    }
  }
</style>