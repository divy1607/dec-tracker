// lib/types.ts
export interface User {
    id: string;
    publicKey: string;
  }
  
  export interface ExpenseGroup {
    id: string;
    name: string;
    description: string;
    adminId: string;
    admin: User;
    members: User[];
    expenses: Expense[];
    onChainId?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Expense {
    id: string;
    description: string;
    amount: number;
    groupId: string;
    payerId: string;
    payer: User;
    participants: User[];
    timestamp: string;
    onChainId?: string;
  }
  
  export interface Settlement {
    id: string;
    fromUserId: string;
    toUserId: string;
    amount: number;
    groupId: string;
    timestamp: string;
    status: 'pending' | 'completed' | 'failed';
    transactionId?: string;
  }
  