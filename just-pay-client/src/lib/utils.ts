import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ErrorResponse, Errors, SuccessResponse } from "../type"
import { QueryClient } from "@tanstack/react-query"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const queryClient = new QueryClient()

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

export const formatCurrency = (cents: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
};