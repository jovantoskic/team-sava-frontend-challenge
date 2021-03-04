import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Loading from '../../shared/Loading';
import useFetch from '../../../hooks/useFetch';

import './Dashboard.scss';

function Dashboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data } = useFetch('/config');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {data?.length ? (
        <div className="dashboard-table-container">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Config name</TableCell>
                  <TableCell>Config version</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(data => {
                    const { config_name, config_version } = data;
                    return (
                      <TableRow>
                        <TableCell>{config_name}</TableCell>
                        <TableCell>{config_version}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Dashboard;
