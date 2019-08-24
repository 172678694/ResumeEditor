window.App = {
    template: `
    <div class="siteWrapper">
        <app-aside @loginSuccess="onLogIn" :mode="mode" :user="currentUser" :shareLink="shareLink" :resume="resume"  @change-skin="changeSkin"  @signup="onSignUp"></app-aside>
        <main>
            <resume v-bind:mode="mode" :resume="resume" :previewResume="previewResume" @finishEdit="onFinishEdit"></resume>  
        </main>
        <button class='preview' v-if="mode==='preview'" @click="mode='edit'">退出预览</button>
    </div>
    `,
    data() {
        return {
            shareLink: '',
            previewUser: {objectId: undefined},
            previewResume:{},
            currentUser: {},
            mainClass: '',
            mode: 'edit', //'preview'
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
                 ],
                 projects:[
                   {name:'项目名称',link:'http://',keyword:'请填写关键字',description:'请添加项目经历描述'},
                   {name:'项目名称',link:'http://',keyword:'请填写关键字',description:'请添加项目经历描述'},
                 ]
             }
        }
    },
    methods: {
        onFinishEdit(resume){
            this.resume=resume
        },
        getResume(user) {
            var query = new AV.Query('User')
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                return resume
                
            })
          },
 

        changeSkin() {
            this.skinPickerVisible = true
        },
        onLogIn(user) {
            let currentUser = user.toJSON()
            this.currentUser.objectId = currentUser.objectId
            this.currentUser.email = currentUser.email
            this.logInVisible = false
            this.shareLink = location.origin + location.pathname + '?user_id=' + this.currentUser.objectId
        },
        onSignUp(user) {
            this.currentUser = user.toJSON()
            this.signUpVisible = false
        }
    },
    created:function(){
        let currentUser=AV.User.current()
        let search=location.search
        let regex=/user_id=([^&]+)/
        let matches = search.match(regex)
        let userId
        if(currentUser){
            console.log('edit模式')
            this.currentUser=currentUser.toJSON()
            this.shareLink=location.origin+ location.pathname+'?user_id='+this.currentUser.objectId
            this.getResume(this.currentUser).then((resume)=>{
                if(resume){
                    this.resume=resume
                }
            })
        }else if(!currentUser&&matches){
            //获取预览用户
            console.log('preview模式')
              userId=matches[1]
              this.mode = 'preview'
              this.getResume({objectId:userId}).then(resume=>{
                  this.previewResume=resume
              })
        } 
    }
}
Vue.component('app', window.App)

