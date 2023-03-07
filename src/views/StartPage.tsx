import { defineComponent, ref } from 'vue';
import { Button } from '../shared/button';
import s from './StartPage.module.scss'
import { Icon } from '../shared/Icon';
import { FloatButton } from '../shared/FloatButton';
import { Center } from '../shared/Center';
import { Navbar } from '../shared/Navbar';
import { Overlay } from '../shared/Overlay';
import { RouterLink } from 'vue-router';
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
                    <RouterLink to='/items/create'>
                        <Button class={s.button}>开始记账</Button>
                    </RouterLink>
                </div>
                <RouterLink to='/items/create'>
                    <FloatButton iconName='add'></FloatButton>
                </RouterLink>

                {overlayVisile.value &&
                    <Overlay onClose={() => overlayVisile.value = false} />
                }

            </div>
        )
    }
})