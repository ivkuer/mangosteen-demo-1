import { defineComponent, PropType, ref } from "vue";
import s from "./Form.module.scss";
import { computed } from "vue";
import { EmojiSelect } from "./EmojiSelect";
import { Popup, DatetimePicker } from "vant";
import { Time } from "./time";
import { Button } from "./Button";
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    },
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
      </form>
    );
  },
});

export const FormItem = defineComponent({
  props: {
    label: {
      type: String,
    },
    modelValue: {
      type: [String, Number],
    },
    type: {
      type: String as PropType<"text" | "emojiSelect" | "date" | 'validationCode'>,
    },
    error: {
      type: String,
    },
    placeholder: String as PropType<string>
  },
  emits: ['update:modelValue'],
  setup: (props, context) => {
    const refDateVisible = ref(false)
    const content = computed(() => {
      switch (props.type) {
        case "text":
          return (
            <input
              value={props.modelValue}
              onInput={(e: any) =>
                context.emit("update:modelValue", e.target.value)
              }
              class={[s.formItem, s.input]}
              placeholder={props.placeholder}
            />
          );
        case "emojiSelect":
          return (
            <EmojiSelect
              modelValue={props.modelValue?.toString()}
              onUpdateModelValue={(value) =>
                context.emit("update:modelValue", value)
              }
              class={s.formItem}
            />
          );
        case "date":
          return <>
         <input 
            readonly={true}
            value={props.modelValue}
            onClick={() => { refDateVisible.value = true }}
            class={[s.formItem, s.input]}
            placeholder={props.placeholder}
            />
            <Popup position='bottom' v-model:show={refDateVisible.value}>
              <DatetimePicker value={props.modelValue} type="date" title="???????????????"
                onConfirm={(date: Date) => {
                  context.emit('update:modelValue', new Time(date).format())
                  refDateVisible.value = false
                }}
                onCancel={() => refDateVisible.value = false} />
            </Popup>
          </>
          case "validationCode":
            return <>
            <input  class={[s.formItem, s.input, s.validationCodeInput]} 
            placeholder={props.placeholder}
            />
            <Button>???????????????</Button>
            </>
        case undefined:
          return context.slots.default?.();
      }
    });
    return () => {
      return (
        <div class={s.formRow}>
          <label class={s.formLabel}>
            {props.label && <span class={s.formItem_name}>{props.label}</span>}

            <div class={s.formItem_value}>{content.value}</div>

           
              <div class={s.formItem_errorHint}>
                <span>{props.error ?? '???'}</span>
              </div>
          </label>
        </div>
      );
    };
  },
});
