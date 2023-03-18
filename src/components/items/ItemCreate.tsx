import { defineComponent, PropType, ref } from "vue";
import s from "./ItemCreate.module.scss";
import { MainLayout } from "../../layouts/MainLayout";
import { Icon } from "../../shared/Icon";
import { Tabs, Tab } from "../../shared/Tabs";
import { InputPad } from "./InputPad";
import { onMounted } from "vue";
import { http } from "../../shared/Http";
import { Button } from "../../shared/Button";
import { useTags } from "../../shared/useTags";
import { Tags } from "./Tags";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { Dialog } from "vant";
import { AxiosError } from "axios";
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formDate = reactive({
      kind: '支出',
      tags_id: [],
      amount: 0,
      happen_at: new Date().toISOString()

    })
  const router = useRouter()
  const onError = (error: AxiosError<ResourceError>) => {
    if (error.response?.status === 422) {
      Dialog.alert({
        title: '错误',
        message: Object.values( error.response.data.errors).join('\n'),
      })
    }
    throw error
  }
    const onSubmit = async () => {
     await http.post<Resources<Item>>('/items', formDate, {params: {_mock: 'itemCreate'}})
      .catch(onError)
     router.push('/items')
    }
      
    return () => (
      <MainLayout>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={formDate.kind} class={s.tabs}>
                  <Tab name="支出">
                   <Tags kind="expenses" v-model:selected={formDate.tags_id[0]}/>
                  </Tab>
                  <Tab name="收入" >
                   <Tags kind='income' v-model:selected={formDate.tags_id[0]}/>
                  </Tab>
                 
                </Tabs>
                <div>
                    {JSON.stringify(formDate)}
                  </div>
                <div class={s.inputPad_wrapper}>
                  <InputPad 
                  v-model:happenAt={formDate.happen_at}
                  v-model:amount={formDate.amount}
                  onSubmit={onSubmit}
                  />
                </div>
              </div>
            </>
          ),
        }}
      </MainLayout>
    );
  },
});
