import { useEffect, useRef } from 'react';

interface TelegramWidgetProps {
  channelUsername: string;
  width?: string | number;
  height?: number;
}

const TelegramWidget = ({ channelUsername, width = '100%', height = 600 }: TelegramWidgetProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.setAttribute('data-telegram-post', `${channelUsername}/1`);
    script.setAttribute('data-width', width.toString());
    if (height) {
      script.setAttribute('data-height', height.toString());
    }
    script.async = true;

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [channelUsername, width, height]);

  return <div ref={containerRef} className="telegram-widget-container" />;
};

export default TelegramWidget;
