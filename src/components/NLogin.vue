<template>
  <div class="n-login">
    <div class="logo"><img src="static/img/login-1.jpg" alt=""></div>
    <form class="loginWrap">
      <div class="username">
        <i class="nxst-user"></i>
        <input type="text" placeholder="用户名：字母、数字、-、_组成" v-model="username" :class="{VALID: usernameValid}">
        <i class="nxst-cancel extend-click" @click="clearUsername"></i>
      </div>
      <div class="password">
        <i class="nxst-lock"></i>
        <input :type="passwordMode" placeholder="密码：字母、数字组成" v-model="password" :class="{VALID: passwordValid}">
        <i class="nxst-eye extend-click" :class="{VALID: passwordToText}" @click="showPassword"></i>
      </div>
      <div class="errorTip" v-show="!clean && !validate">
        <i class="nxst-exclamation-mark"></i>
        <span>{{errorText}}</span>
      </div>
      <div class="passwordManage">
        <i :class="{'nxst-square': cachePassword, 'nxst-square-o': !cachePassword}"></i>
        <span class="remenberPassword extend-click" @click="rememberPassword">记住密码</span>
        <span class="forgetPassword">忘记密码？</span>
      </div>
      <button type="submit" class="btn btn-off" :class="{'btn-on': validate}" :disabled="!validate" @click.prevent="submit">登录</button>
    </form>
    <n-dialog-loading v-show="showLoading"></n-dialog-loading>
    <n-dialog-tip :text="text" v-if="loginSuccess"></n-dialog-tip>
  </div>
</template>

<script>
import {VALID, success, error} from '@/assets/js/config'
import {setItem, getItem} from '@/assets/js/store'
import api from '@/assets/js/api.js'
import NDialogLoading from '@/components/NDialogLoading'
import NDialogTip from '@/components/NDialogTip'
const usernameReg = /^[a-zA-Z0-9_-]{3,20}$/,
      passwordReg = /^[a-zA-Z0-9]{6,20}$/
export default {
  name: 'NLogin',
  data() {
    return {
      clean: true,
      errorText: '',
      username: '',
      password: '',
      passwordMode: 'password',
      usernameValid: false,
      passwordValid: false,
      passwordToText: false,
      cachePassword: false,
      showLoading: false,
      loginSuccess: true
    }
  },
  components: {
    NDialogLoading,
    NDialogTip
  },
  computed: {
    validate() {
      if (this.usernameValid && this.passwordValid) {
        return true
      } else {
        return false
      }
    },
    text() {
      return this.loginSuccess ? "登录成功" : "登录失败"
    }
  },
  methods: {
    clearUsername() {
      this.username = ''
    },
    showPassword() {
      this.passwordToText = !this.passwordToText
      this.passwordToText ? this.passwordMode = 'text' : this.passwordMode = 'password'
    },
    rememberPassword() {
      this.cachePassword = !this.cachePassword
    },
    submit() {
      this.clean = false
      this.showLoading = true
      let data = {
        username: this.username,
        password: this.password
      }

      api.login(data)
        .then((res) => {
          if (res.status === success) {
            console.log('登录成功')
            this.cachePassword && setItem('loginInfo', this.username, this.password)
            this.loginSuccess = true
          } else {
            console.log('登录失败')
            this.loginSuccess = false
          }
        }, (err) => {
          console.log(err)
        })
        .always(() => {
          this.showLoading = false
        })
    },
    initLoginInfo() {
      let loginInfo = getItem('loginInfo')
      if (loginInfo) {
        this.cachePassword = true
      }
    }
  },
  created() {
    this.initLoginInfo()
  },
  watch: {
    username(newVal, oldVal) {
      if (newVal) {
        if (usernameReg.test(newVal)) {
          this.usernameValid = true
          let loginInfo = getItem('loginInfo')
          for (var key in loginInfo) {
            if (key === this.username) {
              this.password = loginInfo[key]
              return
            }
          }
        } else {
          this.usernameValid = false
          this.errorText = '您输入的用户名不合规则！'
        }
      } else {
        this.errorText = '您输入的用户名为空！'
      }
      this.password = ''
    },
    password(newVal, oldVal) {
      if (newVal) {
        if (passwordReg.test(newVal)) {
          this.passwordValid = true
        } else {
          this.passwordValid = false
          this.errorText = '您输入的密码不合规则！'
        }
      } else {
        this.errorText = '您输入的密码为空！'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import '../assets/less/variable.less';
  .n-login {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .logo {
      width: 100%;
      padding-bottom: 58%;
      img {
        position: absolute;
      }
    }
    .loginWrap {
      width: 80%;
      margin: 30px auto 0;
      .username, .password {
        position: relative;
      }
      .errorTip {
        margin-top: -10px;
        margin-bottom: 20px;
        color: @color-error;
        .nxst-exclamation-mark {
          font-size: 16px;
          position: relative;
          top: 2px;
        }
      }
      .nxst-user, .nxst-lock {
        position: absolute;
        top: 6px;
        font-size: 16px;
        color: @color-theme;
      }
      .nxst-eye, .nxst-cancel {
        position: absolute;
        top: 6px;
        right: 0;
        color: #b5b7b8;
        font-size: 16px;
      }
      .nxst-eye {
        &.VALID {
          color: @color-error;
        }
      }
      input {
        display: inline-block;
        width: 100%;
        border-bottom: 1px solid #a6a6a6;
        padding-left: 2em;
        line-height: 2;
        margin-bottom: 20px;
        box-sizing: border-box;
        &:focus {
          border-bottom: 1px solid @color-error;
        }
        &.VALID {
          border-bottom: 1px solid #a6a6a6;
        }
      }
      .passwordManage {
        margin-bottom: 20px;
        [class*="nxst-square"] {
          position: relative;
          top: 1px;
        }
        .remenberPassword {
          padding-left: 20px;
          left: -20px;
        }
        .forgetPassword {
          color: @color-theme;
          float: right;
        }
      }
    }
  }
</style>
