export interface ApiResponse<T> {
    data: T
    status:boolean
    msg: string
}

export interface RequestParams {
    [key: string]: string | null | object | undefined | number | boolean | string[] | number[] | FormData | ArrayBuffer | Blob | Document | JSON | Text;
}
