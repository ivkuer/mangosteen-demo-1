import { defineComponent, PropType, ref } from 'vue';
import s from './ItemCreate.module.scss';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
import { Tabs, Tab } from '../../shared/Tabs';
export const ItemCreate = defineComponent({
    props: {
        name: {
            type: String as PropType<string>
        }
    },
    setup: (props, context) => {
        const refKind = ref('支出')
        const onUpdateSelected = (name: string) => refKind.value = name
        return () => (
            <MainLayout>{
                {
                    title: () => '记一笔',
                    icon: () => <Icon name="pig" />,
                    default: () => {
                        <>
                            <Tabs selected={refKind.value} onUpdateSelected={onUpdateSelected}>
                                <Tab name="支出">icon列表</Tab>
                                <Tab name="收入">icon列表</Tab>
                            </Tabs>
                        </>
                    }
                }
            }</MainLayout>
        )
    }
})