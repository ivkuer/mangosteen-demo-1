import { computed } from 'vue';
import { defineComponent, PropType } from 'vue';
import { Time } from './time';
export const Datetime = defineComponent({
  props: {
    value: {
      type: [String , Date] as PropType<string | Date>,
      required: true
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    }
  },
  setup: (props, context) => {
    const toDisplay = computed(() => {
      return new Time(props.value).format(props.format)
    })
    
    return () => (
      <span>{toDisplay.value}</span>
    )
  }
})