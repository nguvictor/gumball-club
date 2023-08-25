import { ChangeEvent, ReactNode, useRef } from 'react'
import styles from './Input.module.css'

export const Input = ({
  children,
  value,
  disabled = false,
  onChange,
  className,
  error,
  tokenBalance,
  hint,
  after = null,
}: {
  className?: string
  children: ReactNode
  value: number
  disabled?: boolean
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void
  error?: string
  tokenBalance?: string
  hint?: string
  after?: ReactNode
}) => {
  const ref = useRef<HTMLInputElement>(null)
  const inputElement = ref.current!
  const isDisabled = tokenBalance === undefined || disabled

  return (
    <div
      className={[
        styles.wrapper,
        isDisabled ? styles.disabled : '',
        error ? styles.error : '',
        className,
      ].join(' ')}
    >
      <input
        ref={ref}
        className={[
          styles.input,
          isDisabled ? styles.disabled : '',
          error ? styles.error : '',
        ].join(' ')}
        type="number"
        min="0"
        value={value}
        disabled={isDisabled}
        onChange={(ev) => {
          if (onChange) onChange(ev)
          inputElement.value = Number(ev.target.value).toString()
        }}
      />
      <span
        className={[styles.text, isDisabled ? styles.disabled : ''].join(' ')}
        onClick={() => {
          ref.current?.focus()
          ref.current?.select()
        }}
      >
        {children}
      </span>
      {tokenBalance !== undefined && !error ? (
        <span className={styles['token-balance']}>
          Balance: {tokenBalance} {children}
        </span>
      ) : null}
      {error ? <span className={styles['error-message']}>{error}</span> : null}
      {hint !== undefined && !tokenBalance && !error ? (
        <span className={styles['hint']}>{hint}</span>
      ) : null}
      {after}
    </div>
  )
}
