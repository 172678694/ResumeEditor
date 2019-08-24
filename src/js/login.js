window.Login={
    props:[],
    data(){
        return {
            logIn:{
                userName:'',
                password:''
            }
        }
    },
    template:`
    <div  class="logIn" v-cloak>
    <form class="logInForm" @submit.prevent="onLogIn">
            <h1>登录</h1>
            <div class="row">
                <label>用户名
                    <input type="text" name="userName" v-model="logIn.userName">
                </label>
            </div>
            <div class="row">
                <label>密码
                    <input type="password" name="password" v-model="logIn.password">
                </label>
            </div>
            <div class="row">
                <input type="submit" value="提交">
            </div>
            <router-link to="/">关闭</router-link>
            <router-link to="/signUp">注册</router-link>
    </form>
</div>`,
    methods:{
        onLogIn(){
            AV.User.logIn(this.logIn.userName, this.logIn.password).then((user)=>{
              // 登录成功
              alert('登录成功')
              this.$emit('loginSuccess',user)
              this.$router.push('/')
            //   this.currentUser=user.toJSON()
            //   this.logInVisible=false
            //   window.location.reload()
            //   this.getResume(this.currentUser)
            }, (error)=>{
              // 登录失败（可能是密码错误）
              if(error.code===211){
                alert('邮箱不存在')
              }else if(error.code===210){
                alert('邮箱和密码不匹配')
              }
            })
          }
    }
}
Vue.component('login',window.Login)