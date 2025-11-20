/**
 * Common validation utilities for actor inputs
 */

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateUrl(url: string, fieldName: string = 'URL'): void {
  if (!url) {
    throw new ValidationError(`${fieldName} is required`);
  }
  if (!isValidUrl(url)) {
    throw new ValidationError(`${fieldName} is not a valid URL: ${url}`);
  }
}

export function validateUrls(urls: string[], fieldName: string = 'URLs'): void {
  if (!Array.isArray(urls)) {
    throw new ValidationError(`${fieldName} must be an array`);
  }
  if (urls.length === 0) {
    throw new ValidationError(`${fieldName} array cannot be empty`);
  }
  urls.forEach((url, index) => {
    validateUrl(url, `${fieldName}[${index}]`);
  });
}

export function validatePositiveInteger(
  value: number,
  fieldName: string = 'Value'
): void {
  if (typeof value !== 'number') {
    throw new ValidationError(`${fieldName} must be a number`);
  }
  if (!Number.isInteger(value)) {
    throw new ValidationError(`${fieldName} must be an integer`);
  }
  if (value <= 0) {
    throw new ValidationError(`${fieldName} must be greater than 0`);
  }
}

export function validateEnum<T extends string>(
  value: string,
  allowedValues: T[],
  fieldName: string = 'Value'
): asserts value is T {
  if (!allowedValues.includes(value as T)) {
    throw new ValidationError(
      `${fieldName} must be one of: ${allowedValues.join(', ')}. Got: ${value}`
    );
  }
}

export function validateRequired<T>(
  value: T | null | undefined,
  fieldName: string = 'Value'
): asserts value is T {
  if (value === null || value === undefined) {
    throw new ValidationError(`${fieldName} is required`);
  }
}
