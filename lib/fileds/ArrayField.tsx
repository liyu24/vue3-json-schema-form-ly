import { defineComponent, handleError } from 'vue'
import { Schema, FiledPropsDefine } from '../types'
import { useVJSFContext } from '../context'

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {},
  setup(props, { slots }) {
    console.log('slot', slots)
    return () => {
      return (
        <div>
          <div>
            <button>新增</button>
            <button>删除</button>
            <button>上移</button>
            <button>下移</button>
          </div>
          <div>{slots.default && slots.default()}</div>
        </div>
      )
    }
  },
})

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
      const isSelect = schema.items && (schema.items as any).enum

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
      } else if (!isSelect) {
        const arr = Array.isArray(value) ? value : []

        return arr.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper>
              <SchemaItem
                schema={schema.items as Schema}
                value={v}
                key={index}
                rootSchema={rootSchema}
                onChange={(v: any) => handleMultiTypeChange(v, index)}
              />
            </ArrayItemWrapper>
          )
        })
      }

      return <div>hehe</div>
    }
  },
})
