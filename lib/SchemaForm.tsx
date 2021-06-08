import { defineComponent, provide, PropType } from 'vue'

import { Schema,  Theme, FiledPropsDefine } from './types'

import SchemaItem from './SchemaItem'
import { SchemaFormContextKey } from './context'

// 组件库入口
export default defineComponent({
  props: FiledPropsDefine,
  name: 'SchemaForm',
  setup(props, { slots, emit, attrs }) {
    const handleChange = (v: any) => {
      props.onChange(v)
    }

    const context = {
      SchemaItem,
      // theme: props.theme,
    }

    provide(SchemaFormContextKey, context)

    return () => {
      const { schema, value } = props
      return (
        <SchemaItem
          schema={schema}
          rootSchema={schema}
          value={value}
          onChange={handleChange}
        />
      )
    }
  },
})
