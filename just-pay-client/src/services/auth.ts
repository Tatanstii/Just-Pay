import { request } from "../lib/axios"
import { errorResponse, successResponse } from "../lib/utils";
import type { LoginSchema, RegisterSchema } from "../schemas/auth";

export const login = async <T>(data: LoginSchema) => {
    const response = await request.post('/api/login', data);
    if (response.status !== 200) {
        return errorResponse(response.data.message, response.data.errors);
    }

    return successResponse<T>(response.data.message, response.data.data);
}

export const logout = async <T>() => {
    const response = await request.post('/api/logout');

    if (response.status !== 200) {
        return errorResponse(response.data.message, response.data.errors);
    }

    return successResponse<T>(response.data.message, response.data.data);
}

export const register = async <T>(data: RegisterSchema) => {
    const response = await request.post('/api/register', data);

    if (response.status !== 201) {
        return errorResponse(response.data.message, response.data.errors);
    }

    return successResponse<T>(response.data.message, response.data.data);
}

export const getUser = async <T>() => {
    const response = await request.get('/api/user');

    if (response.status !== 200) {
        return errorResponse(response.data.message, response.data.errors);
    }
    return successResponse<T>(response.data.message, response.data.data);
}