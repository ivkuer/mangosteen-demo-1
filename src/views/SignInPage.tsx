import { defineComponent, PropType, ref } from "vue";
import s from "./SignInPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { Icon } from "../shared/Icon";
import { Form, FormItem } from "../shared/Form";
import { Button } from "../shared/Button";
import { reactive } from "vue";
import { validate } from "../shared/validate";
import axios from 'axios'
import { http } from "../shared/Http";
import { useBool } from "../hooks/useBool";
export const SignInPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>,
    },
  },
  setup: (props, context) => {
    const formDate = reactive({
      email: "",
      code: "",
    });
    const errors = reactive({
      email: [],
      code: [],
    });
    const onSubmit = (e: Event) => {      
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      });
      Object.assign(
        errors,
        validate(formDate, [
          { key: "email", type: "required", message: "必填" },
          {
            key: "email",
            type: "pattern",
            regex: /.+@.+/,
            message: "必须是邮箱地址",
          },
          { key: "code", type: "required", message: "必填" },
        ])
      );
    };

    const onValidationCode = ref<any>()
    const {ref: refDisabled, toggle, on, off} = useBool(false)
    const onError = (error: any) => {
      if (error.response.status === 422) {
        Object.assign(errors, error.response.data.errors)
      }
      throw error
    }
    const onClickSendValidationCode = async () => {
      on()
     const response = await http.post('/validation_codes', { email: formDate.email })
     .catch(onError)
     .finally(off)

      onValidationCode.value.startCount()
    }
   
    return () => (
      <MainLayout>
        {{
          title: () => "登录",
          icon: () => <Icon name="left" />,
          default: () => (
            <div>
              <div class={s.logo}>
                <Icon name="mangosteen" class={s.icon}/>
                <p class={s.appName}>山竹记账</p>
              </div>
              
              <Form onSubmit={onSubmit}>
                <FormItem
                  label="邮箱地址"
                  type="text"
                  v-model={formDate.email}
                  placeholder="请输入邮箱，然后点击发送验证"
                  error={errors.email?.[0]}
                />
                <FormItem
                  label="验证码"
                  type="validationCode"
                  v-model={formDate.code}
                  placeholder="六位数"
                  onClick={onClickSendValidationCode}
                  countFrom={60}
                  disabled={refDisabled.value}
                  ref={onValidationCode}
                  error={errors.code?.[0]}
                />
                <FormItem style={{ paddingTop: '96px' }}>
                  <Button>登录</Button>
                </FormItem>
              </Form>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});

