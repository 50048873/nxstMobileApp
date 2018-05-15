<template>
  <div class="ReservoirDetailInspectionAdd">
    <form ref="formEle">
      <div class="item line-bottom">
        <h6>签到点</h6>
        <div class="inputBox">
          <label for="yhd" v-for="item in signPoint">
            <span class="iconWrap">
              <input type="checkbox" id="yhd" disabled="disabled" :checked="item.POINTCOUNT">
              <i class="nxst-circle"></i>
            </span>
            <span>{{item.PATROL_NAME}}</span>
          </label>
        </div>
      </div>
      <div class="item line-bottom">
        <h6>巡查部位</h6>
        <label class="inputBox arrow-r" for="pointId">
          <select class="select" id="pointId" name="pointId" v-model="pointId" required>
            <option disabled value="">请选择</option>
            <option :value="item.ID" v-for="item in patrolPoint">{{item.PATROL_NAME}}</option>
          </select>
        </label>
      </div>
      <div class="item line-bottom">
        <h6>巡查时间</h6>
        <label class="inputBox arrow-r datetimeBox" for="checkDate">
          <input class="datetimeLocal" id="checkDate" type="datetime-local" step="1" v-model="checkDate" required>
          <span class="realDatetimeLocal">{{checkDate | dateFormat('YYYY-MM-DD hh:mm:ss')}}</span>
        </label>
      </div>
      <div class="item line-bottom">
        <h6>巡查状态</h6>
        <div class="inputBox">
          <label for="normal">
            <span class="iconWrap">
              <input type="radio" name="patrolState" id="normal" value="0" checked="checked" v-model="patrolState" required>
              <i class="nxst-circle"></i>
            </span>
            <span>正常</span>
          </label>
          <label for="abnormal">
            <span class="iconWrap">
              <input type="radio" name="patrolState" id="abnormal" value="1" v-model="patrolState">
              <i class="nxst-circle"></i>
            </span>
            <span>异常</span>
          </label>
        </div>
      </div>
      <div class="patrolInfo">
        <h6>情况说明</h6>
        <textarea class="weui-textarea" name="patrolInfo" placeholder="请输入检查情况" v-model="patrolInfo"></textarea>
        <p class="explain">至少10个字符，已输入{{patrolInfo.length}}个字符</p>
      </div>

      <div class="weui-gallery" id="gallery">
        <span class="weui-gallery__img" id="galleryImg"></span>
        <div class="weui-gallery__opr">
          <a href="javascript:" class="weui-gallery__del">
            <i class="weui-icon-delete weui-icon_gallery-delete extend-click"></i>
          </a>
        </div>
      </div>

      <div class="weui-uploader">
        <div class="weui-uploader__hd">
          <p class="weui-uploader__title">图片上传</p>
        </div>
        <div class="weui-uploader__bd">
          <ul class="weui-uploader__files" id="uploaderFiles"></ul>
          <div class="weui-uploader__input-box">
            <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/png, image/jpeg, image/gif, image/jpg" multiple>
          </div>
        </div>
      </div>
      
      <div class="submitWrap">
        <button class="btn" :class="{'c-theme': !disabled}" @click.prevent="submit" :disabled="disabled">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
