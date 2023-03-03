import { useRouter } from 'vue-router';
import { useSwipe } from '../../hooks/useSwipe';
import s from './welcome.module.scss';
import {  defineComponent, ref, watchEffect } from 'vue';
export const First = defineComponent({
    setup() {
        return () => (<div class={s.card}>
            <svg>
                <use xlinkHref='#pig'></use>
            </svg>
            <h2>会挣钱<br />还会省钱</h2>
        </div>)
    }
})
