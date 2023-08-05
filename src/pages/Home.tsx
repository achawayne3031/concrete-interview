import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';





function Home() {

  
const rows =  [
  {
    ID: '1',
    TRANSACTION_ID: 'TRANS00120230801042657',
    FULL_NAME: 'MIKE AFOLABI',
    LOAN_AMOUNT: '600000.00',
    REPAYMENT_DURATION: '6',
    CREATED_TIME: '2023-08-01 15:26:57',
  },
  {
    ID: '2',
    TRANSACTION_ID: 'TRANS00220230802084517',
    FULL_NAME: 'JOHN SMITH',
    LOAN_AMOUNT: '450000.00',
    REPAYMENT_DURATION: '12',
    CREATED_TIME: '2023-08-02 07:45:17',
  },
  {
    ID: '3',
    TRANSACTION_ID: 'TRANS00320230802084521',
    FULL_NAME: 'OSU JAY',
    LOAN_AMOUNT: '450000.00',
    REPAYMENT_DURATION: '12',
    CREATED_TIME: '2023-08-02 07:45:21',
  },
  {
    ID: '4',
    TRANSACTION_ID: 'TRANS00420230802085012',
    FULL_NAME: 'EMMANUEL JAFAR',
    LOAN_AMOUNT: '900000.00',
    REPAYMENT_DURATION: '7',
    CREATED_TIME: '2023-08-02 07:50:12',
  },
  {
    ID: '5',
    TRANSACTION_ID: 'TRANS00520230803084856',
    FULL_NAME: 'BADE UNIQUE',
    LOAN_AMOUNT: '600000.00',
    REPAYMENT_DURATION: '5',
    CREATED_TIME: '2023-08-03 09:48:56',
  },
  {
    ID: '6',
    TRANSACTION_ID: 'TRANS00620230803085122',
    FULL_NAME: 'HAMMED IDRIS',
    LOAN_AMOUNT: '1800000.00',
    REPAYMENT_DURATION: '6',
    CREATED_TIME: '2023-08-03 09:51:22',
  },
  {
    ID: '7',
    TRANSACTION_ID: 'TRANS00720230803090201',
    FULL_NAME: 'ADLAS NIG LIMITED',
    LOAN_AMOUNT: '2000000.00',
    REPAYMENT_DURATION: '12',
    CREATED_TIME: '2023-08-03 10:02:01',
  },
  {
    ID: '8',
    TRANSACTION_ID: 'TRANS00820230803093637',
    FULL_NAME: 'ADLAS NIG LIMITED',
    LOAN_AMOUNT: '2000000.00',
    REPAYMENT_DURATION: '12',
    CREATED_TIME: '2023-08-03 10:36:37',
  },
];


  return (

    <div className='container'>
      <div className='d-flex mt-4'>
        <button>Request for Loan</button>
      </div>

      <div className='row'>
        <div className='col-md-12'>
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
              {rows.map((row) => (
                <TableRow
                  key={row.ID}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.TRANSACTION_ID}
                  </TableCell>
                  <TableCell align="center">{row.FULL_NAME}</TableCell>
                  <TableCell align="center">{row.LOAN_AMOUNT}</TableCell>
                  <TableCell align="center">{row.REPAYMENT_DURATION}</TableCell>
                  <TableCell align="right">{row.CREATED_TIME}</TableCell>
                  <TableCell align="center">
                    <button>view</button>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>


                 
        </div>
      </div>
    </div>




  );
}

export default Home;
