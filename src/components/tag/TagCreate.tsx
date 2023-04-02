import { defineComponent } from "vue";
import { MainLayout } from "../../layouts/MainLayout";
import { TagForm } from "./TagForm";
import { BackIcon } from "../../shared/BackIcon";
import { def } from "@vue/shared";
export const TagCreate = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => "新建标签",
          icon: () => <BackIcon />,
          default: () => <TagForm />,
        }}
      </MainLayout>
    );
  },
});

export default TagCreate
