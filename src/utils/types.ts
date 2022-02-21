export interface EleOptions<E extends HTMLElement> {
  classes?: string[] | string;
  attributes?: { [key: string]: string | boolean };
  functions?: { [key: string]: (this: E, ...args: any[]) => unknown };
}

export type FindOptions<T extends keyof HTMLElementTagNameMap> = EleOptions<HTMLElementTagNameMap[T]>;
