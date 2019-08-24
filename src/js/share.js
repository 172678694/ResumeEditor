window.Share={
    props:['shareLink'],
    data(){
        return {
            currentUser:{},
            shareLink:''
        }
    },
    template:`
    <div  class="shareLink" v-cloak>
    <div class="wrapper">
        <h2>请把下面链接分享给面试官</h2>
        <textarea readonly>
            {{shareLink}}
        </textarea>
        <span class="close" @click="onClickClose" >x</span>
    </div>
    </div>`,
    methods:{
        onClickClose(){
            this.$router.push('/')
        }
    },
    created:function(){
        let currentUser=AV.User.current()
        if(currentUser){
            this.currentUser=currentUser.toJSON()
            this.shareLink=location.origin+ location.pathname+'?user_id='+this.currentUser.objectId
        }
    }
}
Vue.component('share',window.Share)
