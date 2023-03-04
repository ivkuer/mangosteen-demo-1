import { defineComponent } from 'vue';
import s from './button.module.scss'
export const Button = defineComponent({
    setup: (props, context) => {
        return () => (
            <button class={s.button}>
                {context.slots.default?.()}
            </button>
        )
    }
})