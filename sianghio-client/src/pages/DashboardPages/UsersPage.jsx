import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Stack,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PeopleIcon from "@mui/icons-material/People";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import BlockIcon from "@mui/icons-material/Block";

const avatarColors = ["#1976d2", "#388e3c", "#f57c00", "#7b1fa2", "#d32f2f", "#0288d1", "#455a64", "#c62828", "#2e7d32"];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14, role: "Admin", status: "Active", email: "jon.snow@example.com", joined: "2023-01-15" },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31, role: "Editor", status: "Active", email: "cersei.l@example.com", joined: "2023-02-20" },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31, role: "Viewer", status: "Inactive", email: "jaime.l@example.com", joined: "2023-03-05" },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11, role: "Editor", status: "Active", email: "arya.stark@example.com", joined: "2023-04-10" },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null, role: "Admin", status: "Active", email: "dany.t@example.com", joined: "2023-05-22" },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150, role: "Viewer", status: "Banned", email: "mel@example.com", joined: "2023-06-01" },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44, role: "Editor", status: "Active", email: "ferrara.c@example.com", joined: "2023-07-18" },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36, role: "Viewer", status: "Inactive", email: "rossini.f@example.com", joined: "2023-08-30" },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65, role: "Admin", status: "Active", email: "harvey.r@example.com", joined: "2023-09-12" },
];

const statusConfig = {
  Active: { color: "success", icon: <VerifiedUserIcon sx={{ fontSize: 14 }} /> },
  Inactive: { color: "default", icon: null },
  Banned: { color: "error", icon: <BlockIcon sx={{ fontSize: 14 }} /> },
};

const roleConfig = {
  Admin: "primary",
  Editor: "warning",
  Viewer: "default",
};

const summaryStats = [
  { label: "Total Users", value: rows.length, icon: <PeopleIcon />, color: "#1976d2", bg: "#e3f2fd" },
  { label: "Active", value: rows.filter((r) => r.status === "Active").length, icon: <VerifiedUserIcon />, color: "#388e3c", bg: "#e8f5e9" },
  { label: "Inactive", value: rows.filter((r) => r.status === "Inactive").length, icon: <PeopleIcon />, color: "#f57c00", bg: "#fff3e0" },
  { label: "Banned", value: rows.filter((r) => r.status === "Banned").length, icon: <BlockIcon />, color: "#d32f2f", bg: "#ffebee" },
];

function getInitials(row) {
  const first = row.firstName?.[0] ?? "";
  const last = row.lastName?.[0] ?? "";
  return (first + last).toUpperCase();
}

function UsersPage() {
  const [search, setSearch] = useState("");
  const [selectionModel, setSelectionModel] = useState([]);
  
  // Robust pagination state for all MUI X versions
  const [pageSize, setPageSize] = useState(5);
  const [page, setPage] = useState(0);

  const filteredRows = rows.filter((row) => {
    const fullName = `${row.firstName ?? ""} ${row.lastName ?? ""}`.toLowerCase();
    const email = row.email.toLowerCase();
    const q = search.toLowerCase();
    return fullName.includes(q) || email.includes(q) || row.role.toLowerCase().includes(q);
  });

  const columns = [
    {
      field: "fullName",
      headerName: "User",
      flex: 1.5,
      minWidth: 180,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} sx={{ py: 0.5, alignItems: "center" }}>
          <Avatar
            sx={{
              bgcolor: avatarColors[params.row.id % avatarColors.length],
              width: 36,
              height: 36,
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            {getInitials(params.row)}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
              {params.row.firstName ?? "—"} {params.row.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">{params.row.email}</Typography>
          </Box>
        </Stack>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 110,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color={roleConfig[params.value] ?? "default"} variant="outlined" />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const cfg = statusConfig[params.value] ?? {};
        return (
          <Chip
            label={params.value}
            size="small"
            color={cfg.color}
            icon={cfg.icon ?? undefined}
            variant="filled"
          />
        );
      },
    },
    { field: "age", headerName: "Age", width: 80, type: "number", align: "center", headerAlign: "center" },
    { field: "joined", headerName: "Joined", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      renderCell: () => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="View"><IconButton size="small"><VisibilityIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Edit"><IconButton size="small" color="primary"><EditIcon fontSize="small" /></IconButton></Tooltip>
          <Tooltip title="Delete"><IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton></Tooltip>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Users Management
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        View, manage, and monitor all registered users on the platform.
      </Typography>

      {/* Summary Stats */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={4} sx={{ alignItems: { xs: "stretch", sm: "flex-start" } }}>
        {summaryStats.map((stat) => (
          <Card key={stat.label} elevation={2} sx={{ borderRadius: 3, flex: 1 }}>
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <Avatar sx={{ bgcolor: stat.bg, color: stat.color, width: 44, height: 44 }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                  <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Table Card */}
      <Card elevation={2} sx={{ borderRadius: 3 }}>
        <CardContent>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2} sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" } }}>
            <Typography variant="h6" fontWeight={600}>User List</Typography>
            <Stack direction="row" spacing={1.5}>
              {/* Use slotProps for better compatibility in newer MUI versions */}
              <TextField
                size="small"
                placeholder="Search users…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ width: 220 }}
              />
              <Button variant="contained" startIcon={<PersonAddIcon />} size="small">
                Add User
              </Button>
            </Stack>
          </Stack>

          {selectionModel.length > 0 && (
            <>
              <Stack direction="row" spacing={1} mb={1}>
                <Chip label={`${selectionModel.length} selected`} size="small" color="primary" />
                <Button size="small" color="error" variant="outlined" startIcon={<DeleteIcon />}>
                  Delete Selected
                </Button>
              </Stack>
              <Divider sx={{ mb: 1 }} />
            </>
          )}

          <Box sx={{ width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={columns}
              autoHeight
              checkboxSelection
              disableRowSelectionOnClick
              
              // Version-agnostic pagination approach
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              
              // Keep newer prop for compatibility if supported
              paginationModel={{ pageSize, page }}
              onPaginationModelChange={(model) => {
                setPage(model.page);
                setPageSize(model.pageSize);
              }}
              
              pageSizeOptions={[5, 10]}
              rowHeight={60}
              sx={{
                border: "none",
                "& .MuiDataGrid-columnHeaders": { backgroundColor: "#f5f5f5", fontWeight: 700 },
                "& .MuiDataGrid-row:hover": { backgroundColor: "#f0f7ff" },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UsersPage;
