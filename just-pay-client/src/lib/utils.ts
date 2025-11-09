import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ErrorResponse, Errors, SuccessResponse } from "../type"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function successResponse<T>(message: string, data: T): SuccessResponse<T> {
  return {
    status: 'success',
    message,
    data
  }
}

export function errorResponse(message: string, errors: Errors = []): ErrorResponse {
  return {
    status: 'error',
    message,
    errors: errors
  }
}