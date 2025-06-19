import * as amplitude from '@amplitude/analytics-browser';
import { isServer } from './env';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY ?? '';

let isInitialized = false;

export function initAmplitude() {
  if (isServer() || AMPLITUDE_API_KEY === '') {
    return;
  }

  if (isInitialized === false) {
    console.log(AMPLITUDE_API_KEY);
    amplitude.init(AMPLITUDE_API_KEY, undefined, { fetchRemoteConfig: false });

    isInitialized = true;
  }
}

export function trackEvent(eventName: string, eventProperties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && isInitialized) {
    amplitude.track(eventName, eventProperties);
  }
}
