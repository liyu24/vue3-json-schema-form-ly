import { defineComponent, computed } from 'vue'
import { SchemaTypes, FiledPropsDefine } from './types'
import StringField from './fileds/StringField'
import NumberField from './fileds/NumberFiled'
import ObjectField from './fileds/ObjectField'
import {retrieveSchema} from './utils' // 处理schema

export default defineComponent({
  name: 'SchemaItem',
  props: FiledPropsDefine,

  setup(props) {

    const retrievedSchemaRef = computed(() => { // computed return的是一个ref对象
      console.log('computed')
      const { schema, rootSchema ,value } = props
      return  retrieveSchema(schema, rootSchema, value)
      // retrieveSchema 变动频率不高，所以放在render函数中很浪费，所以适合放在computed里，当props发生变化时，computed会重新渲染
    })

    return () => {
      const { schema } = props

      const retrievedSchema = retrievedSchemaRef.value

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
        case SchemaTypes.OBJECT: {
          Component = ObjectField
          break
        }
        default: {
          console.warn(`${type} is not supported`)
        }
      }
      return <Component {...props} schema={retrievedSchema} />
    }
  },
})

// SchemaItems这个组件最后 return 对应的 Component 出去，所以它的的意义是进行中转派发，并不处理任何props。
