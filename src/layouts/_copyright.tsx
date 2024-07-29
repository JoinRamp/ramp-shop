import Link from '@/components/ui/link';
import routes from '@/config/routes';
import { useSettings } from '@/data/settings';
import cn from 'classnames';

export default function Copyright({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();
  const { settings } = useSettings();
  return (
    <span className={cn('tracking-[0.2px]', className)}>
      ©{currentYear}{' '}
      <Link
        className="text-heading font-medium hover:text-brand-dark"
        href={settings?.siteLink ?? routes?.home}
        target="_blank"
      >
        {'Ramp'}
      </Link>
      . {'Copyright'} © {'Ramp '}
      <Link
        className="text-heading font-medium hover:text-brand-dark"
        href={settings?.externalLink ?? routes?.home}
        target="_blank"
      >
        {'All rights reserved worldwide Ramp'}
      </Link>
    </span>
  );
}
