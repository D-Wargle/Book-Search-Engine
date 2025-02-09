declare module 'bcrypt' {
    export function hashSync(
        data: string,
        saltOrRounds: number | string
    ): Promise<string>;
    export function compareSync(
        data: string,
        encrypted: string): Promise<boolean>;

  export function compare(password: string, password1: any) {
    throw new Error('Function not implemented.');
  }

  export function hash(password: string, saltRounds: number): string | PromiseLike<string> {
    throw new Error('Function not implemented.');
  }
}

declare module 'jsonwebtoken' {
    export function sign(
        payload: any,
        secret: string,
        options?: any
    ): string;
    export function verify(
        token: string,
        secret: string,
        callback?: (error: any, decoded: any) => void
    ): any;
};