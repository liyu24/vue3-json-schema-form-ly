// Node.js require:
const Ajv = require('ajv').default
const localize = require('ajv-i18n')

const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      // format: 'customFormat',
      // customKeyword: true,
      errorMessage: '这是不对的',
      // format: 'email',
      minLength: 10,
    },
    age: {
      type: 'number',
    },
    pets: {
      type: 'array',
      items: {
        // items数组里每一项都是 string
        type: 'string',
      },
      // items: [ // 直接将items定义为数组
      //   // 数组第一项是 string，第二项是 number
      //   {
      //     type: 'string',
      //   },
      //   {
      //     type: 'number',
      //   },
      // ],
    },
    isWorker: {
      type: 'boolean',
    },
  },
  required: ['name', 'age'],
}

const ajv = new Ajv({ allErrors: true, jsonPointers: true }) // 使用ajv-errors需要在 new Ajv（）时传入allErrors 、 jsonPointers为true

require('ajv-errors')(ajv) // 使用 ajv-errors

// 自定义format
ajv.addFormat('customFormat', data => {
  return data !== 'haha'
})

ajv.addKeyword('customKeyword', {
  // -----------------   第一种写法    ----------------
  // validate(schema, data) {
  //   console.log(schema, data)
  //   if (schema === true) return true
  //   return true
  // },
  // -----------------   第二种写法    ----------------
  // compile(sch, parentSchema) {
  //   console.log(sch, parentSchema)
  //   return () => true
  // },
  // metaSchema: {
  //   type: 'number', // 校验关键字的值的类型
  // },
  // -----------------   第三种写法    ----------------
  // 这种写法推荐～～
  // macro() {
  //   return {
  //     minLength: 10,
  //   }
  // },
})
const validate = ajv.compile(schema)
const valid = validate({
  name: 'haha',
  age: 18,
  pets: ['mimi', 'mama'],
  isWorker: true,
})
if (!valid) {
  // localize.zh(validate.errors)
  console.log(validate.errors)
}
