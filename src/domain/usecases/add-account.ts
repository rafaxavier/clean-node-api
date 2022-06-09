import { AccountModel } from '../models/account'

export interface AddAccountModel {
  name: string,
  email: string,
  password: string
}

export interface AddAccount {
  Add (account: AddAccountModel): AccountModel
}
