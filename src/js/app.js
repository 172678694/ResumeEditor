var app=new Vue({
    el: '#app',
    
    data: {
        logInVisible:false,signUpVisible:false,shareVisible:false,skinPickerVisible:false,
        shareLink:'',
        previewUser:{objectId:undefined},
        currentUser:{},
        mainClass:'',
        mode:'edit' //'preview'
    },
    methods:{
      onClickShare(){
        if(!this.currentUser.objectId){
          alert('请先登录!')
          this.logInVisible=true
        }else{
          this.shareVisible=true
        }
      },
      print(){
        window.print()
      },
      onClickSave(){
        let currentUser = this.currentUser
        console.log(currentUser)
        if (!currentUser.objectId) {
          this.logInVisible=true
        } else {
          this.saveResume()
        } 
      },
      changeSkin(){
        this.skinPickerVisible=true
      },
      saveResume(){
        let currentUser = this.currentUser
        let user = AV.Object.createWithoutData('User', currentUser.objectId)
        user.set('resume', this.resume)
        user.save().then(()=>{
          alert('保存成功')
        },(error)=>{
            alert('保存失败')
        })
      },
      onLogOut(){
          AV.User.logOut()
          alert('注销成功')
          window.location.reload()
      },
      getResume(user){
        var query = new AV.Query('User')
        return query.get(user.objectId).then((user)=> {
          let resume=user.toJSON().resume
         return resume
        })
      },
      onLogIn(user){
        let currentUser=user.toJSON()
        this.currentUser.objectId=currentUser.objectId
        this.currentUser.email=currentUser.email
        this.logInVisible=false
        app.shareLink=location.origin+ location.pathname+'?user_id='+app.currentUser.objectId
      },
      onSignUp(user){
        this.currentUser=user.toJSON()
        this.signUpVisible=false
      },

    },
    watch:{
      'currentUser.objectId':function(newValue,oldValue){
        if(newValue){
          this.getResume(this.currentUser).then((resume)=>{
            Object.assign(this.resume,resume)
          })
        }
      }
    }
  })

  //获取当前用户

  let currentUser=AV.User.current()
  if(currentUser){
    app.currentUser=currentUser.toJSON()
    app.shareLink=location.origin+ location.pathname+'?user_id='+app.currentUser.objectId
    app.getResume(app.currentUser).then((resume)=>{
      this.resume=resume
    })
  }

  //获取预览用户
  let search=location.search
  let regex=/user_id=([^&]+)/
  let matches = search.match(regex)
  let userId
  if(matches){
    userId=matches[1]
    app.mode = 'preview'
    app.getResume({objectId:userId}).then(resume=>{
      console.log('previewResume')
      console.log(resume)
     app.previewResume=resume
    })
  }