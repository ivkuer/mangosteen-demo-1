import { defineComponent, PropType, ref } from 'vue';
import { Icon } from './Icon';
import s from './Overlay.module.scss'
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { Dialog } from 'vant';
import { useMeStore } from '../stores/useMeStore';
import { storeToRefs } from 'pinia';
export const Overlay = defineComponent({
  props: {
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const meStore = useMeStore()
    const {mePromise} = storeToRefs(meStore)
    const close = () => {
      props.onClose?.()
    }
    const route = useRoute()
    const router = useRouter()
    const me = ref<User>()
    onMounted(async () => {
       const response = await mePromise?.value
       me.value = response?.data.resource
    }) 
    const onSignOut = async () => {
      await Dialog.confirm({
        title: '退出',
        message: '你确定要退出登录吗？'
      })
      localStorage.removeItem('jwt')
      if (route.path === '/items') {
        window.location.reload()
      } else {
        router.push('/items')
      }

      console.log(route.path);
      
    }
    
    return () => (<>
      <div class={s.mask} onClick={close}></div>
      <div class={s.overlay}>
        <section class={s.currentUser}>
          {me.value ? 
          (
          <div>
            <h2 class={s.email}>{me.value.email}</h2>
            <p onClick={onSignOut}>点击这里注销</p>
          </div>
          ) : 
          ( 
          <RouterLink to={`/sign_in?return_to=${route.fullPath}`}>
          <h2>未登录用户</h2>
          <p>点击这里登录</p>
          </RouterLink>
          )}
         
        </section>
        <nav>
          <ul>
          <li>
              <RouterLink to="/items" class={s.action}>
                <Icon name="saveMoney" class={s.icon} />
                <span>开始记账</span>
              </RouterLink>
            </li>
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
      console.log(overlayVisile.value);
      
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