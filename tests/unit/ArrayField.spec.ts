import { mount } from '@vue/test-utils'

import JsonSchemaForm, {
  ArrayField,
  StringField,
  NumberField,
  SelectionWidget,
} from '../../lib'

import TestComponent from './utils/TestComponent'

describe('ArrayField', () => {
  it('should render multi type', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
            {
              type: 'number',
            },
          ],
        },
        value: [],
        onChange: () => {},
        rootSchema: { type: '' },
      },
    })

    const arr = wrapper.findComponent(ArrayField)
    const str = wrapper.findComponent(StringField)
    const num = wrapper.findComponent(NumberField)

    expect(arr.exists()).toBeTruthy()
    expect(str.exists()).toBeTruthy()
    expect(num.exists()).toBeTruthy()
  })

  it('should render s222', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string' },
        },
        value: ['1', '2'],
        onChange: () => {},
        rootSchema: { type: '' },
      },
    })

    const strs = wrapper.findAllComponents(StringField)

    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe('1')
  })

  it('should render single type', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string', enum: ['1', '2', '3'] },
        },
        value: [],
        onChange: () => {},
        rootSchema: { type: '' },
      },
    })

    const arr = wrapper.findComponent(ArrayField)
    const select = arr.findComponent(SelectionWidget)

    expect(select.exists()).toBeTruthy()
  })
})
