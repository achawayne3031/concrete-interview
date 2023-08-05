import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import TablePagination from '@mui/material/TablePagination';

import { useGetAllLoanRequestMutation } from "../store/loans/api";
import { useAppDispatch } from '../store/hook';
import { useNavigate } from 'react-router-dom';

import { AllLoanRequest } from '../interface/ResponseInterface';
import { PageLoader } from '../utils/PageLoader';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, FormLabel } from '@mui/material';





export const HomePage = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
  
    useEffect(() => {
        getLoanRequestData()
    }, []);

  
    const [
        GetAllLoanRequestMutation,
      {
        isLoading: loanRequestIsLoading,
        isError: loanRequestIsError,
        data: loanRequestData,
        error: loanRequestError,
      },
    ] = useGetAllLoanRequestMutation();
    
    const getLoanRequestData = () => {
        let loanData = new FormData()
        loanData.append('action', 'get_all_loan_request');
        loanData.append('transaction_id', '')

        GetAllLoanRequestMutation(loanData)
        .unwrap()
        .then((res) => {
            if (res.result) {
                let loanRequest = res.data;
                setUserDataLength(res.data.length) 
                const selectedData = loanRequest.slice(0, currentRowPerPage);
                setCurrentTableData(selectedData)
                let perViewPage = Math.floor(loanRequest.length/currentRowPerPage)
                setPagnationLength(perViewPage)
                setUserIncomingData(loanRequest)
                setAllLoanRequestData(res.data)

            }
        })
        .catch((e) => {
            console.log(e)
        });
    }
    
  const [currentUser, setCurrentUser] = useState(0)


  const [allLoanRequestData, setAllLoanRequestData] = React.useState([]);

  const rowPageOption = [50, 150, 300]

  const [currentRowPerPage, setCurrentRowPerPage] = React.useState(rowPageOption[0]);
  const [currentTableData, setCurrentTableData] = React.useState<AllLoanRequest[] | null>(null);
  const [userDataLength, setUserDataLength] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [pagnationLength, setPagnationLength] = React.useState(0);
  const [userIncomingData, setUserIncomingData] = React.useState([]);



  
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
    let newPageRow = parseInt(event.target.value)
    setCurrentRowPerPage(newPageRow)
    let selectedData = allLoanRequestData.slice(0, newPageRow);
    setCurrentTableData(selectedData)
    let perViewPage = Math.floor(userIncomingData.length/newPageRow)
    setPagnationLength(perViewPage)
};


const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
) => {
    setPage(newPage)
    const updatedRows = allLoanRequestData.slice(
        newPage * currentRowPerPage,
        newPage * currentRowPerPage + currentRowPerPage,
      );
      setCurrentTableData(updatedRows)
};


const handlePaginationChange = (event: React.ChangeEvent<unknown> | null,
    page: number) => {
        let end = currentRowPerPage * page;
        let start = end - currentRowPerPage;
        const updatedRows = allLoanRequestData.slice(
            start,
            end,
          );

    setCurrentTableData(updatedRows)

}


const handleViewUserClick = (event: React.MouseEvent<HTMLElement>, transId: string) => {
    navigate(`/loan-ref/${transId}`)
};


////////// Modal Dialog //////
const [open, setOpen] = React.useState(false);
const handleClickOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
};
const [loading, setLoading] = useState(false)

//////// Form //////
const [formData, setFormData] = useState({
    full_name: "",
    loan_amount: "",
    repayment_duration: ""
});


const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({...values, [name]: value}))
}

const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    let loanData = new FormData()
    loanData.append('action', 'request_for_loan');
    loanData.append('full_name', formData.full_name)
    loanData.append('loan_amount', formData.loan_amount)
    loanData.append('repayment_duration', formData.repayment_duration)

    setLoading(true)

    GetAllLoanRequestMutation(loanData)
    .unwrap()
    .then((res) => {
        if (res.result) {
            setLoading(false)
            setOpen(false);
            getLoanRequestData()
            setFormData({
                full_name: "",
                loan_amount: "",
                repayment_duration: ""
            })
          
        }
    })
    .catch((e) => {
        setLoading(false)
        console.log(e)
    });


    setFormData({
        full_name: "",
        loan_amount: "",
        repayment_duration: ""
    })
}



  

  return (
    <div className='container'>
        <div className='d-flex mt-4'>
        <button type="button" disabled={loading} className="btn btn-primary" onClick={handleClickOpen}>Request for Loan</button>
        </div>

        {/* Dialog */}
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Request For Loan</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} className='mt-3'>
                    <TextField 
                        label="Full Name"
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{mb: 3}}
                        fullWidth
                        name='full_name'
                        value={formData.full_name}
                        onChange={handleChange}
                    />

                    <TextField 
                        label="Loan Amount"
                        required
                        variant="outlined"
                        color="secondary"
                        type="number"
                        sx={{mb: 3}}
                        fullWidth
                        name='loan_amount'
                        value={formData.loan_amount}
                        onChange={handleChange}
                    />


                    <TextField 
                        label="Repayment Duration"
                        required
                        variant="outlined"
                        color="secondary"
                        type="number"
                        sx={{mb: 3}}
                        fullWidth
                        name='repayment_duration'
                        value={formData.repayment_duration}
                        onChange={handleChange}
                    />
                    
                    <div className="form-group mt-3">
                        <button disabled={loading} type="submit" name="submit" className="btn btn-success">Submit</button>
                    </div>
                </form>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>

        <div className='row'>
        <div className='col-md-12'>


            {currentTableData != null ? 
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell align="center">Transaction ID</TableCell>
                        <TableCell align="center">Full Name</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Repayment Duration</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="center">View</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { currentTableData != null && currentTableData.map((row: AllLoanRequest, index: number) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" align="center">
                                {row.TRANSACTION_ID}
                                </TableCell>
                                <TableCell align="center">{row.FULL_NAME}</TableCell>
                                <TableCell align="center">₦{row.LOAN_AMOUNT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TableCell>
                                <TableCell align="center">{row.REPAYMENT_DURATION}</TableCell>
                                <TableCell align="right">{row.CREATED_TIME}</TableCell>
                                <TableCell align="center">
                                <button className='btn btn-secondary'  onClick={(e) => { handleViewUserClick(e, row.TRANSACTION_ID)}}>view</button>
                                </TableCell>

                            </TableRow>

                        ))}
                    </TableBody>

                    </Table>
                </TableContainer>
            : <PageLoader /> }


            <div className='d-flex justify-content-between'>
                <div className='table-pagination-wrapper'>
                <TablePagination
                    rowsPerPageOptions={rowPageOption}
                    component="div"
                    count={userDataLength}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={currentRowPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>

                <div className='pagination-wrapper'>
                    <Pagination onChange={handlePaginationChange} count={pagnationLength} size="small" />
                </div>
            </div>

        </div>
        </div>
    </div>
  )
}
