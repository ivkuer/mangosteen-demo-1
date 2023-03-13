import { defineComponent, PropType } from "vue";
import s from "./StatisticsPage.module.scss";
import { MainLayout } from "../layouts/MainLayout";
import { OverlayIcon } from "../shared/Overlay";
import { Tab, Tabs } from "../shared/Tabs";
export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <MainLayout>
        {{
          title: () => "山竹记账",
          icon: () => <OverlayIcon />,
          default: () => (
            <div>
              <Tabs classPrefix="customTabs">
                <Tab name="本月"></Tab>
                <Tab name="上个月"></Tab>
                <Tab name="今年"></Tab>
                <Tab name="自定义时间"></Tab>
              </Tabs>
            </div>
          ),
        }}
      </MainLayout>
    );
  },
});
