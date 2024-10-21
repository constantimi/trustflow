import React from 'react';
import { TableHeader } from './PolicyTable';
import { useAppDispatch, useAppSelector } from '../../../../shared/store/hooks';
import { getTheme } from '../../../../shared/store/app/theme';
import { Theme } from '../../../../shared/layout/theme';
import { Policy } from '../../../types/policy';
import { setPolicy } from '../../../store/user/user-slice';

interface Props {
  header: TableHeader;
  selectedPolicy: string;
}

const PolicyTableHeader = ({ header, selectedPolicy }: Props) => {
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();

  return (
    <thead className="border-b" style={{ borderColor: theme.border.primary }}>
      <tr>
        <th />
        {Object.keys(header).map((policy) => (
          <th
            key={policy}
            className="rounded-t-2xl"
            style={{
              backgroundColor:
                selectedPolicy === policy
                  ? theme.background.activeTab
                  : undefined,
            }}
          >
            <div className="flex flex-col items-start px-4 py-2">
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
              <Theme.PrimaryText className="text-left text-base font-normal">
                {header[policy as Policy].description}
              </Theme.PrimaryText>
              <div className="mt-4">
                <Theme.PrimaryButton
                  onClick={() => dispatch(setPolicy(policy as Policy))}
                  className="h-[2rem] w-[6rem] font-normal"
                  disable={selectedPolicy === policy}
                >
                  {selectedPolicy === policy ? 'Selected' : 'Choose'}
                </Theme.PrimaryButton>
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default PolicyTableHeader;
