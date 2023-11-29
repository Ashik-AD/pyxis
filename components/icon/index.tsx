'use client';
import { Icon, IconProps } from '@iconify/react/dist/iconify.js';

export default function IIcon({ icon, ...rest }: IconProps) {
  return <Icon icon={icon} {...rest} />;
}
