import { defineComponent, PropType } from "vue";
import s from "./StatisticsPage.module.scss";
import { TimeTabsLayout } from "../layouts/TimeTabsLayout";
import { Charts } from "../components/statistics/Charts";
export const StatisticsPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <TimeTabsLayout rerenderOnSwitchTab={true} component={Charts} />
    );
  },
});

export default StatisticsPage
