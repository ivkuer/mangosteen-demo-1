import { defineComponent, PropType, ref, watch } from 'vue';
import s from './ItemSummary.module.scss';
import { FloatButton } from '../../shared/FloatButton';
import { http } from '../../shared/Http';
import { onMounted } from 'vue';
import { Button } from '../../shared/Button';
import { getMoney, Money } from '../../shared/Money';
import { Datetime } from '../../shared/Datetime';
import { reactive } from 'vue';
import { Center } from '../../shared/Center';
import { Icon } from '../../shared/Icon';
import { RouterLink } from 'vue-router';
import { useAfterMe } from '../../hooks/useAfterMe';
import { useItemStore } from '../../stores/useItemStore';
import { storeToRefs } from 'pinia';
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false
    },
    endDate: {
      type: String as PropType<string>,
      required: false
    }
  },
  setup: (props, context) => {
    if (!props.startDate || !props.endDate) {
      return () => <div>请选择时间范围</div>
    }
    const itemStore = useItemStore(['items', props.startDate, props.endDate])
    const { fetchItems, fetchNextPage } = itemStore
    const {items, hasMore} = storeToRefs(itemStore)
    useAfterMe(() => fetchItems(props.startDate, props.endDate))

    watch([() => props.startDate, () => props.endDate] , () => {
      itemStore.$reset()
      fetchItems()
    })

    const itemBalance = reactive({
      expenses: 0, income: 0, balance: 0
    })
    const fetchItemBalance = async () => {
      if (!props.startDate || !props.endDate) return
      const response = await http.get('/items/balance', {
        happen_after: props.startDate,
        happen_before: props.endDate,        
      }, {
        _mock: 'itemIndexBalance'
      })
      Object.assign(itemBalance, response.data)
    }
    useAfterMe(fetchItemBalance)
    watch([() => props.startDate, () => props.endDate] , () => {
      Object.assign(itemBalance, {
        expenses: 0, income: 0, balance: 0
      })
      fetchItemBalance()
    })
    
    return () => ( 
    <div class={s.wrapper}>
      {
        (items.value && items.value.length > 0) ? 
          <>
            <ul class={s.total}>
              <li>
                <span>收入</span>
                <span>{getMoney(itemBalance.income) }</span>
              </li>
              <li>
                <span>支出</span>
                <span>{getMoney(itemBalance.expenses)}</span>
              </li>
              <li>
                <span>净收入</span>
                <span>{getMoney(itemBalance.balance)}</span>
              </li>
            </ul>
            <ol class={s.list}>
              {items.value.map((item) => (
                <li>
                  <div class={s.sign}>
                    <span>{item.tags && item.tags.length > 0 ? item.tags[0].sign : '💰'}</span>
                  </div>
                  <div class={s.text}>
                    <div class={s.tagAndAmount}>
                      <span class={s.tag}>{ item.tags && item.tags.length > 0 ? item.tags[0].name : '未分类'}</span>
                      <span class={s.amount}>
                        ￥<Money amount={item.amount}/>
                      </span>
                    </div>
                    <div class={s.time}><Datetime value={item.happen_at} /></div>
                  </div>
                </li>
              ))}
            </ol>
            <div class={s.more}>
              {hasMore.value ?
                <Button onClick={() => fetchNextPage(props.startDate, props.endDate)}>加载更多</Button> :
                <span>没有更多</span>
              }
              </div>
          </>
         : (
          <>
           <Center class={s.pig_wrapper}>
                            <Icon name="pig" class={s.pig} />
                        </Center>
                        <div class={s.button_wrapper}>
                            <RouterLink to='/items/create'>
                                <Button class={s.button}>开始记账</Button>
                            </RouterLink>
                        </div>        
          </>
        )
      }
      <RouterLink to='/items/create'>
                            <FloatButton iconName='add'></FloatButton>
                        </RouterLink>
    </div>
  )
}
})