import React from 'react';
import { TableRow } from './PolicyTable';
import { useAppSelector } from '../../../../shared/store/hooks';
import { getTheme } from '../../../../shared/store/app/theme';
import { Theme } from '../../../../shared/layout/theme';
import { Policy } from '../../../types/policy';
import CheckIcon from '../../icons/CheckIcon';

interface Props {
  rows: TableRow[];
  selectedPolicy: string;
}

const PolicyTableBody = ({ rows, selectedPolicy }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <tbody>
      {rows.map((row) => (
        <tr
          key={row.title}
          className="border-b"
          style={{ borderColor: theme.border.primary }}
        >
          <td className="py-2">
            <Theme.PrimaryText className="font-semibold">
              {row.title}
            </Theme.PrimaryText>
          </td>
          {Object.keys(row.policies).map((policy) => (
            <td
              key={policy}
              className="px-6 py-4"
              style={{
                backgroundColor:
                  selectedPolicy === policy
                    ? theme.background.activeTab
                    : undefined,
              }}
            >
              <div className="flex items-center gap-1">
                {row.policies[policy as Policy].checked && (
                  <CheckIcon
                    size="14"
                    className="flex-shrink-0"
                    fill={theme.text.primary}
                  />
                )}
                <Theme.PrimaryText className="text-base">
                  {row.policies[policy as Policy].value}
                </Theme.PrimaryText>
              </div>
            </td>
          ))}
        </tr>
      ))}

      <tr>
        <td />
        {Object.entries(Policy).map(([key]) => (
          <td
            key={key}
            className="rounded-b-lg pt-6"
            style={{
              backgroundColor:
                selectedPolicy === key ? theme.background.activeTab : undefined,
            }}
          />
        ))}
      </tr>
    </tbody>
  );
};

export default PolicyTableBody;
