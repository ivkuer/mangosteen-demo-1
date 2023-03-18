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
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const refKind = ref("支出");
    const refTagId = ref<number>()
    const refHappenAt = ref<string>(new Date().toISOString())
    const refAmount = ref<number>()

      
    return () => (
      <MainLayout>
        {{
          title: () => "记一笔",
          icon: () => <Icon name="left" />,
          default: () => (
            <>
              <div class={s.wrapper}>
                <Tabs v-model:selected={refKind.value} class={s.tabs}>
                  <Tab name="支出">
                   <Tags kind="expenses" v-model:selected={refTagId.value}/>
                  </Tab>
                  <Tab name="收入" >
                   <Tags kind= 'income' name="收入" v-model:selected={refTagId.value}/>
                  </Tab>
                </Tabs>
                <div>{refHappenAt.value}</div>
                <div>{refAmount.value}</div>
                <div class={s.inputPad_wrapper}>
                  <InputPad 
                  v-model:happenAt={refHappenAt.value}
                  v-model:amount={refAmount.value}
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
