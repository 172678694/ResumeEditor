Vue.component('resume',{
    props:['mode'],
    data(){
        return {
            previewResume:{},
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
    computed:{
        displayResume(){
            return this.mode==='preview' ? this.previewResume:this.resume
        }
    },
    template:`
    <div class="resume">
    <section class="profile">
        <h1><editable-span v-bind:disabled="mode==='preview'" v-bind:value="displayResume.name" v-on:edit="onEdit('name',$event)"></editable-span></h1>
        <p>应聘职位：<editable-span v-bind:disabled="mode==='preview'" v-bind:value="displayResume.jobTitle" v-on:edit="onEdit('jobTitle',$event)"></editable-span></p>
        <p class="description">
            <editable-span v-bind:disabled="mode==='preview'" v-bind:value="displayResume.birthday" v-on:edit="onEdit('birthday',$event)"></editable-span>
            | 
            <editable-span v-bind:disabled="mode==='preview'" v-bind:value="displayResume.gender" v-on:edit="onEdit('gender',$event)"></editable-span>
            | 
            <editable-span v-bind:disabled="mode==='preview'" v-bind:value="displayResume.email" v-on:edit="onEdit('email',$event)"></editable-span>
            | 
            <editable-span v-bind:disabled="mode==='preview'" v-bind:value="displayResume.phone" v-on:edit="onEdit('phone',$event)"></editable-span>
        </p>
    </section>
    <section class="skill">
        <h2>技能</h2>
        <ul>
            <li v-for="skill,index in displayResume.skills" style="position: relative;">
                <editable-span v-bind:disabled="mode==='preview'" v-bind:value="skill.name"  v-on:edit="onEdit('skills['+index+'].name',$event)" class="name"></editable-span>
                <div class="description" >
                    <editable-span v-bind:disabled="mode==='preview'" v-bind:value="skill.description"  v-on:edit="onEdit('skills['+index+'].description',$event)" ></editable-span>
                </div>
                <span class="remove" v-if="index>3&&mode==='edit'" @click="removeSkill(index)" >删除</span>
            </li>
        </ul>
        <div class="addIcon" @click="addSkill" v-if="mode==='edit'">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-add"></use>
            </svg>
        </div>
    </section>
    <section class="project">
        <h2>项目经历</h2>
        <ol>
            <li v-for="project,index in displayResume.projects">
                <header>
                    <div class="start">
                        <h3 class="name">
                            <editable-span v-bind:disabled="mode==='preview'" v-bind:value="project.name" v-on:edit="onEdit('projects['+index+'].name',$event)" ></editable-span>  
                        </h3>
                        <span class="link"><editable-span v-bind:disabled="mode==='preview'" v-bind:value="project.link" v-on:edit="onEdit('projects['+index+'].link',$event)" ></editable-span>  </span>
                    </div>
                    <div class="end">
                        <editable-span v-bind:disabled="mode==='preview'"  class="keyword" v-bind:value="project.keyword" v-on:edit="onEdit('projects['+index+'].keyword',$event)" ></editable-span>  
                    </div>
                </header>
                <p class="description"><editable-span v-bind:disabled="mode==='preview'" v-bind:value="project.description" v-on:edit="onEdit('projects['+index+'].description',$event)" ></editable-span></p>
                <span class="remove" v-if="index>1&&mode==='edit'" @click="removeProject(index)" >删除</span>
            </li>
        </ol>
        <div class="addIcon" @click="addProject" v-if="mode==='edit'" >
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-add"></use>
                </svg>
        </div>
    </section>
    </div>
    `,
    methods:{
        onEdit(key,value){
            let regex=/\[(\d+)\]/g //key=skills[0].name
            key=key.replace(regex,(match,number)=>`.${number}`) //key=skills.0.name
            let keys=key.split('.') //['skills','0','name']
            console.log(keys)
            let result=this.resume //this.resume的引用
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
        addProject(){
            this.resume.projects.push({name:'项目名称',link:'http://',keyword:'请填写关键字',description:'请添加项目经历描述'})
        },
        removeProject(index){
        this.resume.projects.splice(index,1)
        },
        addSkill(){
        this.resume.skills.push({name:'请填写技能名称',description:'请填写技能描述'})
        },
        removeSkill(index){
        this.resume.skills.splice(index,1)
        },

    }
})