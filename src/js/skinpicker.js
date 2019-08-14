Vue.component('skin-picker',{
    props:[],
    template:`
    <div class="skinPicker" v-cloak>
        <button @click="setTheme('default')">默认</button>
        <button @click="setTheme('dark')">暗黑</button>
        <span class="close" @click="$emit('close-skinpicker')">x</span>
    </div>`,
    methods:{
        setTheme(name){
            document.body.className=name
        }
    }
})