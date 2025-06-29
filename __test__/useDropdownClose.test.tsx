import { render, fireEvent } from '@testing-library/react'
import { useRef } from 'react'
import { useDropdownClose } from '../hooks/useDropdownClose' // Adjust to your path

describe('useDropdownClose', () => {
  const TestComponent = ({ onClose }: { onClose: () => void }) => {
    const ref = useRef<HTMLDivElement | null>(null)
    useDropdownClose(ref, onClose)

    return (
      <div>
        <div data-testid="outside">Outside</div>
        <div ref={ref} data-testid="dropdown">
          Dropdown Content
        </div>
      </div>
    )
  }

  it('calls onClose when clicking outside the ref element', () => {
    const onClose = jest.fn()
    const { getByTestId } = render(<TestComponent onClose={onClose} />)

    fireEvent.mouseDown(getByTestId('outside'))
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose when clicking inside the ref element', () => {
    const onClose = jest.fn()
    const { getByTestId } = render(<TestComponent onClose={onClose} />)

    fireEvent.mouseDown(getByTestId('dropdown'))
    expect(onClose).not.toHaveBeenCalled()
  })

  it('calls onClose when Escape key is pressed', () => {
    const onClose = jest.fn()
    render(<TestComponent onClose={onClose} />)

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })
})
