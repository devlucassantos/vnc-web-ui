/// <reference types="vite/client" />

declare global {
  interface Window {
    adsbygoogle: { push: (arg: object) => void };
  }
}

export {};
