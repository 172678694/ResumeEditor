new Vue({
    el: '#app',
    
    data: {
        resume:{
           name:'姓名',
           birthday:'生日',
           jobTitle:'前端工程师',
            gender:'女',
            email:'172678694@qq.com',
            phone:'15603002818'
        },
        logInVisible:false,
        signUpVisible:false,
        signUp:{
          email:'',
          password:'',
          password_confirmation:''
        },
        logIn:{
          userName:'',
          password:''
        }

    },
    methods:{
      onEdit(key,value){
        this.resume[key]=value
      },
      onClickSave(){
        var currentUser = AV.User.current()
        if (!currentUser) {
          this.logInVisible=true
        } else {
          console.log(currentUser)
          this.saveResume(currentUser)
        } 
      },
      //onclickSave
      saveResume(user){
        console.log(this.resume)
        var user = AV.Object.createWithoutData('User', user.id)
        user.set('resume', this.resume)
        user.save();
      },
      onSendVCode(){
        AV.Cloud.requestSmsCode(this.signup.phone).then(function(sucess){},function(error){console.log(error)})
      },
      onLogIn(){
        AV.User.logIn(this.logIn.userName, this.logIn.password).then((user)=>{
          // 登录成功
          this.logInVisible=false
        }, function (error) {
          // 登录失败（可能是密码错误）
          if(error.code===211){
            alert('邮箱不存在')
          }else if(error.code===210){
            alert('邮箱和密码不匹配')
          }
        });
      },
      onSignUp(e){
      var user = new AV.User();
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email);
      user.signUp().then(function (user) {
        console.log('注册成功。objectId：' + user.id)
      }, function (error) {
        // 注册失败（通常是因为用户名已被使用）
      })
      },
      onLogOut(){
        var currentUser = AV.User.current()
        if(currentUser){
          AV.User.logOut()
          alert('登出成功')
        }
      }
    }
  })
    