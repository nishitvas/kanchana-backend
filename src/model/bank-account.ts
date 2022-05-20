export class BankAccount {
  id: string;
  name: string;
  bank: string;
}

export class BankAccountTransaction {
  date: Date;
  remarks: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
  sortingIndex: string;
}