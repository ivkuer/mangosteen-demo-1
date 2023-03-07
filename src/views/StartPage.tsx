import { defineComponent, ref } from 'vue';
import { Button } from '../shared/button';
import s from './StartPage.module.scss'
import { Icon } from '../shared/Icon';
import { FloatButton } from '../shared/FloatButton';
import { Center } from '../shared/Center';
import { Navbar } from '../shared/Navbar';
import { Overlay } from '../shared/Overlay';
export const StartPage = defineComponent({
    setup: (props, context) => {
        const overlayVisile = ref(false)
        const onClickMenu = () => {
            overlayVisile.value = !overlayVisile.value
        }
        return () => (
            <div>
                <Navbar>{
                    {
                        default: () => '山竹记账',
                        icon: () => <Icon name="menu" class={s.navIcon} onClick={onClickMenu} />
                    }
                }</Navbar>
                <Center class={s.pig_wrapper}>
                    <Icon name="pig" class={s.pig} />
                </Center>
                <div class={s.button_wrapper}>
                    <Button class={s.button}>开始记账</Button>
                </div>
                <FloatButton iconName='add'></FloatButton>
                {overlayVisile.value && 
                <Overlay onClose={() => overlayVisile.value = false}/>
                } 
                
            </div>
        )
    }
})