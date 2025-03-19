// app/create-group/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import CreateGroupForm from '../../components/CreateGroupForm';
import { createExpenseGroup } from '@/lib/program';

export default function CreateGroupPage() {
  const router = useRouter();
  const { connected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (name: string, description: string) => {
    if (!connected) {
      setError('Please connect your wallet first');
      return;
    }
    
    if (!name.trim()) {
      setError('Group name is required');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await createExpenseGroup(name, description);
      router.push('/');
    } catch (err) {
      console.error('Error creating group:', err);
      setError('Failed to create group. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Create Expense Group</h1>
        <WalletMultiButton />
      </header>

      {!connected ? (
        <div className="text-center py-20">
          <h2 className="text-2xl mb-4">Connect your wallet to create a group</h2>
          <p className="text-gray-600">You need to connect your Phantom wallet to continue</p>
        </div>
      ) : (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <CreateGroupForm 
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            onCancel={() => router.push('/')}
          />
        </div>
      )}
    </div>
  );
}