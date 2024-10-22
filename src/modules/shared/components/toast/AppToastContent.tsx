import React from 'react';
import cn from 'classnames';
import { ToastContentProps, TypeOptions } from 'react-toastify';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';
import { supportColors } from '../../constants/theme';
import { Theme } from '../../layout/theme';
import ToastErrorIcon from '../icons/ToastErrorIcon';
import ToastSuccessIcon from '../icons/ToastSuccessIcon';
import ToastInfoIcon from '../icons/ToastInfoIcon';
import ToastWarningIcon from '../icons/ToastWarningIcon';

type ToastProps = {
  title: string;
  subtitle?: string;
  toast?: ToastContentProps;
};

export const handleToastIcon = (type: TypeOptions) => {
  switch (type) {
    case 'success':
      return <ToastSuccessIcon fill={supportColors.green} />;
    case 'error':
      return <ToastErrorIcon fill={supportColors.red} />;
    case 'info':
      return <ToastInfoIcon fill={supportColors.blue} />;
    case 'warning':
      return <ToastWarningIcon fill={supportColors.orange} />;
    default:
      return <ToastSuccessIcon fill={supportColors.green} />;
  }
};

const AppToastContent = ({ title, subtitle, ...toast }: ToastProps) => {
  const theme = useAppSelector(getTheme);
  const isItemCentered = !subtitle ? 'items-center' : '';
  const toastType = (toast as ToastContentProps).toastProps?.type;

  let toastStyle = {
    borderColor: supportColors.green,
    backgroundColor: theme.text.primary,
  };

  switch (toastType) {
    case 'success':
      toastStyle = {
        borderColor: supportColors.green,
        backgroundColor: theme.text.primary,
      };
      break;
    case 'error':
      toastStyle = {
        borderColor: supportColors.red,
        backgroundColor: theme.text.primary,
      };
      break;
    case 'info':
      toastStyle = {
        borderColor: supportColors.blue,
        backgroundColor: theme.text.primary,
      };
      break;
    case 'warning':
      toastStyle = {
        borderColor: supportColors.orange,
        backgroundColor: theme.text.primary,
      };
      break;
    default:
      toastStyle = {
        borderColor: supportColors.green,
        backgroundColor: theme.text.primary,
      };
  }

  return (
    <div
      className="flex h-full min-h-[63px] items-center rounded-md border-[0.5px] border-l-[9px] p-2 pr-4"
      style={{
        ...toastStyle,
        backgroundColor: theme.background.topbar,
      }}
    >
      <div className={cn('flex gap-3', isItemCentered)}>
        <div className="w-4">{handleToastIcon(toastType as TypeOptions)}</div>
        <div>
          <Theme.PrimaryText className="text-base font-medium">
            {title}
          </Theme.PrimaryText>
          {subtitle && (
            <Theme.PrimaryText className="pt-1 text-xs font-normal">
              {subtitle}
            </Theme.PrimaryText>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppToastContent;
