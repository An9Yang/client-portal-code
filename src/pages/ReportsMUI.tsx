/**
 * Reports Page with Material UI
 */
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import { Download, Visibility, MoreVert } from '@mui/icons-material';

const reports = [
  { id: 1, name: 'Q4 2024 Performance Report', date: '2024-12-31', status: 'Ready', size: '2.4 MB' },
  { id: 2, name: 'Annual Summary 2024', date: '2024-12-28', status: 'Processing', size: '5.1 MB' },
  { id: 3, name: 'November Analytics', date: '2024-11-30', status: 'Ready', size: '1.8 MB' },
  { id: 4, name: 'October Analytics', date: '2024-10-31', status: 'Ready', size: '1.6 MB' },
];

export default function ReportsMUI() {
  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Download and view generated reports
          </Typography>
        </Box>
        <Button variant="contained" sx={{ borderRadius: 1 }}>
          Generate Report
        </Button>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'grey.200' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Report Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Size</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight={600}>
                      {report.name}
                    </Typography>
                  </TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={report.status}
                      size="small"
                      color={report.status === 'Ready' ? 'success' : 'warning'}
                    />
                  </TableCell>
                  <TableCell>{report.size}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small">
                      <Download />
                    </IconButton>
                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}