import { PropType } from 'vue'

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
  default?: any
  properties?: {
    [key: string]: Schema | { $ref: string }
  }
  items?: Schema | Schema[] | SchemaRef
  dependencies?: {
    [key: string]: string[] | Schema | SchemaRef
  }
  oneOf?: Schema[]
  // vjsf?: VueJsonSchemaConfig
  required?: string[]
  enum?: any[]
  enumKeyValue?: any[]
  additionalProperties?: any
  addtionalItems?: Schema
}

// const schema: Schema = {
//   type: SchemaTypes.NUMBER, // 这样写很麻烦，还需要引入SchemaTypes， 所以在定义Schema类型的中type时， type:SchemaTypes | string
// }

export const FiledPropsDefine = {
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
} as const
