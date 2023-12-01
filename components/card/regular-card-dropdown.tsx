'use client';
import { Dropdown, DropdownItem } from '../dropdown';
import IIcon from '../icon';
import style from './regular-card.module.scss';

export type RegularCardDropdownProps = {
  id: string;
};
export default function RegularCardDropdown({ id }: RegularCardDropdownProps) {
  return (
    <Dropdown
      list={[
        {
          label: 'Add to Playlists',
          icon: <IIcon icon={'solar:heart-outline'} />,
        },
        {
          label: 'Add to Watchlist',
          icon: <IIcon icon={'basil:add-outline'} />,
        },
      ]}
      renderItem={(item) => (
        <DropdownItem label={item.label} icon={item.icon} />
      )}
      trigger={
        <button className={style.btn__action_add}>
          <IIcon icon={'lucide:plus'} />
        </button>
      }
    />
  );
}
