
type Ok<T, _> = {
  ok: true;
  val: T;
};

type Err<_, E> = {
  ok: false;
  err: E;
};

export type Result<T, E = Error> = Ok<T, E> | Err<T, E>;

export const ok = <T, E = Error>(val: T): Result<T, E> => ({
  ok: true,
  val,
});

export const err = <T, E = Error>(err: E): Result<T, E> => ({
  ok: false,
  err,
});

export const isOk = <T, E = Error>(result: Result<T, E>): result is Ok<T, E> => result.ok;

export const isErr = <T, E = Error>(result: Result<T, E>): result is Err<T, E> => !result.ok;

export const unwrap = <T, E = Error>(result: Result<T, E>): T => {
  if (isErr(result)) {
    throw result.err;
  }
  return result.val;
};
