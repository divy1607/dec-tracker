const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function createUser(publicKey: string) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ publicKey }),
  });

  if (!response.ok) {
    throw new Error('Failed to create user');
  }

  return response.json();
}

export async function getGroups(userPublicKey: string) {
  const response = await fetch(`${API_URL}/groups?userPublicKey=${userPublicKey}`);

  if (!response.ok) {
    throw new Error('Failed to fetch groups');
  }

  return response.json();
}

export async function createGroupInDB(name: string, description: string, adminPublicKey: string, onChainId: string) {
  const response = await fetch(`${API_URL}/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      adminPublicKey,
      onChainId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create group in database');
  }

  return response.json();
}

export async function getGroupDetails(groupId: string) {
  const response = await fetch(`${API_URL}/groups/${groupId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch group details');
  }

  return response.json();
}

export async function createExpenseInDB(
  description: string,
  amount: number,
  groupId: string,
  payerPublicKey: string,
  participantPublicKeys: string[],
  onChainId: string
) {
  const response = await fetch(`${API_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description,
      amount,
      groupId,
      payerPublicKey,
      participantPublicKeys,
      onChainId,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create expense in database');
  }

  return response.json();
}