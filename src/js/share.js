Vue.component('share',{
    props:['shareLink'],
    template:`
    <div  class="shareLink" v-cloak>
    <div class="wrapper">
        <h2>请把下面链接分享给面试官</h2>
        <textarea readonly>
            {{shareLink}}
        </textarea>
        <span class="close" @click="$emit('close-sharing')">x</span>
    </div>
    </div>`,
    methods:{

    }
})