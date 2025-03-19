// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { getGroups } from '../lib/api';
import GroupCard from '@/components/GroupCard';
import { ExpenseGroup } from '@/lib/types';

export default function Home() {
  const { connected, publicKey } = useWallet();
  const [groups, setGroups] = useState<ExpenseGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGroups() {
      if (connected && publicKey) {
        try {
          const fetchedGroups = await getGroups(publicKey.toString());
          setGroups(fetchedGroups);
        } catch (error) {
          console.error('Error fetching groups:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchGroups();
  }, [connected, publicKey]);

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Decentralized Expense Tracker</h1>
        <WalletMultiButton />
      </header>

      {!connected ? (
        <div className="text-center py-20">
          <h2 className="text-2xl mb-4">Connect your wallet to get started</h2>
          <p className="text-gray-600 mb-8">Manage your group expenses securely on the blockchain</p>
        </div>
      ) : loading ? (
        <div className="text-center py-20">
          <p>Loading your expense groups...</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Your Expense Groups</h2>
            <Link href="/create-group">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Create New Group
              </button>
            </Link>
          </div>

          {groups.length === 0 ? (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600 mb-4">You dont have any expense groups yet.</p>
              <Link href="/create-group">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                  Create Your First Group
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}