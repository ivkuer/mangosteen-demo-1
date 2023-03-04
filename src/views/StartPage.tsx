import { defineComponent } from 'vue';
import { Button } from '../shared/button';
import s from './StartPage.module.scss'
import { Icon } from '../shared/Icon';
import { FloatButton } from '../shared/FloatButton';
import { Center } from '../shared/Center';
export const StartPage = defineComponent({
    setup: (props, context) => {
        function onClick() {
            console.log('hi')
        }
        return () => (
            <div>
                <div>menuu</div>
                <Center class={s.pig_wrapper}>
                    <Icon name="pig" class={s.pig} />
                </Center>
                <div class={s.button_wrapper}>
                    <Button class={s.button} onClick={onClick}>测试</Button>
                </div>
                <FloatButton iconName='add'></FloatButton>
            </div>
        )
    }
})