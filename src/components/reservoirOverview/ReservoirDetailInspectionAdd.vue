<template>
  <div class="ReservoirDetailInspectionAdd">
    <form enctype="multipart/form-data">
      <div class="item line-bottom">
        <h6>签到点</h6>
        <div class="inputBox">
          <label for="yhd">
            <span class="iconWrap">
              <input type="radio" name="qdd" id="yhd" value="yhd" checked="checked">
              <i class="fa fa-circle"></i>
            </span>
            <span>溢洪道</span>
          </label>
          <label for="db">
            <span class="iconWrap">
              <input type="radio" name="qdd" id="db" value="db">
              <i class="fa fa-circle"></i>
            </span>
            <span>大坝</span>
          </label>
          <label for="lsy">
            <span class="iconWrap">
              <input type="radio" name="qdd" id="lsy" value="lsy">
              <i class="fa fa-circle"></i>
            </span>
            <span>量水堰</span>
          </label>
        </div>
      </div>
      <div class="item line-bottom">
        <h6>巡查部位</h6>
        <div class="inputBox arrow-r">
          <select class="select" name="select1">
            <option selected="selected" value="1">坝顶1</option>
            <option value="2">坝顶2</option>
            <option value="3">坝顶3</option>
          </select>
        </div>
      </div>
      <div class="item line-bottom">
        <h6>巡查时间</h6>
        <div class="inputBox arrow-r datetimeBox">
          <input class="datetimeLocal" type="datetime-local" step="1" v-model="datetime">
          <span class="realDatetimeLocal">{{datetime | dateFormat('yyyy-mm-dd HH:MM:ss')}}</span>
          
        </div>
      </div>
      <div class="item line-bottom">
        <h6>巡查状态</h6>
        <div class="inputBox">
          <label for="normal">
            <span class="iconWrap">
              <input type="radio" name="xczt" id="normal" value="normal" checked="checked">
              <i class="fa fa-circle"></i>
            </span>
            <span>正常</span>
          </label>
          <label for="abnormal">
            <span class="iconWrap">
              <input type="radio" name="xczt" id="abnormal" value="abnormal">
              <i class="fa fa-circle"></i>
            </span>
            <span>异常</span>
          </label>
        </div>
      </div>
      <div class="condition">
        <h6>情况说明</h6>
        <textarea class="weui-textarea" placeholder="请输入检查情况" v-model="condition"></textarea>
        <p class="explain">至少10个字符，已输入{{condition.length}}个字符</p>
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
        <button class="btn c-theme">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
import {dateFormat} from '@/assets/js/mixin'
import {androidInputBugFix} from '@/assets/js/util'
import $ from 'jquery'
export default {
  name: 'ReservoirDetailInspectionAdd',
  mixins: [dateFormat],
  data() {
    return {
      datetime: this.getDefaultDateTime(),
      condition: '',
      placeholder: require('@/assets/img/pic_160.png')
    }
  },
  methods: {
    getDefaultDateTime() {
      let datetime = this.dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss').split(' ').join('T')
      return datetime
    },
    compress(img, width, height, ratio) {        
     var canvas, ctx, img64;
           
     canvas = document.createElement('canvas');        
     canvas.width = width;
     canvas.height = height;
           
     ctx = canvas.getContext("2d");        
     ctx.drawImage(img, 0, 0, width, height);
           
     img64 = canvas.toDataURL("image/jpeg", ratio);
           
     return img64;
    },
    update() {
      let _this = this,
          maxSize = 500 * 1024
      let tmpl = '<li class="weui-uploader__file" style="background-image:url(#url#)"></li>',
          $gallery = $("#gallery"), $galleryImg = $("#galleryImg"),
          $uploaderInput = $("#uploaderInput"),
          $uploaderFiles = $("#uploaderFiles")

      $uploaderInput.on("change", function(e){
        let src, url = window.URL || window.webkitURL || window.mozURL, files = e.target.files
        for (let i = 0, len = files.length; i < len; ++i) {
          let file = files[i]
          console.log(file)
          if (url) {
              src = url.createObjectURL(file)
          } else {
              src = e.target.result
          }
          if (file.size > maxSize) {
            let image = new Image();
            image.src = src;
                   
            image.onload = function(){
              let w = $(image).width(),
                  h = $(image).height()
                  console.log(w,h)
              src = _this.compress(image, 1024, 800, 0.8);
              console.log(src.length)
              console.log(file.size)
            }
          }
          
          $uploaderFiles.append($(tmpl.replace('#url#', src)))
        }
      })
      $uploaderFiles.on("click", "li", function(){
        _this.$li = $(this)
        $galleryImg.attr("style", this.getAttribute("style"))
        $gallery.fadeIn(100)
      });
      $gallery.on("click", function(e){
        let target = e.target
        if (target.className.indexOf('weui-icon-delete') > -1) {
          _this.$li.remove()
          delete _this.$li
          $uploaderInput.val(null)
        }
        $gallery.fadeOut(100)
      });
    }
  },
  created() {
    this.setDocumentTitle('新增巡查记录')
    this.$nextTick(() => {
      this.update()
    })
    androidInputBugFix()
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
              .fa-circle {
                color: #d7d7d7;
                font-size: 16px;
              }
              input {
                position: absolute;
                left: -9999em;
                &:checked + .fa-circle {
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
      .condition {
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