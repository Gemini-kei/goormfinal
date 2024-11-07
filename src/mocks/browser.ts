// src/mocks/browser.ts
import { setupWorker } from 'msw';
import { handlers } from './handlers';



// 브라우저 환경에서만 서비스 워커 설정
export const worker = typeof window !== 'undefined' ? setupWorker(...handlers) : null;
