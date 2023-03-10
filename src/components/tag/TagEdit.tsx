import { defineComponent, PropType, reactive } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { EmojiSelect } from '../../shared/EmojiSelect';
import { Rules, validate } from '../../shared/validate';
import s from './Tag.module.scss';
import { Icon } from '../../shared/Icon';
import { Button } from '../../shared/Button';
import { TagForm } from './TagForm';
export const TagEdit = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="left" onClick={() => { }} />,
        default: () => (<>
          <TagForm />
          <div class={s.actions}>
            <Button level='danger' class={s.removeTags}>删除标签</Button>
            <Button level='danger' class={s.removeTagsAndItems}>删除标签和记账</Button>
          </div>
          </>
        )
      }}</MainLayout>
    )
  }
})