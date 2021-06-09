import SelectionWidget from './SelectionWidget'

import { CommonWidgetPropsDefine, CommonWidgetDefine } from '../types'
import { defineComponent } from 'vue'

const TextWidget: CommonWidgetDefine = defineComponent({
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }
    return () => {
      const { value } = props
      return <input type="text" v-model={value} onChange={handleChange} />
    }
  },
})

export default TextWidget
