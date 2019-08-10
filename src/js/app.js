var app=new Vue({
    el: '#app',
    
    data: {
        resume:{
           name:'姓名',
           birthday:'生日',
           jobTitle:'前端工程师',
            gender:'女',
            email:'172678694@qq.com',
            phone:'15603002818',
            skills:[
              {name:'请填写技能名称',description:'请填写技能描述',index:''},
              {name:'请填写技能名称',description:'请填写技能描述'},
              {name:'请填写技能名称',description:'请填写技能描述'},
              {name:'请填写技能名称',description:'请填写技能描述'}
            ]
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
        },
        currentUser:{
          objectId:'',
          email:''
        }
    },
    methods:{
      addSkill(){
        this.resume.skills.push({name:'请填写技能名称',description:'请填写技能描述'})
      },
      removeSkill(index){
        this.resume.skills.splice(index,1)
      },
      onEdit(key,value){
        console.log(key)
        console.log(value)
        let regex=/\[(\d+)\]/g //key=skills[0].name
        key=key.replace(regex,(match,number)=>`.${number}`) //key=skills.0.name
        let keys=key.split('.') //['skills','0','name']
        console.log(keys)
        let result=this.resume
        for(let i=0;i<keys.length;i++){
          //i=0 result=this.resume.skills
          //i=1 result=this.resume.skills[0]
          if(i===keys.length-1){
            result[keys[i]]=value
            console.log(result[keys[i]])
          }
          result=result[keys[i]]
        }
      },
      onClickSave(){
        let currentUser = AV.User.current()
        console.log(currentUser)
        if (!currentUser) {
          this.logInVisible=true
        } else {
          this.saveResume()
        } 
      },
      //onclickSave
      saveResume(){
        let currentUser = AV.User.current().toJSON()
        let user = AV.Object.createWithoutData('User', currentUser.objectId)
        user.set('resume', this.resume)
        user.save().then(()=>{
          alert('保存成功')
        },(error)=>{
            alert('保存失败')
        })
      },
      onSendVCode(){
        AV.Cloud.requestSmsCode(this.signup.phone).then(function(sucess){},function(error){console.log(error)})
      },
      onLogIn(){
        AV.User.logIn(this.logIn.userName, this.logIn.password).then((user)=>{
          // 登录成功
          alert('登录成功')
          let currentUser=user.toJSON()
          this.currentUser.objectId=currentUser.objectId
          this.currentUser.email=currentUser.email
          this.logInVisible=false
        }, (error)=>{
          // 登录失败（可能是密码错误）
          if(error.code===211){
            alert('邮箱不存在')
          }else if(error.code===210){
            alert('邮箱和密码不匹配')
          }
        })
      },
      onSignUp(e){
      let user = new AV.User();
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email);
      user.signUp().then((user)=>{
        console.log('注册成功。objectId：' + user.id)
        alert('注册成功')
        this.signUpVisible=false
        currentUser=user.toJSON()
        this.currentUser.objectId=currentUser.objectId
        this.currentUser.email=currentUser.email
      }, (error)=>{
        console.dir(error)
        // 注册失败（通常是因为用户名已被使用）
        if(error.code===203){
          alert(error.rawMessage)
        }
      })
      },
      onLogOut(){
          AV.User.logOut()
          alert('注销成功')
          window.location.reload()
      },
      getResume(){
        var query = new AV.Query('User')
        query.get(this.currentUser.objectId).then((user)=> {
          let resume=user.toJSON().resume
          Object.assign(this.resume,resume)
        })
      }
    }
  })
let currentUser=AV.User.current()
if(currentUser){
  currentUser = currentUser.toJSON()
  app.currentUser.objectId=currentUser.objectId
  app.currentUser.email=currentUser.email
  app.getResume()
}