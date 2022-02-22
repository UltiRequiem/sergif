export interface EleOptions<E extends HTMLElement> {
  classes?: string[] | string;
  attributes?: Record<string, string | boolean>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  functions?: Record<string, (this: E, ...args: any[]) => unknown>;
}

export type FindOptions<T extends keyof HTMLElementTagNameMap> = EleOptions<
  HTMLElementTagNameMap[T]
>;

export enum aaa {
  HTML = 'http://www.w3.org/1999/xhtml',
  MATHML = 'http://www.w3.org/1998/Math/MathML',
  SVG = 'http://www.w3.org/2000/svg',
}
