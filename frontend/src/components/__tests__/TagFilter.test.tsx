import { describe, it, expect, vi, afterEach } from 'vitest'
import { act } from 'react-dom/test-utils'
import { createRoot, Root } from 'react-dom/client'
import TagFilter from '../TagFilter'

let container: HTMLDivElement | null = null
let root: Root | null = null

afterEach(() => {
  if (root && container) {
    act(() => root!.unmount())
    container.remove()
  }
  container = null
  root = null
})

function renderTagFilter(props: { value: string; options: string[]; onChange: (v: string) => void }) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => {
    root!.render(<TagFilter {...props} />)
  })
  return container.querySelector('[data-testid="tag-filter"]') as HTMLSelectElement
}

describe('TagFilter', () => {
  it('renders the default "All Tags" option', () => {
    const select = renderTagFilter({ value: '', options: [], onChange: vi.fn() })
    const options = Array.from(select.options).map(o => o.textContent)
    expect(options).toContain('All Tags')
  })

  it('renders an option for each supplied tag', () => {
    const select = renderTagFilter({ value: '', options: ['work', 'urgent'], onChange: vi.fn() })
    const options = Array.from(select.options).map(o => o.value)
    expect(options).toEqual(['', 'work', 'urgent'])
  })

  it('calls onChange with the selected tag', () => {
    const onChange = vi.fn()
    const select = renderTagFilter({ value: '', options: ['work'], onChange })
    act(() => {
      select.value = 'work'
      select.dispatchEvent(new Event('change', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledWith('work')
  })

  it('calls onChange with an empty string when "All Tags" is selected', () => {
    const onChange = vi.fn()
    const select = renderTagFilter({ value: 'work', options: ['work'], onChange })
    act(() => {
      select.value = ''
      select.dispatchEvent(new Event('change', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledWith('')
  })
})
