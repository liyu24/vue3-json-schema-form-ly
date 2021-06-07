import { defineComponent, h } from 'vue'
import { shallowMount } from '@vue/test-utils'

const HelloWorld = defineComponent({
  nanme: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(props) {
    return () => {
      return h('div', props.msg)
    }
  },
})

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
