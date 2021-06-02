import { defineComponent, PropType } from 'vue'
import { Schema, SchemaTypes, FiledPropsDefine } from './types'
// import StringField from './fileds/StringField'
import StringField from './fileds/StringField.vue'
import NumberField from './fileds/NumberFiled'

export default defineComponent({
  name: 'SchemaItem',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true,
    },
    value: {
      required: true,
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true,
    },
  },

  setup(props) {
    return () => {
      const { schema } = props

      // todo: 如果type没有指定，需要我们去指定type

      const type = schema.type

      let Component: any

      switch (type) {
        case SchemaTypes.STRING: {
          Component = StringField
          break
        }
        case SchemaTypes.NUMBER: {
          Component = NumberField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }
      return <Component {...props} />
    }
  },
})

// SchemaItems这个组件最后 return 对应的 Component 出去，所以它的的意义是进行中转派发，并不处理任何props。
