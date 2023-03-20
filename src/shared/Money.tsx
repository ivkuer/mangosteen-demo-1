import { defineComponent, PropType } from 'vue';

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

export const Money = defineComponent({
  props: {
    amount: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup: (props, context) => {
    return () => (
      <span>{addZero(props.amount / 100)}</span>
    )
  }
})

export const getMoney = (n: number) => {
  return addZero(n / 100)
}