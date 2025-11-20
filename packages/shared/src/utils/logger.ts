/**
 * Enhanced logging utilities for Apify actors
 */

import { log as apifyLog } from 'apify';

export class Logger {
  private context: string;

  constructor(context: string = 'Actor') {
    this.context = context;
  }

  private formatMessage(message: string): string {
    return `[${this.context}] ${message}`;
  }

  info(message: string, data?: Record<string, unknown>): void {
    apifyLog.info(this.formatMessage(message), data);
  }

  debug(message: string, data?: Record<string, unknown>): void {
    apifyLog.debug(this.formatMessage(message), data);
  }

  warning(message: string, data?: Record<string, unknown>): void {
    apifyLog.warning(this.formatMessage(message), data);
  }

  error(message: string, error?: Error | unknown, data?: Record<string, unknown>): void {
    const errorData = error instanceof Error
      ? { error: error.message, stack: error.stack, ...data }
      : { error, ...data };
    apifyLog.error(this.formatMessage(message), errorData);
  }

  exception(error: Error, message?: string): void {
    apifyLog.exception(error, this.formatMessage(message || 'Unhandled exception'));
  }
}

export const createLogger = (context: string): Logger => new Logger(context);
