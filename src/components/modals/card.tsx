import clsx from 'clsx'

interface Props {
  children: React.ReactNode
  size?: 'small' | 'medium'
}

export function Card({ children, size = 'small' }: Props) {
  return (
    <div
      className={clsx('card-custom', {
        'max-w-[384px]': size === 'small',
        'max-w-[768px]': size === 'medium',
      })}
    >
      {children}
    </div>
  )
}
