interface Props {
  message?: string | string[]
}

export function DisplayFormStateError({ message }: Props) {
  return (
    <div className="flex cursor-default select-none text-sm text-red-500">
      <p>
        {message &&
          (typeof message === 'string' ? message : message.join('. '))}
      </p>
    </div>
  )
}
