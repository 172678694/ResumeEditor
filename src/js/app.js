window.App = {
    template: `
    <div>
        <app-aside :mode="mode" :user="currentUser" @save="onClickSave" @share="onClickShare" @print="print" @change-skin="changeSkin" @logout="onLogOut"></app-aside>
        <main>
            <resume v-bind:mode="mode"></resume>  
        </main>
        <button class='preview' v-if="mode==='preview'" @click="mode='edit'">退出预览</button>
    </div>
    `,
    data() {
        return {
            shareLink: '',
            previewUser: { objectId: undefined },
            currentUser: {},
            mainClass: '',
            mode: 'edit' //'preview'
        }
    },
    methods: {
        onClickShare() {
            if (!this.currentUser.objectId) {
                alert('请先登录!')
                this.logInVisible = true
            } else {
                this.shareVisible = true
            }
        },
        print() {
            window.print()
        },
        onClickSave() {
            let currentUser = this.currentUser
            console.log(currentUser)
            if (!currentUser.objectId) {
                this.$router.push('/login')
            } else {
                this.saveResume()
            }
        },
        changeSkin() {
            this.skinPickerVisible = true
        },
        saveResume() {
            let currentUser = this.currentUser
            let user = AV.Object.createWithoutData('User', currentUser.objectId)
            user.set('resume', this.resume)
            user.save().then(() => {
                alert('保存成功')
            }, (error) => {
                alert('保存失败')
            })
        },
        onLogOut() {
            AV.User.logOut()
            alert('注销成功')
            window.location.reload()
        },
        getResume(user) {
            var query = new AV.Query('User')
            return query.get(user.objectId).then((user) => {
                let resume = user.toJSON().resume
                return resume
            })
        },
        onLogIn(user) {
            let currentUser = user.toJSON()
            this.currentUser.objectId = currentUser.objectId
            this.currentUser.email = currentUser.email
            this.logInVisible = false
            app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
        },
        onSignUp(user) {
            this.currentUser = user.toJSON()
            this.signUpVisible = false
        }
    }
}
Vue.component('app', App)
