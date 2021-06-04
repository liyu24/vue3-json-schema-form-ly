import { defineComponent, handleError } from 'vue'
import { Schema, FiledPropsDefine } from '../types'
import { useVJSFContext } from '../context'

export default defineComponent({
  name: 'ArrayField',
  props: FiledPropsDefine,

  setup(props) {
    const context = useVJSFContext()

    const handleMultiTypeChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      props.onChange(arr)
    }

    return () => {
      const { schema, rootSchema, value } = props

      const SchemaItem = context.SchemaItem

      const isMultiType = Array.isArray(schema.items)

      if (isMultiType) {
        // 处理schema.items 是数组的情况
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items.map((s: Schema, index: number) => (
          <SchemaItem
            schema={s}
            key={index}
            rootSchema={rootSchema}
            value={arr[index]}
            onChange={(v: any) => handleMultiTypeChange(v, index)}
          />
        ))
      }

      return <div>hehe</div>
    }
  },
})