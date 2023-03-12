import { defineComponent, PropType } from 'vue';
import s from './ItemList.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tab, Tabs } from '../../shared/Tabs';
import { ref } from 'vue';
export const ItemList = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        const refSelected = ref('本月')
        return () => (
           <MainLayout>{{
            title: () => '山竹记账',
            icon: () => <Icon name="menu" />,
            default: () => (
                <Tabs classPrefix={'customTabs'} v-model:selected={refSelected.value}>
                    <Tab name="本月">
                        list 1
                    </Tab>
                    <Tab name="上个月">
                        list 2
                    </Tab>
                    <Tab name="今年">
                        list 3
                    </Tab>
                    <Tab name="自定义时间">
                        list 4
                    </Tab>
                </Tabs>
            )
           }}</MainLayout>
        )
    }
})