import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const sampleData = [
  { id: 1, time: "10:00", department: "Cardiology", date: "2025-04-13", service: "Consultation" },
  { id: 2, time: "11:30", department: "Dermatology", date: "2025-04-14", service: "Checkup" },
  { id: 3, time: "13:00", department: "Neurology", date: "2025-04-15", service: "Follow-up" },
];

const MedicalApp = () => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 900, margin: "auto", mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Time</strong></TableCell>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Department</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Service</strong></TableCell>
            <TableCell align="center"><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.service}</TableCell>
              <TableCell align="center">
                <Button color="error" size="small" variant="contained" sx={{ mr: 1 }}>
                  Delete
                </Button>
                <Button color="primary" size="small" variant="contained">
                  Add
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MedicalApp;
