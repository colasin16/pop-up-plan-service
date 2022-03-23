export interface ResponseData {
    success: boolean,
    message: string,
    data?: any,

}

const INTERNAL_ERROR: ResponseData = { 
    success: false,
    message: "internal-error",
}


export {INTERNAL_ERROR}