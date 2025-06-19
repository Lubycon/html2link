export const isProduction = () => process.env.NODE_ENV === 'production';
export const getHost = () => (isProduction() ? 'https://html2link.lubycon.io/' : 'http://localhost:3000/');
export const isServer = () => typeof window === 'undefined';
