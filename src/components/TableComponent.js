import { useEffect, useState } from 'react';
import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Chart, PieController, ArcElement, Tooltip } from 'chart.js';
import InspectionChart from './InspectionChart';
Chart.register(PieController, ArcElement, Tooltip);

const url = "https://data.kingcounty.gov/resource/f29f-zza5.json"

const tableHeaders = [
  'Name',
  'City',
  'Zip Code',
  'Inspection Result',
  'Inspection Date',
  'Description',
];

function TableComponent() {
    const [responseData, setResponseData] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [dataSearch, setdataSearch] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
  
    useEffect(() => {
      fetch(url)
        .then(response => response.json())    // do this when promise is resolved
        .then(data => {
                        // console.log(data);     
                        setResponseData(data);  //do this when promise is resolved, store the json dump data into responseData var using func setResponseData
                        setFilteredResults(data); // by default initally set filteredResults to entire response data
                      
                      })
              .catch((err) => {
                              console.log(err.message);
                              });                    
    },[]);
  
    // to format Date in MM / DD / YYYY format
    const formatDate = date => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString(undefined, options);
    };
  
    // For Pagination to handle page change
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    // For Pagination to handle rows per page change
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
  
    // UseEffect hook to apply filters BASED on a dependency i.e. searched data by user
    useEffect(() => {
      applyFilters();
    }, [dataSearch]);
  
    // Update filtered results when the results or rowsPerPage change and set Rows per Page
    useEffect(() => {
      applyFilters();
    }, [responseData, rowsPerPage]);
  
    const applyFilters = () => {
      // if no searchable param provided for filtering, return all data
      if (dataSearch.trim() === ''){
        setFilteredResults(responseData)
        return;
      }
      // else if filter by columns provided in search bar:
      // first convert all response data for 3 searchable params/ columns to lowercase for case-insensitivity and comparison
      // filter all the response data and return all those records that satisfy the give condition in the function below.
      const myFilterData = responseData.filter((responseData) => {
      const name = responseData.name ? responseData.name.toLowerCase() : '';
      const zipCode = responseData.zip_code ? responseData.zip_code : '';
      const inspectionResult = responseData.inspection_result ? responseData.inspection_result.toLowerCase() : '';
  
      return (
        name.includes(dataSearch.toLowerCase()) || 
        zipCode.includes(dataSearch) || 
        inspectionResult===(dataSearch.toLowerCase())
      );
      });
      setFilteredResults(myFilterData);
    };
  
    return (
    
      <Container maxWidth="lg">
      <div>
        <br>
        </br>
      </div>
  
      <Grid item xs={12}>
      <InspectionChart filteredResults={filteredResults} />
      </Grid>
      <div>
        <br>
        </br>
      </div>
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #000',
          borderRadius: '4px',
          padding: '4px',
          marginBottom: '8px'
        }}
      >
        <IconButton>
          <SearchIcon />
        </IconButton>
        <TextField
          label="Search by name, zip code, or inspection result"
          value={dataSearch}
          onChange={event => setdataSearch(event.target.value)}
          fullWidth
          style={{ flex: 1 }}
          variant="standard"
        />
      </div>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
                {tableHeaders.map((header) => (   //column
                  <TableCell key={header}>
                    {header}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
  
          <TableBody>
            {filteredResults            
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {tableHeaders.map((header) =>
                  <TableCell key = {header} component="th" scope="row">
                  {header === 'Inspection Date' ? formatDate(row[header.toLowerCase().replace(' ', '_')]): row[header.toLowerCase().replace(' ', '_')]}
                </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
  
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      </Container> 
    );
}

export default TableComponent;