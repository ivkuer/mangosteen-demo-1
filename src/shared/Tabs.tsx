import { defineComponent, PropType } from 'vue';
import s from './Tabs.module.scss'
export const Tabs = defineComponent({
    props: {
        selected: {
            type: String as PropType<string>
        },
    },
    setup: (props, context) => {

        return () => {
            const arr = context.slots.default?.()
            if (!arr) return () => null
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].type !== Tab) {
                    throw new Error('tabs only tab')
                }
            }
            return <div class={s.tabs}>
                <ol class={s.tab_nav}>
                    {arr.map(item =>
                        <li class={item.props?.name === props.selected ? s.selected : ''}
                        onClick={() => context.emit('update:selected', item.props?.name)}
                        >
                            {item.props?.name}
                        </li>
                    )}
                </ol>
            </div>
        }
    }
})

export const Tab = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        return () => (
            <div></div>
        )
    }
})