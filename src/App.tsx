import { ref } from "vue";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import './App.scss'
export const App = defineComponent({
    setup() {
const count = ref(3)
return () => (<div>
    <RouterView />
</div>)
    }
})