import {dateFormat} from '@/assets/js/mixin'
import {androidInputBugFix, getUuid, createObjectURL, dataURLtoFile, compress} from '@/assets/js/util'
import {success} from '@/assets/js/config'
import  {getPid} from '@/assets/js/util'
import $ from 'jquery'
import api from '@/assets/js/api'
export default {
  name: 'ReservoirDetailInspectionAdd',
  mixins: [dateFormat],
  data() {
    return {
      pointName: '',
      pointId: '',
      checkDate: this.getDefaultDateTime(),
      patrolState: '',
      patrolInfo: '',

      patrolPoint: [],  // 巡检点列表
      signPoint: [],
      disabled: false
    }
  },
  
  methods: {
    getReservoirDetailInspectionAdd_patrolPoint() {
      let params = {
        pid: getPid()//,
        //date: '', // 需要统计哪天，时间格式为“yyyy-MM-dd”
        //is_sign: '' // 是否是签到点0否1是，不填获得所有巡检点
      }
      api.getReservoirDetailInspectionAdd_patrolPoint(params)
        .then((res) => {
          if (res.status === success) {
            this.patrolPoint = res.data
            /*
              返回字段里（签到点业务逻辑）：
              IS_SIGN: 1表示签到点（要显示的内容），0表示非签到点
              POINTCOUNT: 大于0表示已签到（要选中的内容），0表示未签到
            */
            this.signPoint = this.patrolPoint.filter((item) => {
              return item.IS_SIGN === '1'
            })
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailInspectionAdd.vue')
        })
    },
    getDefaultDateTime() {
      let checkDate = this.dateFormat(new Date(), 'YYYY-MM-DD hh:mm:ss').split(' ').join('T')
      return checkDate
    },
    readAsDataURL(file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      return new Promise((resolve, reject, c) => {
        reader.onerror = () => {
          //console.log(`error: ${reader}`)
          reject(reader.error.code)
        }
        /*reader.onprogress = (event) => {
          console.log('progress')
          if (event.lengthComputable) {
            console.log(`${event.loaded / event.total}%`)
          }
        }*/
        reader.onload = () => {
          //console.log('load: ', reader)
          if (reader.result) {
            resolve(reader.result)
          }
        }
      })
    },
    showImg(src) {
      let $uploaderFiles = $("#uploaderFiles"),
          tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>'
      $uploaderFiles.append($(tmpl.replace('#url#', src)))
    },
    fileChange() {
      let _this = this,
          maxSize = 500 * 1024,
          maxCount = 5,
          $gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
          $uploaderInput = $("#uploaderInput"),
          $uploaderFiles = $("#uploaderFiles")

      _this.files = []

      $uploaderInput.on("change", (e) => {
        let src = '', 
            files = e.target.files,
            len = files.length

        for (let i = 0; i < len; ++i) {
          let file = files[i],
              fileType = file.type,
              fileName = file.name

          if (!/image/.test(fileType)) {
            this.hint('只能传入png, jpeg, jpg, gif格式的图片')
            return
          }

          if (_this.files.length > maxCount) {
            this.hint(`最多只能上传${maxCount}图片`)
            return
          }
          
          if (file.size > maxSize) {
            let image = new Image(),
                src = createObjectURL(file)
            image.src = src;
            image.onload = function(){
              let w = image.width,
                  h = image.height,
                  ratio = w / h,
                  maxSide = 1024,
                  rate = w / maxSide

              // 宽或高小于等于1024不用压缩
              if (ratio >= 1 && w < maxSide) {
                return
              } else if ( ratio < 1 && h < maxSide) {
                return
              }
              src = compress(image, w / rate, h / rate, 0.8, fileType);

              _this.files.push(dataURLtoFile(src, fileName))

              if (src.length > maxSize) {
                this.hint(`上传文件尺寸应小于${maxSize}byte`)
                return
              }
              _this.showImg(src)
              //console.log(`压缩前的大小：${file.size/1024}kb；压缩后的大小：${src.length/1024}kb`)
            }
          } else {
            _this.readAsDataURL(file)
              .then((src) => {
                _this.showImg(src)
                _this.files.push(dataURLtoFile(src, fileName))
              }, (err) => {
                _this.hint(`错误码：${err}`)
              })
          }
        }
      })

      $uploaderFiles.on("click", "li", function(){
        let $this = $(this)
        _this.$li = $this
        _this.index = $uploaderFiles.find('.weui-uploader__file').index($this)
        $galleryImg.attr("style", this.getAttribute("style"))
        $gallery.fadeIn(100)
      });

      $gallery.on("click", function(e){
        let target = e.target
        if (target.className.indexOf('weui-icon-delete') > -1) {
          _this.$li.remove()
          _this.files.splice(_this.index, 1)
          delete _this.$li
          $uploaderInput.val(null)
        }
        $gallery.fadeOut(100)
      });
    },
    validate() {
      if (!this.pointId) {
        this.hint('请选择巡查部位')
        return false
      } 
      if (!this.checkDate) {
        this.hint('请选择巡查时间')
        return false
      }
      if (!this.patrolState) {
        this.hint('请选择巡查状态')
        return false
      }  
      if (this.patrolInfo && this.patrolInfo.length < 10) {
        this.hint(`情况说明应至少10个字符，已输入${this.patrolInfo.length}个字符`)
        return false
      }
      return true
    },
    submit() {
      if (!this.validate()) return
      this.disabled = true
      let formEle = this.$refs.formEle
      let params = new FormData(formEle)
      params.append('pid',getPid())
      params.append('id', getUuid(32, 16))
      params.append('checkDate', this.dateFormat(new Date(this.checkDate), 'YYYY-MM-DD hh:mm:ss'))
      params.append('files', this.files)

      this.patrolPoint.forEach((item) => {
        if (item.ID === this.pointId) {
          params.append('patrolName', item.PATROL_NAME)
        }
      })

      api.getReservoirDetailInspectionAdd(params)
        .then((res) => {
          if (res.status === success) {
            this.hint(res.msg)
            this.$router.back()
            this.$destroy()
          } else {
            this.hint(res.msg)
          }
        }, (err) => {
          this.serverErrorTip(err, 'ReservoirDetailInspectionAdd.vue')
        }).always(() => {
          this.disabled = false
        })
    }
  },
  beforeMount() {
    this.getReservoirDetailInspectionAdd_patrolPoint()
    this.setDocumentTitle('新增巡查记录')
    androidInputBugFix()
  },
  watch: {  
    '$route'(to, from)  {  
      let toPath = to.path
      if (toPath === "/reservoirDetail/inspection/add") {
        this.setDocumentTitle('新增巡查记录')
      }
    }  
  }
}
</script>

<style scoped lang="less">
  @import '../../assets/less/variable.less';
  .ReservoirDetailInspectionAdd {
    position: absolute;
    top: 0;
    right: 0;
    bottom: @footer-height;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    form {
      overflow-x: hidden;
      color: #6c6c6c;
      .item {
        display: flex;
        padding: 13px 10px;
        background-color: white;
        height: 20px;
        line-height: 20px;
        .inputBox {
          flex: 1;
          text-align: right;
          label {
            margin-left: 20px;
            .iconWrap {
              margin-right: 4px;
              .nxst-circle {
                color: #d7d7d7;
                font-size: 16px;
              }
              input {
                position: absolute;
                left: -9999em;
                &:checked + .nxst-circle {
                  color: #10d67b;
                }
              }
            }
          }
          .select {
            -webkit-appearance: none;
            border: 0;
            outline: 0;
            background-color: transparent;
            position: relative;
            z-index: 1;
            direction: rtl;
            width: 100%;
          }
          .realDatetimeLocal {
            position: absolute;
            top: 0;
            right: 15px;
          }
          .datetimeLocal {
            border: 0;
            outline: 0;
            -webkit-appearance: none;
            opacity: 0;
            width: 100%;
            position: relative;
            z-index: 1;
          }
          &.arrow-r {
            padding-right: 15px;
            padding-left: 15px;
          }
        }
      }
      .patrolInfo {
        margin: 10px 10px 0 10px;
        h6 {
          padding-bottom: 4px;
        }
        .weui-textarea {
            display: block;
            border: 0;
            resize: none;
            width: 100%;
            height: 112px;
            outline: 0;
            padding: 6px;
            box-sizing: border-box;
            &::-webkit-input-placeholder {
              color: #babbbb;
            }
        }
        .explain {
          text-align: right;
          line-height: 2;
          font-size: 10px;
        }
      }
      .submitWrap {
        padding: 0 10px;
        margin-top: 10px;
      }
    }
  }
</style>

<style lang="less">
  .weui-uploader {
    padding: 0 10px;
    .weui-uploader__hd {
      padding-bottom: 4px;
    }
    .weui-uploader__file {
        margin-right: 6px;
        margin-bottom: 6px;
        width: 50px;
        height: 50px;
    }
    .weui-uploader__input-box {
        margin-right: 6px;
        margin-bottom: 6px;
        width: 50px;
        height: 50px;
        background-color: #d7d7d7;
        border: none;
    }
    .weui-uploader__input-box:before {
        width: 2px;
        height: 16px;
    }
    .weui-uploader__input-box:after {
        width: 16px;
        height: 2px;
    }
    .weui-uploader__input-box:after, .weui-uploader__input-box:before {
        content: " ";
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        background-color: #858181;
    }
  }
</style>