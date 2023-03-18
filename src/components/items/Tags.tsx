import { defineComponent, PropType } from 'vue';
import s from './Tags.module.scss';
import { Icon } from '../../shared/Icon';
import { Button } from '../../shared/Button';
import { useTags } from '../../shared/useTags';
import { http } from '../../shared/Http';
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: (props, context) => {
    const {tags, hasMore, page, fetchTags} = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {kind: props.kind, _mock: 'tagIndex', page: page + 1})
    })
    return () => (<>
      <div class={s.tags_wrapper}>
        <div class={s.tag}>
          <div class={s.sign}>
            <Icon name="add" class={s.createTag} />
          </div>
          <div class={s.name}>新增</div>
        </div>
        {tags.value.map((tag) => (
          <div class={[s.tag, s.selected]}>
            <div class={s.sign}>{tag.sign}</div>
            <div class={s.name}>{tag.name}</div>
          </div>
        ))}
      </div>
      <div class={s.more}>
        {
          hasMore.value ?
            <Button onClick={fetchTags}>加载更多</Button> :
            <span>暂无</span>
        }
      </div>
    </>
    )
  }
})