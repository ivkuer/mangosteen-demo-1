import { defineComponent, PropType } from 'vue'
import { Center } from './Center'
import s from './ComingSoon.module.scss'
import { Icon } from './Icon'
import { Button } from './Button'
import { useRouter } from 'vue-router'
export const ComingSoon = defineComponent({
  setup: (props, context) => {
    const router = useRouter()
    const onclick = () => {
        router.back()
    }
    return () => (
     
      <div>
        <Center class={s.pig_wrapper}>
          <Icon name="saveMoney" class={s.pig} />
        </Center>
        <p class={s.text}>敬请期待</p>
        <p>
          <Button onClick={onclick}>返回</Button>
        </p>
      </div>
    )
  }
})

export default ComingSoon
