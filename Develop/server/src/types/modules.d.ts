declare module 'bcrypt' {
    export function hashSync(
        data: string,
        saltOrRounds: number | string
    ): Promise<string>;
    export function compareSync(
        data: string,
        encrypted: string): Promise<boolean>;
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