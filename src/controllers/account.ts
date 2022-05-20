import { Controller, Get, Post, Patch, Delete, Body, Param, } from "@nestjs/common";
import { BankAccount, BankAccountTransaction } from "src/model/bank-account";
import { Client as StorageClient } from "src/storage/client";
import { v4 as uuidv4 } from 'uuid';

@Controller("bank-accounts")
export class AccountsController {

  private readonly accountsService: AccountsService;
  
  constructor() {
    this.accountsService = new AccountsService();
  }

  @Post()
  create(@Body() bankAccount: BankAccount) {
    return this.accountsService.create(bankAccount);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() bankAccount: BankAccount) {
    return this.accountsService.update(id, bankAccount);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }

  @Get(':id/transactions')
  getAllTransactions(
    @Param('id') id: string
  ) {
    return this.accountsService.getAllTransactions(id);
  }

  @Patch(':id/transactions/:tid')
  addTransactions(
    @Param('id') id: string,
    @Param('tid') tid: string,
    @Body() bankAccountTransactions: BankAccountTransaction[]
  ) {
    return this.accountsService.addTransactions(id, tid, bankAccountTransactions);
  }

  @Delete(':id/transactions/:tid')
  removeTransactions(@Param('id') id: string, @Param('tid') tid: string) {
    return this.accountsService.removeTransactions(id, tid);
  }
}

export class AccountsService {

  private readonly storageClient: StorageClient<BankAccount>;
  constructor() {
    this.storageClient = new StorageClient("bank-accounts");
  }

  create = (bankAccount: BankAccount): string => {
    const id = uuidv4();
    bankAccount.id = id;
    this.storageClient.putObject(id, bankAccount, ['transactions']);
    return id;
  }

  findAll = (): BankAccount[] => {
    return this.storageClient.getAllObjects();
  }

  findOne = (id: string): BankAccount => {
    return this.storageClient.getObject(id);
  }

  update = (id: string, bankAccount: BankAccount) => {
    return this.storageClient.putObject(id, bankAccount);
  }

  remove = (id: string) => {
    return this.storageClient.removeObject(id);
  }

  getAllTransactions = (id): BankAccountTransaction[] => {
    return this.storageClient.getAllObjects(`${id}/transactions`) as BankAccountTransaction[];
  }

  addTransactions = (id: string, tid: string, bankAccountTransactions: BankAccountTransaction[]) => {
    return this.storageClient.putObject(`${id}/transactions/${tid}`, bankAccountTransactions);
  }

  removeTransactions = (id: string, tid: string) => {
    return this.storageClient.removeObject(`${id}/transactions/${tid}`);
  }
}
