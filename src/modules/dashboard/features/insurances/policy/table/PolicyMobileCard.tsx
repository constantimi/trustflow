import React from 'react';
import { TableHeader, TableRow } from './PolicyTable';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../shared/store/hooks';
import { useDashboardTranslation } from '../../../../hooks/useDashboardTranslation';
import { Theme } from '../../../../../shared/layout/theme';
import { getTheme } from '../../../../../shared/store/app/theme';
import { setPolicy } from '../../../../store/insurance/insurance-slice';
import { Policy } from '../../../../types/policy';
import CheckIcon from '../../../../components/icons/CheckIcon';

interface Props {
  policy: Policy;
  header: TableHeader;
  rows: TableRow[];
  selectedPolicy: string;
}

const PolicyMobileCard = ({ policy, header, rows, selectedPolicy }: Props) => {
  const { t } = useDashboardTranslation();
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();

  return (
    <button
      key={policy}
      type="button"
      onClick={() => dispatch(setPolicy(policy as Policy))}
      className="mb-4 w-full rounded-md border p-8 pt-4 shadow-md"
      style={{
        borderColor:
          selectedPolicy === policy
            ? theme.border.secondary
            : theme.border.primary,
        backgroundColor:
          selectedPolicy === policy ? theme.background.activeTab : undefined,
      }}
    >
      <div className="flex flex-shrink-0 flex-col items-start justify-center">
        <Theme.PrimaryText className="text-left text-3xl font-semibold">
          {header[policy as Policy].title}
        </Theme.PrimaryText>

        <Theme.PrimaryText className="relative text-left text-2xl font-semibold">
          {header[policy as Policy].price && (
            <span className="mr-1">{header[policy as Policy].price}</span>
          )}
          {header[policy as Policy].period && (
            <span className="absolute top-1 text-base font-normal">
              {header[policy as Policy].period}
            </span>
          )}
        </Theme.PrimaryText>

        <Theme.PrimaryText className="break-words text-left text-base font-normal">
          {header[policy as Policy].description}
        </Theme.PrimaryText>

        <div className="mt-4">
          <Theme.PrimaryButton
            onClick={() => dispatch(setPolicy(policy as Policy))}
            className="h-[2rem] w-[6rem] font-normal"
            disable={selectedPolicy === policy}
          >
            {selectedPolicy === policy ? t('Selected') : t('Choose')}
          </Theme.PrimaryButton>
        </div>
      </div>

      {rows.map((row) => (
        <div
          key={row.title}
          className="flex justify-between border-b py-2"
          style={{ borderColor: theme.border.primary }}
        >
          <Theme.PrimaryText className="font-semibold">
            {row.title}
          </Theme.PrimaryText>
          <div className="flex items-center gap-1">
            <Theme.PrimaryText>
              {row.policies[policy as Policy].value || '-'}
            </Theme.PrimaryText>
            {row.policies[policy as Policy].checked && (
              <CheckIcon
                size="14"
                className="flex-shrink-0"
                fill={theme.text.primary}
              />
            )}
          </div>
        </div>
      ))}
    </button>
  );
};

export default PolicyMobileCard;
