import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import s from './TagCreate.module.scss';
import { Button } from '../../shared/button';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { toRaw } from 'vue';
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: 'x',
    })
    const onSubmit = (e: Event) => {
      e.preventDefault()
      const rules = [
        {key: 'name', required: true, message: '必填'},
        {key: 'name', pattern: /^.{1,4}$/, message: '只能填1 ~ 4个字符'},
        {key: 'sign', required: true, message: '必填'},
      ]      
    }
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="left" onClick={() => { }} />,
        default: () => (
          <form class={s.form} onSubmit={onSubmit}>
          <div class={s.formRow}>
            <label class={s.formLabel}>
              <span class={s.formItem_name}>标签名</span>
              <div class={s.formItem_value}>
                <input v-model={formData.name} class={[s.formItem, s.input, s.error]}></input>
              </div>
              <div class={s.formItem_errorHint}>
                <span>必填</span>
              </div>
            </label>
          </div>
          <div class={s.formRow}>
            <label class={s.formLabel}>
              <span class={s.formItem_name}>符号 {formData.sign}</span>
              <div class={s.formItem_value}>
                <EmojiSelect v-model={formData.sign} class={[s.formItem, s.emojiList, s.error]} />
              </div>
              <div class={s.formItem_errorHint}>
                <span>必填</span>
              </div>
            </label>
          </div>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
          <div class={s.formRow}>
            <div class={s.formItem_value}>
              <Button class={[s.formItem, s.button]}>确定</Button>
            </div>
          </div>
        </form>
        )
      }}</MainLayout>
    )
  }
})