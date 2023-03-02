import { defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
import pig from '../../assets/icons/pig.svg'
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
export const First = defineComponent({
    setup: (props, context) => {
        const slots = {
            icon: () => <img src={pig} />,
            title: () => <h1>会挣钱<br />还会省钱</h1>,
            buttons: () => <>
                <RouterLink to='/start' class={s.fake}>跳过</RouterLink>
                <RouterLink to='/welcome/2'>下一页</RouterLink>
                <RouterLink to='/start'>跳过</RouterLink></>
        }

        return () => (
            <WelcomeLayout v-slots={slots}></WelcomeLayout>
        )
    }
})