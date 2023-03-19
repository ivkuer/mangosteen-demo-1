import { defineComponent, PropType } from 'vue';
export const Money = defineComponent({
  props: {
    amount: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup: (props, context) => {
    const addZero = (n: number) => {
    const nStr =  n.toString()
    const dotIndex = nStr.indexOf('.')
    if (dotIndex < 0) {
      return nStr + '00'
    } else if (nStr.substring(dotIndex).length === 2) {
      return nStr + '0'
    } else {
      return nStr
    }
    }
    return () => (
      <span>{addZero(props.amount / 100)}</span>
    )
  }
})