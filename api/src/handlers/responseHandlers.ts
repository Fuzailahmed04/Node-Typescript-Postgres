export const successmsg = (message: string, results: any, statusCode: number = 200) => {
    return {
        status: "success",
        message,
        error: false,
        code: statusCode,
        results,
    };
};
export const errormsg = (message: string, statusCode: number = 500) => {
    const codes = [200, 201, 400, 401, 404, 403, 422, 500];
    const findCode = codes.find((code) => code === statusCode);

    return {
        status: "error",
        message,
        code: findCode || 500, 
        error: true,
    };
};
