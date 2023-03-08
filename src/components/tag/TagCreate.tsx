import { defineComponent, PropType } from 'vue';
import { MainLayout } from '../../layouts/MainLayout';
import { Icon } from '../../shared/Icon';
export const TagCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '新建标签',
        icon: () => <Icon name="left" onClick={() => { }} />,
        default: () => (
          <form action="">
            <div>
              <label htmlFor="">
                <span>标签名</span>
                <input type="text" />
              </label>
            </div>

            <div>
              <label htmlFor="">
                <span>符号</span>
                <ol>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>6</li>
                  <li>7</li>
                  <li>8</li>
                  <li>9</li>
                  <li>10</li>
                </ol>
              </label>
            </div>

            <div>
              <p>哈哈哈哈哈哈哈</p>
            </div>

            <div>
              <button>开始</button>
            </div>
          </form>
        )
      }}</MainLayout>
    )
  }
})