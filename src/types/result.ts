type Ok<T, _> = {
  tag: "ok"
  val: T
}

type Err<_, E = Error> = {
  tag: "err"
  err: E
}

export type Result<T, E = Error> = Ok<T, E> | Err<T, E>

export const ok = <T, E = Error>(val: T): Result<T, E> => ({
  tag: "ok",
  val
})

export const err = <T, E = Error>(err: E): Result<T, E> => ({
  tag: "err",
  err
})

export const isOk = <T, E = Error>(result: Result<T, E>): result is Ok<T, E> =>
  result.tag === "ok"

export const isErr = <T, E = Error>(
  result: Result<T, E>
): result is Err<T, E> => result.tag === "err"

export const unwrap = <T, E = Error>(result: Result<T, E>): T => {
  if (isErr(result)) {
    throw result.err
  }
  return result.val
}
