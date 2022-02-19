export interface EleOptions {
  classes?: string[] | string;
  attributes?: { [key: string]: string | boolean };
  functions?: { [key: string]: (...args: any[]) => unknown };
}
