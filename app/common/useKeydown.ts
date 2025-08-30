import { useEffect } from 'react';

type KeydownHandler = (event: KeyboardEvent) => void;

interface UseKeydownOptions {
  preventDefault?: boolean;
}

/**
 * 키보드 이벤트를 처리하는 커스텀 훅
 * @param handler - 키보드 이벤트를 처리할 함수
 * @param deps - useEffect 의존성 배열
 * @param options - 옵션 (preventDefault 등)
 */
export const useKeydown = (
  handler: KeydownHandler,
  deps: React.DependencyList,
  options: UseKeydownOptions = { preventDefault: true },
) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (options.preventDefault) {
        event.preventDefault();
      }
      handler(event);
    };

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, deps);
};
