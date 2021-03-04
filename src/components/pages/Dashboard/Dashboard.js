import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Loading from '../../shared/Loading';
import Layout from '../../shared/Layout';
import useFetch from '../../../hooks/useFetch';
import ConfigModal from '../../shared/ConfigModal';
import { useLocation } from 'react-router-dom';

import './Dashboard.scss';

function Dashboard() {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openModal, setOpenModal] = useState(false);

  const { data } = useFetch('/config', { refetch: location?.key });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <div className="headline-container">
          <Typography className="headline" gutterBottom={true} variant="h4">
            Configurations
          </Typography>
          <Button
            onClick={handleOpenModal}
            size="small"
            variant="contained"
            color="primary"
          >
            Create configuration
          </Button>
        </div>
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
                        <TableRow key={config_version}>
                          <TableCell className="config-name">
                            {config_name}
                          </TableCell>
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
        <ConfigModal handleClose={handleCloseModal} open={openModal}/>
      </div>
    </Layout>
  );
}

export default Dashboard;
