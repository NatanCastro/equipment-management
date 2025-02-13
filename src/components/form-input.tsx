import { PropsWithChildren } from "react"

type FormInputProps = {
  label: string,
  inputName: string,
}

export function FormInput({ label, inputName, children }: PropsWithChildren<FormInputProps>) {
  return (
    <>
      <label htmlFor={inputName}>{label}</label>
      {children}
    </>
  )
}
