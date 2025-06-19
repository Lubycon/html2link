export const isProduction = () => process.env.NODE_ENV === 'production';
export const getHost = () => (isProduction() ? 'https://html2link.lubycon.io/' : 'http://localhost:3000/');
export const isServer = () => typeof window === 'undefined';

export function isIframe(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}
