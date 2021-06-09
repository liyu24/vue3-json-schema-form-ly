import { defineComponent, PropType } from 'vue'
import JsonSchemaForm, { Schema, ThemeProvider } from '../../../lib'
import defaultTheme from '../../../lib/theme-default'

export default defineComponent({
  name: 'TestComponent',
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
    rootSchema: {
      type: Object as PropType<Schema>,
      required: true,
    },
  },
  setup(props) {
    return () => {
      return (
        <ThemeProvider theme={defaultTheme}>
          <JsonSchemaForm {...props} />
        </ThemeProvider>
      )
    }
  },
})
