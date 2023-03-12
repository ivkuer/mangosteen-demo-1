import { defineComponent, PropType } from 'vue';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div></div>
    )
  }
})