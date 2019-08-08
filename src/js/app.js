new Vue({
    el: '#app',
    
    data: {
        resume:{
           name:'杨琪匀',
           birthday:'199408',
           jobTitle:'前端工程师',
            gender:'女',
            email:'172678694@qq.com',
            phone:'15603002818'
        },
        loginVisible:false,
        signUpVisible:false,

    },
    methods:{
      onEdit(key,value){
        this.resume[key]=value
      },
      onClickSave(){
        var currentUser = AV.User.current();
        if (!currentUser) {
          this.loginVisible=true
        } else {
          this.saveResume()
        } 
      },
      saveResume(){

      },
      onLoginUp(){

      }
    }
  })
    