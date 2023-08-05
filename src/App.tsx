import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { NoMatch } from './pages/NoMatch';
import { HomePage } from './pages/HomePage';
import { LoanRef } from './pages/LoanRef';

function App() {
  return( 
        <>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='loan-ref/:ref' element={<LoanRef /> } /> 
              <Route path='*' element={<NoMatch />} />
            </Routes>
        </>
  )
}

export default App;
