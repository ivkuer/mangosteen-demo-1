import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import x from '../views/Welcome.module.scss'
import logo from '../assets/icons/mangosteen.svg'

export const Welcome = defineComponent({
    setup: (props, context) => {
        return () => (<div class={x.wrapper}>
            <header>
                <img src={logo} alt="" width={60} />
                <h1>山竹记账</h1>
            </header>
            <main><RouterView name='main'/></main>
            <footer><RouterView name="footer" /></footer>
        </div>
        )
    }
})