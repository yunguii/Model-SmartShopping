<template>
  <div class="login">
    <van-nav-bar title="会员登录" left-arrow @click-left="$router.go(-1)" />
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input class="inp" maxlength="11" placeholder="请输入手机号码" type="text" v-model="tel">
        </div>
        <div class="form-item">
          <input class="inp" maxlength="5" placeholder="请输入图形验证码" type="text" v-model="vCode">
          <img v-if="picUrl" :src="picUrl" alt="" @click="getRes()">
        </div>
        <div class="form-item">
          <input class="inp" placeholder="请输入短信验证码" type="text" v-model="getMsg">
          <button @click="getNum()">
            {{ second===totalSecond ? '发送验证码' :  second+'秒后可以发送' }}
          </button>
        </div>
      </div>

      <div class="login-btn" @click="enter()">登录</div>
    </div>
  </div>
</template>

<script>
import { getPicData, getMessage, getLogin } from '@/api/login'
export default {
  name: 'LoginPage',
  data () {
    return {
      picCode: '',
      picKey: '',
      picUrl: '',
      tel: '',
      vCode: '',
      getMsg: '',
      totalSecond: 60,
      second: 60,
      timeid: null
    }
  },
  destroyed () {
    clearInterval(this.timeid)
  },
  async created () {
    this.getRes()
  },
  methods: {
    async getRes () {
      const { data } = await getPicData()
      this.picKey = data.data.key
      this.picUrl = data.data.base64
      this.$toast('获取图形验证码成功')
    },
    vaildFn () {
      if (!/^1[3-9]\d{9}$/.test(this.tel)) {
        this.$toast('请输入正确的手机号码')
        return false
      }
      if (!/^\w{4}$/.test(this.vCode)) {
        this.$toast('请输入正确的图像验证码')
        return false
      }
      return true
    },
    async getNum () {
      if (!this.vaildFn()) {
        return
      }
      await getMessage(this.picCode, this.picKey, this.mobile)
      this.$toast('短信验证码发送成功')
      if (this.second === this.totalSecond && !this.timeid) {
        this.timeid = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            clearInterval(this.timeid)
            this.timeid = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    async enter () {
      if (!this.vaildFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.getMsg)) {
        this.$toast('请输入正确的短信验证码')
        return
      }
      const res = await getLogin(this.tel, this.getMsg)
      console.log(res.data.data)
      this.$store.commit('user/changeInfo', res.data.data)
      const url = this.$route.query.backUrl || '/'
      this.$router.replace(url)
      this.$toast('登录成功')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
