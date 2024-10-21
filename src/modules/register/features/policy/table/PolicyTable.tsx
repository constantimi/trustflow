import React from 'react';
import { Policy } from '../../../types/policy';
import { useAppSelector } from '../../../../shared/store/hooks';
import { getPolicyState } from '../../../store/user/user-slice';
import PolicyTableHeader from './PolicyTableHeader';
import PolicyTableBody from './PolicyTableBody';
import PolicyMobileCard from './PolicyMobileCard';

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

export const tableHeader = (): TableHeader => ({
  [Policy.BASIC]: {
    title: 'Basic',
    price: '€200',
    period: 'monthly',
    description: '100% reimbursement at contracted hospitals',
  },
  [Policy.STANDARD]: {
    title: 'Standard',
    price: '€300',
    period: 'monthly',
    description: '100% reimbursement at all contracted hospitals',
  },
  [Policy.PREMIUM]: {
    title: 'Premium',
    price: '€400',
    period: 'monthly',
    description: '100% reimbursement at any hospital',
  },
});

export const tableRows: TableRow[] = [
  {
    title: 'Hospital Coverage',
    policies: {
      [Policy.BASIC]: { value: 'Contracted Hospitals Only', checked: true },
      [Policy.STANDARD]: { value: 'All Contracted Hospitals', checked: true },
      [Policy.PREMIUM]: { value: 'All Hospitals', checked: true },
    },
  },
  {
    title: 'Providers',
    policies: {
      [Policy.BASIC]: { value: '75% Coverage', checked: true },
      [Policy.STANDARD]: { value: '75% Coverage', checked: true },
      [Policy.PREMIUM]: { value: '85% Coverage', checked: true },
    },
  },
  {
    title: 'Dental Care',
    policies: {
      [Policy.BASIC]: { checked: false },
      [Policy.STANDARD]: { value: '75% Coverage', checked: true },
      [Policy.PREMIUM]: { value: '85% Coverage', checked: true },
    },
  },
  {
    title: 'District Nursing',
    policies: {
      [Policy.BASIC]: { checked: false },
      [Policy.STANDARD]: { value: 'Covered', checked: true },
      [Policy.PREMIUM]: { value: '85% Coverage', checked: true },
    },
  },
  {
    title: 'Urgent Medical Care',
    policies: {
      [Policy.BASIC]: { value: 'Contracted Providers Only', checked: true },
      [Policy.STANDARD]: { value: 'All Contracted Providers', checked: true },
      [Policy.PREMIUM]: { value: 'All Providers', checked: true },
    },
  },
  {
    title: 'Guest Accounts',
    policies: {
      [Policy.BASIC]: { checked: false },
      [Policy.STANDARD]: { value: 'Available', checked: true },
      [Policy.PREMIUM]: { value: 'Available', checked: true },
    },
  },
];

export const PolicyTable = () => {
  const header = tableHeader();

  const selected = useAppSelector(getPolicyState);

  return (
    <div className="flex w-full flex-col">
      {/* Table structure for larger screens */}
      <table className="hidden w-full md:table">
        <PolicyTableHeader header={header} selectedPolicy={selected.value} />
        <PolicyTableBody rows={tableRows} selectedPolicy={selected.value} />
      </table>

      {/* Stacked block structure for smaller screens */}
      <div className="flex w-full flex-col md:hidden">
        {Object.keys(header).map((policy) => (
          <PolicyMobileCard
            key={policy}
            policy={policy as Policy}
            header={header}
            rows={tableRows}
            selectedPolicy={selected.value}
          />
        ))}
      </div>
    </div>
  );
};
