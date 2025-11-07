export default class Response<T> {
    public isSuccess: boolean;
    public message: string;
    public data: T | null;
    public error?: string;

    constructor(isSuccess: boolean, message: string, data: T | null, error?: string) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}