import { defineComponent, PropType, ref } from 'vue';
import s from './Tags.module.scss';
import { Icon } from '../../shared/Icon';
import { Button } from '../../shared/Button';
import { useTags } from '../../shared/useTags';
import { http } from '../../shared/Http';
import { RouterLink, useRoute, useRouter } from 'vue-router';
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<string>,
      required: true
    },
    selected: Number
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const {tags, hasMore, page, fetchTags} = useTags((page) => {
      return http.get<Resources<Tag>>('/tags', {kind: props.kind, _mock: 'tagIndex', page: page + 1})
    })
    const onSelect = (tag: Tag) => { 
      context.emit('update:selected', tag.id)
    }
    const timer = ref<number>()
    const currentTag = ref<HTMLDivElement>()
    const router = useRouter()
    const route = useRoute()
    const onLongPress = (tagId: Tag['id']) => {
      router.push({path: `/tags/${tagId}/edit`, query: {kind: 'expense', route_to: route.fullPath}}) 
    }
    const onTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.currentTarget as HTMLDivElement
      timer.value = setTimeout(() => {
        onLongPress(tag.id)
      }, 500)
    }
    const onTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if (currentTag.value !== pointedElement && currentTag.value?.contains(pointedElement) === false) {
        clearTimeout(timer.value)
      }
    }
    const onTouchEnd = (e: TouchEvent) => {
      clearTimeout(timer.value)
    }
    return () => (<>
      <div class={s.tags_wrapper} onTouchmove={onTouchMove}>
        <RouterLink to={`/tags/create?kind=${props.kind}`} class={s.tag}>
          <div class={s.sign}>
            <Icon name="add" class={s.createTag} />
          </div>
          <div class={s.name}>新增</div>
        </RouterLink>
        {tags.value.map((tag) => (
          <div class={[s.tag, props.selected === tag.id ? s.selected : '']}
          onClick={() => onSelect(tag)}
          onTouchstart={(e) => onTouchStart(e, tag)}
          onTouchend={onTouchEnd}
          >
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