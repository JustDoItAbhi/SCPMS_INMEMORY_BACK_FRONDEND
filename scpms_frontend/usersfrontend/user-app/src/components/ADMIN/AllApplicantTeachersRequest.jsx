import React, { useEffect, useState } from "react";
import { AllTeacherRequests, ApproveTeacherProfile } from "../apis";
import axiosInstance from "../../auth/AuthMiddleWear";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Avatar,
  Typography,
  Box,
  Alert,
  Snackbar,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Badge as BadgeIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";

// Styled components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  overflow: "hidden",
  "& .MuiTableHead-root": {
    backgroundColor: "#f8f9fa",
  },
}));

const StatusChip = styled(Chip)(({ theme, status }) => ({
  fontWeight: 600,
  fontSize: "0.75rem",
  ...(status === "APPLICANT_TEACHER" && {
    backgroundColor: "#fff3e0",
    color: "#ed6c02",
    border: "1px solid #ffb74d",
  }),
  ...(status === "TEACHER" && {
    backgroundColor: "#e8f5e8",
    color: "#2e7d32",
    border: "1px solid #81c784",
  }),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: "6px 16px",
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.85rem",
  boxShadow: "none",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
}));

function AllApplicantTeachersRequest() {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [convertingId, setConvertingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const getAllTeachers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/user/getAllApplicets`);
      console.log("teachers requests:", response.data);
      
      setTeachers(response.data);
      setFilteredTeachers(response.data);
      setError("");
    } catch (err) {
      console.log("fail to get teachers request");
      setError(err.message);
      showSnackbar("Failed to load teachers", "error");
    } finally {
      setLoading(false);
    }
  };

  const convertToTeacher = async (teacherId) => {
  try {
    console.log("Converting teacher with ID:", teacherId);
    
    // Find the specific teacher being converted
    const teacherToConvert = teachers.find(t => t.id === teacherId);
    console.log("Teacher to convert:", teacherToConvert);
    
    if (!teacherToConvert) {
      throw new Error("Teacher not found");
    }
    
    console.log("TEACHER ID:", teacherToConvert.id);
    console.log("TEACHER EMAIL:", teacherToConvert.email);
    console.log("TEACHER CURRENT ROLE:", teacherToConvert.applicentRole);
    
    setConvertingId(teacherId);
    
    // Prepare the data for the API call
    const approvalData = {
      email: teacherToConvert.email,
      roles: "TEACHER" // or whatever role you want to assign
    };
    
    console.log("Sending approval data:", approvalData);
    
    // API call to convert applicant to teacher
    const response = await ApproveTeacherProfile(approvalData);
    console.log("API Response:", response);

    const updatedTeachers = teachers.map(teacher => 
      teacher.id === teacherId 
        ? { ...teacher, applicentRole: "TEACHER" } 
        : teacher
    );
    
    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
    
    showSnackbar("Successfully converted to TEACHER role", "success");
  } catch (err) {
    console.error("Failed to convert teacher:", err);
    console.error("Error details:", err.message);
    showSnackbar(err.message || "Failed to convert teacher role", "error");
  } finally {
    setConvertingId(null);
  }
};

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Filter teachers based on search
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter(
        (teacher) =>
          teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (teacher.name && teacher.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          teacher.id.toString().includes(searchTerm)
      );
      setFilteredTeachers(filtered);
    }
  }, [searchTerm, teachers]);

  useEffect(() => {
    getAllTeachers();
  }, []);

  // Stats calculation
  const totalApplicants = teachers.length;
  const convertedCount = teachers.filter(t => t.applicentRole === "TEACHER").length;
  const pendingCount = teachers.filter(t => t.applicentRole === "APPLICANT_TEACHER").length;

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      py: 4,
      px: { xs: 2, sm: 3, md: 4 }
    }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 4,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: "#333", mb: 1 }}>
                Teacher Applicants Management
              </Typography>
              <Typography variant="body1" sx={{ color: "#666" }}>
                Manage and convert teacher applicants to full teacher role
              </Typography>
            </Box>
            <Tooltip title="Refresh">
              <IconButton onClick={getAllTeachers} sx={{ bgcolor: "#f0f0f0" }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: "16px"
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>Total Applicants</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>{totalApplicants}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "white",
                borderRadius: "16px"
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>Pending Review</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>{pendingCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ 
                background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                color: "white",
                borderRadius: "16px"
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>Converted</Typography>
                  <Typography variant="h3" sx={{ fontWeight: 700 }}>{convertedCount}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>

        {/* Search Bar */}
        <Paper sx={{ p: 2, mb: 3, borderRadius: "12px" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#666" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                bgcolor: "#f8f9fa",
              },
            }}
          />
        </Paper>

        {/* Main Table */}
        <StyledTableContainer component={Paper}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Joined Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTeachers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="textSecondary">
                        No teacher requests found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTeachers.map((teacher) => (
                    <TableRow
                      key={teacher.id}
                      sx={{
                        "&:hover": {
                          bgcolor: "#f8f9fa",
                          transition: "all 0.3s ease",
                        },
                      }}
                    >
                      <TableCell>
                        <Chip
                          label={`#${teacher.id}`}
                          size="small"
                          sx={{ bgcolor: "#f0f0f0", fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Avatar sx={{ width: 32, height: 32, bgcolor: "#667eea" }}>
                            {teacher.email.charAt(0).toUpperCase()}
                          </Avatar>
                          <Typography variant="body2">{teacher.email}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <StatusChip
                          label={teacher.applicentRole === "APPLICANT_TEACHER" ? "Applicant Teacher" : "Teacher"}
                          status={teacher.applicentRole}
                          icon={teacher.applicentRole === "APPLICANT_TEACHER" ? <SchoolIcon /> : <CheckCircleIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        {teacher.createdAt ? new Date(teacher.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }) : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {teacher.applicentRole === "APPLICANT_TEACHER" ? (
                          <ActionButton
                            variant="contained"
                            color="primary"
                            startIcon={convertingId === teacher.id ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                            onClick={() => convertToTeacher(teacher.id)}
                            disabled={convertingId === teacher.id}
                            sx={{
                              background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
                            }}
                          >
                            {convertingId === teacher.id ? "Converting..." : "Convert to Teacher"}
                          </ActionButton>
                        ) : (
                          <Chip
                            label="Already Teacher"
                            color="success"
                            variant="outlined"
                            icon={<CheckCircleIcon />}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </StyledTableContainer>

        {/* Footer */}
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
            Showing {filteredTeachers.length} of {teachers.length} total applicants
          </Typography>
        </Box>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default AllApplicantTeachersRequest;