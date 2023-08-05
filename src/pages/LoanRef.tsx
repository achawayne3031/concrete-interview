

import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../store/hook';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useGetAllLoanRequestMutation } from "../store/loans/api";
import { TransactionRefResponse, OverAllTransactionRefResponse } from '../interface/ResponseInterface';
import { PageLoader } from '../utils/PageLoader';


export const LoanRef = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { ref } = useParams();
    const [currentTableData, setCurrentTableData] = React.useState<TransactionRefResponse[] | null>(null);
    const [currentTransactionRef, setCurrentTransactionRef] = React.useState<OverAllTransactionRefResponse | null>(null);

    useEffect(() => {
        getCurrentTransaction(ref)
    },[]);

    const goBack = () => {
      navigate(-1)
    }

    const [
        GetAllLoanRequestMutation,
      {
        isLoading: loanRequestIsLoading,
        isError: loanRequestIsError,
        data: loanRequestData,
        error: loanRequestError,
      },
    ] = useGetAllLoanRequestMutation();


    const getCurrentTransaction = (ref: any) => {
        let loanData = new FormData()
        loanData.append('action', 'get_repayment_schedule');
        loanData.append('transaction_id', ref)
        GetAllLoanRequestMutation(loanData)
        .unwrap()
        .then((res) => {
            if (res) {
                setCurrentTableData(res.data)
                setCurrentTransactionRef(res)
            }
        })
        .catch((e) => {
            console.log(e)
        });

    }

  return (
    <div className='container mt-4'>
        <div className='row'>
            <div className='col-md-12'>
                {currentTableData != null ? 
                    <>
                        <table className='table table-striped'>
                            <tr>
                                <th>Message</th>
                                <td>{currentTransactionRef != null ? currentTransactionRef?.message : ''}</td>
                            </tr>
                            <tr>
                                <th>Transaction ID</th>
                                <td>{currentTransactionRef != null ? currentTransactionRef?.TRANSACTION_ID : ''}</td>
                            </tr>
                            <tr>
                                <th>Full Name</th>
                                <td>{currentTransactionRef !== null ? currentTransactionRef?.FULL_NAME : ''}</td>
                            </tr>
                            <tr>
                                <th>Loan Amount</th>
                                <td>₦{currentTransactionRef != null ? currentTransactionRef?.LOAN_AMOUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''}</td>
                            </tr>
                            <tr>
                                <th>Repayment Duration</th>
                                <td>{currentTransactionRef != null ? currentTransactionRef?.REPAYMENT_DURATION : ''}</td>
                            </tr>
                            <tr>
                                <th>Cumulative Repayment Amount</th>
                                <td>₦{currentTransactionRef != null ? currentTransactionRef?.CUMULATIVE_REPAYMENT_AMOUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ''}</td>
                            </tr>
                            <tr>
                                <th>Date</th>
                                <td>{currentTransactionRef != null ? currentTransactionRef?.DATE : ''}</td>
                            </tr>
                        </table>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Transaction ID</TableCell>
                                    <TableCell align="center">Loan Balance</TableCell>
                                    <TableCell align="center">Month Count</TableCell>
                                    <TableCell align="center">Expected Repayment Amount</TableCell>
                                    <TableCell align="center">Interest</TableCell>
                                    <TableCell align="center">Total Repayment Amount</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                { currentTableData != null && currentTableData.map((row: TransactionRefResponse, index: number) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" align="center">
                                        {row.TRANSACTION_ID}
                                        </TableCell>
                                        <TableCell align="center">₦{row.LOAN_BALANCE.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                        <TableCell align="center">{row.MONTH_COUNT}</TableCell>
                                        <TableCell align="center">₦{row.EXPECTED_REPAYMENT_AMOUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                        <TableCell align="center">₦{row.INTEREST.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                        <TableCell align="center">₦{row.TOTAL_REPAYMENT_AMOUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>

                            </Table>
                        </TableContainer>
                    </>

                    : <PageLoader /> }
            </div>
        </div>
    </div>
  )
}
