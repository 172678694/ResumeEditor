Vue.component('app-aside',{
    props:['mode','user'],
    template:`
    <aside  v-if="mode==='edit'">
    <div class="upper">
        <ul>
            <li>
                <button @click="$emit('save')">保存</button>
            </li>
            <li>
                <button @click="$emit('share')">分享</button>
            </li>
            <li>
                <button @click="$emit('print')">打印</button>
            </li>
            <li>
                <button @click="$emit('change-skin')">换肤</button>
            </li>
        </ul>
    </div>
    <div class="down">
        <button @click="$emit('logout')" v-show="!!user.objectId">登出</button>
    </div>
    </aside>
    `
})