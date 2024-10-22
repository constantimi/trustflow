import React from 'react';
import { Theme } from '../../layout/theme';
import { getThemeOptions } from '../../store/app/theme';
import { useAppSelector } from '../../store/hooks';
import { Mode } from '../../types/theme';
import config from '../../config/config';

const AppLogo: React.FC = () => {
  const { active } = useAppSelector(getThemeOptions);

  const src =
    active === Mode.DARK ? config.app.icon.dark : config.app.icon.light;

  return (
    <div className="flex flex-row items-center gap-2">
      <img src={src} alt={config.app.name} className="h-8 w-8" />
      <Theme.PrimaryText className="text-3xl font-normal">
        {config.app.name}
      </Theme.PrimaryText>
    </div>
  );
};

export default AppLogo;
