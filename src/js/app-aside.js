Vue.component('app-aside',{
    props:['mode','user','resume'],
    data:function(){
        return {
            currentUser:this.user,
            resume:this.resume,
        }
    },
    template:`
    <aside  v-if="mode==='edit'">
    <div class="upper">
        <ul>
            <li>
                <button @click="onClickSave" >保存</button>
            </li>
            <li>
                <button @click="onClickShare">分享</button>
            </li>
            <li>
                <button @click="onClickShare">打印</button>
            </li>
            <li>
                <button @click="$emit('change-skin')">换肤</button>
            </li>
        </ul>
    </div>
    <div class="down">
        <button @click="onLogOut" v-show="!!user.objectId">登出</button>
    </div>
    </aside>
    `,
    methods:{
        onClickSave() {
            if (!this.currentUser.objectId) {
                this.$router.push('/login')
            } else {
                this.saveResume()
            }
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
        onClickShare() {
            if (!this.currentUser.objectId) {
                alert('请先登录!')
                this.$router.push('/login')
            } else {

                this.$router.push('/share')
            }
        },
        onLogOut() {
            AV.User.logOut()
            alert('注销成功')
            window.location.reload()
        },
        print() {
            window.print()
        }
    }
})