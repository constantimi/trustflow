import React from 'react';
import { Policy } from '../../../../types/policy';
import { useAppSelector } from '../../../../../shared/store/hooks';
import { getPolicyState } from '../../../../store/insurance/insurance-slice';
import PolicyTableHeader from './PolicyTableHeader';
import PolicyTableBody from './PolicyTableBody';
import PolicyMobileCard from './PolicyMobileCard';
import { useDashboardTranslation } from '../../../../hooks/useDashboardTranslation';

export type TableHeaderCell = {
  title: string;
  price: string;
  period: string;
  description?: string;
  reimbursement?: string;
};

export type TableHeader = Record<Policy, TableHeaderCell>;

export type TableCell = { value?: string; checked?: boolean };

export type TableRow = {
  title: string;
  policies: Record<Policy, TableCell>;
};

export const tableHeader = (t: (t: string) => string): TableHeader => ({
  [Policy.BASIC]: {
    title: t('Basic'),
    price: t('€200'),
    period: t('monthly'),
    description: t('100% reimbursement at contracted hospitals'),
  },
  [Policy.STANDARD]: {
    title: t('Standard'),
    price: t('€300'),
    period: t('monthly'),
    description: t('100% reimbursement at all contracted hospitals'),
  },
  [Policy.PREMIUM]: {
    title: t('Premium'),
    price: t('€400'),
    period: t('monthly'),
    description: t('100% reimbursement at any hospital'),
  },
});

export const tableRows = (t: (t: string) => string): TableRow[] => [
  {
    title: t('Hospital Coverage'),
    policies: {
      [Policy.BASIC]: { value: t('Contracted Hospitals Only'), checked: true },
      [Policy.STANDARD]: {
        value: t('All Contracted Hospitals'),
        checked: true,
      },
      [Policy.PREMIUM]: { value: t('All Hospitals'), checked: true },
    },
  },
  {
    title: t('Providers'),
    policies: {
      [Policy.BASIC]: { value: t('75% Coverage'), checked: true },
      [Policy.STANDARD]: { value: t('75% Coverage'), checked: true },
      [Policy.PREMIUM]: { value: t('85% Coverage'), checked: true },
    },
  },
  {
    title: t('Dental Care'),
    policies: {
      [Policy.BASIC]: { checked: false },
      [Policy.STANDARD]: { value: t('75% Coverage'), checked: true },
      [Policy.PREMIUM]: { value: t('85% Coverage'), checked: true },
    },
  },
  {
    title: t('District Nursing'),
    policies: {
      [Policy.BASIC]: { checked: false },
      [Policy.STANDARD]: { value: t('Covered'), checked: true },
      [Policy.PREMIUM]: { value: t('85% Coverage'), checked: true },
    },
  },
  {
    title: t('Urgent Medical Care'),
    policies: {
      [Policy.BASIC]: { value: t('Contracted Providers Only'), checked: true },
      [Policy.STANDARD]: {
        value: t('All Contracted Providers'),
        checked: true,
      },
      [Policy.PREMIUM]: { value: t('All Providers'), checked: true },
    },
  },
  {
    title: t('Guest Accounts'),
    policies: {
      [Policy.BASIC]: { checked: false },
      [Policy.STANDARD]: { value: t('Available'), checked: true },
      [Policy.PREMIUM]: { value: t('Available'), checked: true },
    },
  },
];

export const PolicyTable = () => {
  const { t } = useDashboardTranslation();
  const selected = useAppSelector(getPolicyState);

  const header = tableHeader(t);
  const rows = tableRows(t);

  return (
    <div className="flex w-full flex-col">
      {/* Table structure for larger screens */}
      <table className="hidden w-full md:table">
        <PolicyTableHeader header={header} selectedPolicy={selected.value} />
        <PolicyTableBody rows={rows} selectedPolicy={selected.value} />
      </table>

      {/* Stacked block structure for smaller screens */}
      <div className="flex w-full flex-col md:hidden">
        {Object.keys(header).map((policy) => (
          <PolicyMobileCard
            key={policy}
            policy={policy as Policy}
            header={header}
            rows={rows}
            selectedPolicy={selected.value}
          />
        ))}
      </div>
    </div>
  );
};
