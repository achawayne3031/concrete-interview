export interface AllLoanRequest {
  TRANSACTION_ID: string
  FULL_NAME: string
  LOAN_AMOUNT: string
  REPAYMENT_DURATION: string
  CREATED_TIME: string
}

export interface TransactionRefResponse {
  ID: string
  TRANSACTION_ID: string
  LOAN_BALANCE: string
  MONTH_COUNT: string
  EXPECTED_REPAYMENT_AMOUNT: string
  INTEREST: string
  TOTAL_REPAYMENT_AMOUNT: string
}

export interface OverAllTransactionRefResponse {
  code: number
  result: boolean
  message: string
  TRANSACTION_ID: string
  FULL_NAME: string
  LOAN_AMOUNT: string
  REPAYMENT_DURATION: string
  CUMULATIVE_REPAYMENT_AMOUNT: string
  DATE: string
  data: TransactionRefResponse[]
}
