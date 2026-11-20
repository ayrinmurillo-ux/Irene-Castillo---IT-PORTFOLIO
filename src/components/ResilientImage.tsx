import {useState} from 'react';
import {Image as ImageIcon} from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export function ResilientImage({src, alt, title, className = ''}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#2B0811] via-[#1C060B] to-[#430D1B] text-[#EBC8C3] p-6 text-center ${className}`}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#160509]/70 border border-[#EBC8C3]/20">
          <ImageIcon className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="font-display text-base font-semibold tracking-tight text-[#F7E5E2]">
          {title}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
