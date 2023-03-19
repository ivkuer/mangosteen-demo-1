import { defineComponent, reactive } from "vue";
import s from "./Tag.module.scss";
import { Rules, hasError, validate } from "../../shared/validate";
import { Button } from "../../shared/Button";
import { Form, FormItem } from "../../shared/Form";
import { useRoute, useRouter } from "vue-router";
import { http } from "../../shared/Http";
import { onFormError } from "../../shared/onFormError";
import { onMounted } from "vue";
export const TagForm = defineComponent({
  props: {
    id: Number
  },
  setup: (props, context) => {
    const route = useRoute()
    const router = useRouter()
    const formData = reactive<Partial<Tag>>({
      id: undefined,
      name: "",
      sign: "",
      kind: route.query.kind?.toString(),
    });
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      const rules: Rules<typeof formData> = [
        { key: "name", type: "required", message: "必填" },
        {
          key: "name",
          type: "pattern",
          regex: /^.{1,4}$/,
          message: "只能填 1 到 4 个字符",
        },
        { key: "sign", type: "required", message: "必填" },
      ];
      Object.assign(errors, {
        name: "",
        sign: "",
      });
      Object.assign(errors, validate(formData, rules));
      if(!hasError(errors)) {
        const promise = await formData.id ? 
        http.patch(`/tags/${formData.id}`, formData) :
        http.post('/tags',formData,{
          params: {_mock: 'tagCreate'}
        })
        await promise.catch(error => 
          onFormError(error, (data) => Object.assign(errors, data.errors))
        )
        router.back()
      }
    };
    onMounted(async () => {
      if (!props.id) return
     const response = await http.get<Resource<Tag>>(`/tags/${props.id}`, {
      _mock: 'tagShow'
     })
     Object.assign(formData, response.data.resource)
    })
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label="标签名"
          v-model={formData.name}
          type="text"
          error={errors["name"]?.[0]}
        ></FormItem>
        <FormItem
          label={"符号" + formData.sign}
          v-model={formData.sign}
          type="emojiSelect"
          error={errors["sign"]?.[0]}
        ></FormItem>
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem >
          <Button type="submit" class={ s.button}>确定</Button>
        </FormItem>
      </Form>
    );
  },
});
