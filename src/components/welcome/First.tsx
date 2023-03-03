import { useRouter } from 'vue-router';
import { useSwipe } from '../../hooks/useSwipe';
import s from './welcome.module.scss';
import {  defineComponent, ref, watchEffect } from 'vue';
export const First = defineComponent({
    setup() {
        const router = useRouter()
        const div = ref<HTMLDivElement>()
        const { swiping, direction } = useSwipe(div,{
            beforeStart: e => e.preventDefault()
        })
        watchEffect(() => {
            if (swiping.value && direction.value === 'left') {
                router.push('/welcome/2')
            }
        })
        return () => (<div class={s.card} ref={div}>
            <svg>
                <use xlinkHref='#pig'></use>
            </svg>
            <h2>会挣钱<br />还会省钱</h2>
        </div>)
    }
})
