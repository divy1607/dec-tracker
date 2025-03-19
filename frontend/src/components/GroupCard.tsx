// components/GroupCard.tsx
'use client';

import { FC } from 'react';
import Link from 'next/link';
import { ExpenseGroup } from '@/lib/types';

interface GroupCardProps {
  group: ExpenseGroup;
}

const GroupCard: FC<GroupCardProps> = ({ group }) => {
  return (
    <Link href={`/group/${group.id}`}>
      <div className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
        <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
        <p className="text-gray-600 mb-4">{group.description}</p>
        <div className="flex justify-between text-sm">
          <span>{group.members.length} members</span>
          <span>{group.expenses.length} expenses</span>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
