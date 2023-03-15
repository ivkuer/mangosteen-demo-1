import { defineComponent, PropType, ref } from 'vue';
import { Icon } from './Icon';
import s from './Overlay.module.scss'
import { RouterLink, useRouter } from 'vue-router';
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const close = () => {
      props.onClose?.()
    }
    const router = useRouter()
    const link = () => {
      router.push('/sign_in')
    }
    return () => (<>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section>
          <h2>未登录用户</h2>
          <p onClick={link}>点击这里登录</p>
        </section>
        <nav>
          <ul>
            <li>
              <RouterLink to="/statistics" class={s.action}>
                <Icon name="charts" class={s.icon} />
                <span>统计图表</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/export" class={s.action}>
                <Icon name="export" class={s.icon} />
                <span>导出数据</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/notify" class={s.action}>
                <Icon name="notify" class={s.icon} />
                <span>记账提醒</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
    )
  }
})

export const OverlayIcon = defineComponent({

  setup: (props, context) => {
    const overlayVisile = ref(false)
    const onClickMenu = () => {
      overlayVisile.value = !overlayVisile.value
    }
    return () => (
      <>
        <Icon name="menu" class={s.icon} onClick={onClickMenu} />
        {overlayVisile.value &&
          <Overlay onClose={() => overlayVisile.value = false} />
        }</>
    )
  }
})