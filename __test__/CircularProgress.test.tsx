import { render, screen } from '@testing-library/react'
import CircularProgress from '@/components/CircularProgress'

describe('CircularProgress helpers', () => {
  const isNumeric = (str: string): boolean => /\d/.test(str)

  it('isNumeric returns true if string contains digits', () => {
    expect(isNumeric('45')).toBe(true)
    expect(isNumeric('90 minutes')).toBe(true)
  })

  it('isNumeric returns false if string has no digits', () => {
    expect(isNumeric('Canceled')).toBe(false)
    expect(isNumeric('HT')).toBe(false)
  })

  const isCancelled = (status: string) =>
    ['Canceled', '-'].some((val) => val === status)

  it('cancelled returns true if status is Canceled or "-"', () => {
    expect(isCancelled('Canceled')).toBe(true)
    expect(isCancelled('-')).toBe(true)
  })

  it('cancelled returns false for other statuses', () => {
    expect(isCancelled('45')).toBe(false)
    expect(isCancelled('HT')).toBe(false)
  })

  const getStatusPercentage = (status: string): number => {
    const inprogress = isNumeric(status)
    const halfTime = status === 'HT'
    return inprogress ? parseInt(status) : halfTime ? 50 : 100
  }

  it('statusPercentage returns parsed int for numeric status', () => {
    expect(getStatusPercentage('60')).toBe(60)
    expect(getStatusPercentage('90')).toBe(90)
  })

  it('statusPercentage returns 50 if status is HT', () => {
    expect(getStatusPercentage('HT')).toBe(50)
  })

  it('statusPercentage returns 100 if status is other', () => {
    expect(getStatusPercentage('Ended')).toBe(100)
    expect(getStatusPercentage('Paused')).toBe(100)
  })

  const getBackgroundStyle = (status: string): string => {
    const inprogress = isNumeric(status)
    const cancelled = ['Canceled', '-'].includes(status)
    const halfTime = status === 'HT'
    const percentage = inprogress ? parseInt(status) : halfTime ? 50 : 100
    const angle = (cancelled ? 0 : percentage) * 3.6
    return `conic-gradient(#22c55e ${angle}deg, #737373 0deg)`
  }

  it('background style returns correct gradient', () => {
    expect(getBackgroundStyle('75')).toBe('conic-gradient(#22c55e 270deg, #737373 0deg)')
    expect(getBackgroundStyle('HT')).toBe('conic-gradient(#22c55e 180deg, #737373 0deg)')
    expect(getBackgroundStyle('Ended')).toBe('conic-gradient(#22c55e 360deg, #737373 0deg)')
    expect(getBackgroundStyle('Canceled')).toBe('conic-gradient(#22c55e 0deg, #737373 0deg)')
  })
})


//Component test
describe('<CircularProgress /> rendering', () => {
  it('renders game-progress container', () => {
    render(<CircularProgress status="45" />)
    const progress = screen.getByTestId('game-progress')
    expect(progress).toBeInTheDocument()
  })

  it('renders status inside if not cancelled', () => {
    render(<CircularProgress status="45" />)
    expect(screen.getByText('45')).toBeInTheDocument()
  })

  it('does not render status text if cancelled', () => {
    render(<CircularProgress status="Canceled" />)
    const content = screen.getByTestId('game-progress').textContent?.trim()
    expect(content).toBe('')
  })

  it('renders correct background style for numeric status', () => {
    render(<CircularProgress status="75" />)
    const progress = screen.getByTestId('game-progress')
    expect(progress).toHaveStyle({
      background: 'conic-gradient(#22c55e 270deg, #737373 0deg)',
    })
  })

  it('renders correct background for HT', () => {
    render(<CircularProgress status="HT" />)
    const progress = screen.getByTestId('game-progress')
    expect(progress).toHaveStyle({
      background: 'conic-gradient(#22c55e 180deg, #737373 0deg)',
    })
  })

  it('renders 0deg gradient for cancelled status', () => {
    render(<CircularProgress status="Canceled" />)
    const progress = screen.getByTestId('game-progress')
    expect(progress).toHaveStyle({
      background: 'conic-gradient(#22c55e 0deg, #737373 0deg)',
    })
  })
})
