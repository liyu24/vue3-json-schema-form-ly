import { mount } from '@vue/test-utils'

import JsonSchemaForm, { NumberField } from '../../lib'

describe('JsonSchemaForm', () => {
  it('should render corrent numberfield', async () => {
    let value = ''
    const wrapper = mount(JsonSchemaForm, {
      props: {
        schema: {
          type: 'number',
        },
        value: '',
        onChange: (v: any) => {
          value = v
        },
        rootSchema: {
          type: ' ',
        },
      },
    })
    const numberFiled = wrapper.findComponent(NumberField)
    expect(numberFiled.exists()).toBeTruthy()

    // await numberFiled.props('onChange')('123')
    const input = numberFiled.find('input')
    input.element.value = '123'
    input.trigger('input')
    expect(value).toBe(123)
  })
})
