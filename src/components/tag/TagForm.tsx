import { defineComponent, reactive } from "vue";
import s from "./Tag.module.scss";
import { EmojiSelect } from "../../shared/EmojiSelect";
import { Rules, validate } from "../../shared/validate";
import { Button } from "../../shared/Button";
import { Form, FormItem } from "../../shared/Form";
export const TagForm = defineComponent({
  setup: (props, context) => {
    const formData = reactive({
      name: "",
      sign: "",
    });
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const onSubmit = (e: Event) => {
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
    };
    return () => (
      <Form onSubmit={onSubmit}>
        <FormItem
          label="标签名"
          v-model={formData.name}
          type="text"
          error={errors["name"] ? errors["name"][0] : "　"}
        ></FormItem>
        <FormItem
          label={"符号" + formData.sign}
          v-model={formData.sign}
          type="emojiSelect"
          error={errors["sign"] ? errors["sign"][0] : "　"}
        ></FormItem>
        <FormItem>
          <p class={s.tips}>记账时长按标签即可进行编辑</p>
        </FormItem>
        <FormItem>
          <Button class={ s.button}>确定</Button>
        </FormItem>
      </Form>
    );
  },
});
