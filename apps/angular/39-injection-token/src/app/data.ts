import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = 1000;
export const LONGER_TIMER = 2000;

export const DEFAULT_TIMER_TOKEN = new InjectionToken<number>(
  'app timer token',
);
