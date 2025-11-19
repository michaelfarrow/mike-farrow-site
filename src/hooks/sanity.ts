import { useEffect, useEffectEvent, useState } from 'react';

export function isMaybePreviewIframe(): boolean {
  return window.self !== window.top;
}
export function isMaybePreviewWindow(): boolean {
  return Boolean(window.opener);
}
export function isMaybePresentation(): boolean {
  return isMaybePreviewIframe() || isMaybePreviewWindow();
}

export function useIsMaybePresentation() {
  const [current, setCurrent] = useState<boolean>();

  const setInitial = useEffectEvent(() => {
    setCurrent(isMaybePresentation());
  });

  useEffect(() => {
    setInitial();
  }, []);

  return current;
}
