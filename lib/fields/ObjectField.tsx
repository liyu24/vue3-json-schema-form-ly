import { defineComponent, inject, DefineComponent } from 'vue'
import { FiledPropsDefine, CommonFieldType } from '../types'
import { SchemaFormContextKey, useVJSFContext } from '../context'
import { isObject } from '../utils'

const schema = {}

type SchemaItemDefine = DefineComponent<typeof FiledPropsDefine>

export default defineComponent({
  name: 'ObjectField',
  props: FiledPropsDefine,
  setup(props) {
    const context = useVJSFContext()

    const handleObjectFieldChange = (key: string, v: string) => {
      const value: any = isObject(props.value) ? props.value : {} // 不是对象的话建立空对象
      if (v === undefined) {
        delete value[key]
      } else {
        value[key] = v
      }
      props.onChange(value)
    }

    return () => {
      const { schema, rootSchema, value } = props
      const { SchemaItem } = context
      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((k: string, index: number) => (
        <SchemaItem
          schema={properties[k]}
          rootSchema={rootSchema}
          value={currentValue[k]}
          key={index}
          onChange={(v: any) => handleObjectFieldChange(k, v)}
        />
      ))
    }
  },
})
