window.SignUp={
    props:[],
    data(){
        return {
            signUp:{
                email:'',
                password:'',
                password_confirmation:''
            }
        }
    },
    template:`
    <div class="signUp" v-cloak>
    <form class="signUpForm"  @submit.prevent="onSignUp">
        <h1>注册</h1>
        <div class="row">
            <label>邮箱
                <input type="text" name="userName" v-model="signUp.email">
            </label>
        </div>
        <div class="row">
            <label>密码
                <input type="password" name="password" v-model="signUp.password">
            </label>
        </div>
        <div class="row">
                <label>确认密码
                    <input type="password" name="password_confirmation" v-model="signUp.password_confirmation" >
                </label>
        </div>
        <div class="row">
            <button type="submit">提交</button>
        </div>
        <router-link to="/">关闭</router-link>
        <router-link to="/login">登录</router-link>

    </form>
    </div>`,
    methods:{
        onSignUp(e){
            let user = new AV.User();
            user.setUsername(this.signUp.email)
            user.setPassword(this.signUp.password)
            user.setEmail(this.signUp.email);
            user.signUp().then((user)=>{
              console.log('注册成功。objectId：' + user.id)
              alert('注册成功')
              this.$emit('signup',user)
            //   this.signUpVisible=false
            //   currentUser=user.toJSON()
            //   this.currentUser=currentUser
            }, (error)=>{
              console.dir(error)
              // 注册失败（通常是因为用户名已被使用）
              if(error.code===203){
                alert(error.rawMessage)
              }
            })
        }
    }
}
Vue.component('signup',window.SignUp)