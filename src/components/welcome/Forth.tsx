import { defineComponent } from 'vue';
import s from './WelcomeLayout.module.scss';
import cloud from '../../assets/icons/cloud.svg'
import { RouterLink } from 'vue-router';
import { WelcomeLayout } from './WelcomeLayout';
export const Forth = defineComponent({
    setup: (props, context) => {
        return () => (
            <WelcomeLayout>
                {
                    {
                        icon: () => <img src={cloud} />,
                        title: () => <h2>会挣钱<br />还有会省钱</h2>,
                        buttons: () => <>
                            <RouterLink to='/start' class={s.fake}>跳过</RouterLink>
                            <RouterLink to='/welcome/1'>完成</RouterLink>
                            <RouterLink to='/start' class={s.fake}>跳过</RouterLink>
                        </>
                    }
                }
            </WelcomeLayout>
        )
    }
})