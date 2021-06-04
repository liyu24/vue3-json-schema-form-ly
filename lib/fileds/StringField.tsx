import { defineComponent } from 'vue'
import { FiledPropsDefine } from '../types'

export default defineComponent({
  name: 'StringField',
  props: FiledPropsDefine,
  setup(props, { slots, emit, attrs }) {
    const handleChange = (e: any) => {
      props.onChange(e.target.value)
    }
    return () => {
      const { value } = props
      return <input type="text" v-model={value} onChange={handleChange} />
    }
  },
})
