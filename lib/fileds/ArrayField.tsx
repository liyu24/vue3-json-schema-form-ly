import { defineComponent, handleError } from 'vue'
import { createUseStyles } from 'vue-jss'
import { Schema, FiledPropsDefine } from '../types'
import { useVJSFContext } from '../context'

const useStyles = createUseStyles({
  container: {
    border: '1px solid #eee',
  },
  actions: {
    background: '#eee',
    padding: 10,
    textAlign: 'right',
  },
  action: {
    '& + &': {
      marginLeft: 10,
    },
  },
  content: {
    padding: 10,
  },
})

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {},
  setup(props, { slots }) {
    const classesRef = useStyles()
    return () => {
      const classes = classesRef.value
      return (
        <div class={classes.container}>
          <div class={classes.actions}>
            <button class={classes.action}>新增</button>
            <button class={classes.action}>删除</button>
            <button class={classes.action}>上移</button>
            <button class={classes.action}>下移</button>
          </div>
          <div class={classes.content}>{slots.default && slots.default()}</div>
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
