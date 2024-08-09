export type TypeCreateMembers<T, O extends keyof T, P extends keyof T> = Omit<T, O | P> &
  Partial<Pick<T, O>>;
export type TypeUpdateMembers<T, P extends keyof T> = Partial<Omit<T, P>>;
