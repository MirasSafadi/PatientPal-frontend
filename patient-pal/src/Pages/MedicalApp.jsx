import React from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Card,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

const appointments = [
  {
    time: "10:00 AM",
    id: "#F5531",
    department: "ENT",
    date: "2025-05-01",
    service: "Hearing Test",
    doctor: "Dr. Erez",
    status: "Scheduled",
    notes: "Check ear pressure",
  },
  {
    time: "13:15 PM",
    id: "#G6123",
    department: "Eye Clinic",
    date: "2025-05-03",
    service: "Vision Check",
    doctor: "Dr. Ilana",
    status: "Scheduled",
    notes: "New glasses needed",
  },
];

export default function FutureAppointments() {
  const handleDelete = (id) => {
    console.log("Deleted appointment:", id);
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "auto" }}>
      {/* להזמין תור חדש */}
      <Card sx={{ textAlign: "center", mb: 4, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <EventAvailableIcon sx={{ fontSize: 40, color: "#0077cc" }} />
          <Typography variant="h6" fontWeight="bold" mt={1}>
            להזמין תור
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, borderRadius: 3 }}
          >
            תור חדש
          </Button>
        </CardContent>
      </Card>

      {/* כותרת תורים עתידיים */}
      <Typography variant="h5" fontWeight="bold" mb={1}>
        תורים עתידיים
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        שימי לב: מוצגים רק חלק מהתורים
      </Typography>

      {/* טבלת תורים */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.service}</TableCell>
                <TableCell>{row.doctor}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.notes}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleDelete(row.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
