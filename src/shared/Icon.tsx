import { PropType, defineComponent } from 'vue';
import s from './Icon.module.scss'

export type IconName  = 'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig'| 'menu'| 'charts' | 'notify' | 'export' | 'notes'|  'left' | 'date'

export const Icon = defineComponent({
    props: {
        name: {
            type: String as PropType<IconName>,
            required: true
        }
    },
    setup: (props, context) => {
        return () => (
            <svg>
                <use xlinkHref={'#' + props.name}></use>
            </svg>
        )
    }
})