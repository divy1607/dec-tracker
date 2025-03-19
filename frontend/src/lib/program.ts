import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { Program, AnchorProvider, web3, BN } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { createUser, createGroupInDB, createExpenseInDB } from './api';

// Placeholder for your actual program ID
const PROGRAM_ID = new PublicKey('Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS');
const DEVNET_URL = 'https://api.devnet.solana.com';

export async function getProvider() {
  // This is a simplified version - in a real implementation you would
  // need to handle this differently since useWallet is a hook and can't be used here
  const wallet = window.solana;
  if (!wallet) throw new Error('Wallet not found');
  
  const connection = new Connection(DEVNET_URL);
  
  return new AnchorProvider(
    connection,
    wallet as any,
    AnchorProvider.defaultOptions()
  );
}

export async function createExpenseGroup(name: string, description: string) {
  const wallet = useWallet();
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error('Wallet not connected');
  }
  
  const connection = new Connection(DEVNET_URL);
  
  // Create user in the database if not exists
  await createUser(wallet.publicKey.toString());
  
  // Since we can't actually deploy the Anchor program for this demo
  // We'll simulate the blockchain interaction
  
  // In a real implementation, we would call program methods here
  // For now, we'll just create a simple transaction to simulate blockchain activity
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: wallet.publicKey,
      lamports: 100, // Small amount just to have a transaction
    })
  );
  
  const blockhash = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash.blockhash;
  transaction.feePayer = wallet.publicKey;
  
  // Sign and send transaction
  const signedTx = await wallet.signTransaction(transaction);
  const txid = await connection.sendRawTransaction(signedTx.serialize());
  await connection.confirmTransaction(txid);
  
  // Generate a PDA-like string to simulate onChainId
  const onChainId = `group_${wallet.publicKey.toString().slice(0, 8)}_${Date.now()}`;
  
  // Create group in the database
  const group = await createGroupInDB(name, description, wallet.publicKey.toString(), onChainId);
  
  return group;
}

export async function addExpense(
  groupId: string,
  description: string,
  amount: number,
  participantPublicKeys: string[]
) {
  const wallet = useWallet();
  if (!wallet.publicKey || !wallet.signTransaction) {
    throw new Error('Wallet not connected');
  }
  
  const connection = new Connection(DEVNET_URL);
  
  // Simulate blockchain transaction for adding expense
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: wallet.publicKey,
      lamports: 100,
    })
  );
  
  const blockhash = await connection.getLatestBlockhash();
  transaction.recentBlockhash = blockhash.blockhash;
  transaction.feePayer = wallet.publicKey;
  
  // Sign and send transaction
  const signedTx = await wallet.signTransaction(transaction);
  const txid = await connection.sendRawTransaction(signedTx.serialize());
  await connection.confirmTransaction(txid);
  
  // Generate a PDA-like string to simulate onChainId
  const onChainId = `expense_${wallet.publicKey.toString().slice(0, 8)}_${Date.now()}`;
  
  // Create expense in the database
  const expense = await createExpenseInDB(
    description,
    amount,
    groupId,
    wallet.publicKey.toString(),
    participantPublicKeys,
    onChainId
  );
  
  return expense;
}