import { PropType, defineComponent, DefineComponent } from 'vue'

export enum SchemaTypes { // 枚举类型
  'NUMBER' = 'number',
  'INTEGER' = 'integer',
  'STRING' = 'string',
  'OBJECT' = 'object',
  'ARRAY' = 'array',
  'BOOLEAN' = 'boolean',
}

type SchemaRef = { $ref: string }

export interface Schema {
  type: SchemaTypes | string
  const?: any
  format?: string

  title?: string
  default?: any
  properties?: {
    [key: string]: Schema
  }
  items?: Schema | Schema[] | SchemaRef
  uniqueItems?: any
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  anyOf?: Schema[]
  allOf?: Schema[]
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumNames?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  additionalItems?: Schema

  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  multipleOf?: number
  exclusiveMaximum?: number
  exclusiveMinimum?: number
}

// const schema: Schema = {
//   type: SchemaTypes.NUMBER, // 这样写很麻烦，还需要引入SchemaTypes， 所以在定义Schema类型的中type时， type:SchemaTypes | string
// }

export const FiledPropsDefine = {
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
} as const

export const TypeHelperComponent = defineComponent({
  props: FiledPropsDefine,
})

export type CommonFieldType = typeof TypeHelperComponent

const CommonWidgetPropsDefine = {
  value: {},
  onChange: {
    type: Function as PropType<(v: any) => void>,
    required: true,
  },
} as const
const SelectionWidgetPropsDefine = {
  ...CommonWidgetPropsDefine,
  options: {
    type: Array as PropType<{ key: string; value: any }[]>,
    required: true,
  },
}

type CommonWidgetDefine = DefineComponent<typeof CommonWidgetPropsDefine>
type SelectionWidgetDefine = DefineComponent<typeof SelectionWidgetPropsDefine>

export interface Theme {
  widgets: {
    SelectionWidget: SelectionWidgetDefine
    TextWidget: CommonWidgetDefine
    NumberWidget: CommonWidgetDefine
  }
}
