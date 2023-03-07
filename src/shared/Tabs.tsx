import { defineComponent, PropType } from 'vue';
export const Tabs = defineComponent({
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