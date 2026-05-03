import { useState, useMemo } from 'react';
import {
  Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent,
  DialogTitle, FormControlLabel, IconButton, InputAdornment, MenuItem,
  Paper, Stack, Switch, TextField, Typography, useMediaQuery, InputBase
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { 
  Visibility, VisibilityOff, Search as SearchIcon, 
  PictureAsPdf as PdfIcon, PersonAdd as AddIcon 
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import usersSeed from "../../assets/users.json?raw";

const roles = ['admin', 'editor', 'viewer'];
const genders = ['male', 'female', 'other'];

const blankForm = {
  firstName: '', lastName: '', age: '', gender: '',
  contactNumber: '', email: '', role: 'editor',
  username: '', password: '', address: '', isActive: true,
};

const labelize = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : '';

const loadUsers = () => {
  try {
    return {
      users: JSON.parse(usersSeed).map((user, index) => ({
        id: Number(user.id) || index + 1,
        firstName: String(user.firstName ?? '').trim(),
        lastName: String(user.lastName ?? '').trim(),
        age: String(user.age ?? '').trim(),
        gender: genders.includes(String(user.gender ?? '').trim().toLowerCase())
          ? String(user.gender ?? '').trim().toLowerCase()
          : '',
        contactNumber: String(user.contactNumber ?? '').trim(),
        email: String(user.email ?? '').trim().toLowerCase(),
        role: roles.includes(String(user.role ?? '').trim().toLowerCase())
          ? String(user.role ?? '').trim().toLowerCase()
          : 'editor',
        username: String(user.username ?? '').trim().toLowerCase(),
        password: String(user.password ?? '').trim(),
        address: String(user.address ?? '').trim(),
        isActive: typeof user.isActive === 'boolean' ? user.isActive : true,
      })),
      error: '',
    };
  } catch (e) {
    return { users: [], error: 'Unable to read users from src/assets/users.json.' };
  }
};

const seed = loadUsers();

const UsersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // States
  const [users, setUsers] = useState(seed.users);
  const [modal, setModal] = useState({ open: false, id: null });
  const [form, setForm] = useState(blankForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Enhancement 2: Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ role: 'all', gender: 'all', status: 'all' });

  // Enhancement 1: Print PDF Logic (Based on Lab 5 ReportsPage)
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=1200,height=900');
    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long', timeStyle: 'short',
    }).format(new Date());

    const tableContent = filteredUsers.map(user => `
      <tr>
        <td>${user.firstName} ${user.lastName}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${labelize(user.role)}</td>
        <td>${user.isActive ? 'Active' : 'Inactive'}</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>User Directory Report</title>
          <style>
            body { font-family: sans-serif; padding: 20px; color: #1f2937; }
            .header { border-bottom: 2px solid #d1d5db; margin-bottom: 20px; padding-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
            th { background-color: #f9fafb; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>User Directory Report</h1>
            <p>Generated on: ${exportedAt}</p>
            <p>Total Records: ${filteredUsers.length}</p>
          </div>
          <table>
            <thead>
              <tr>
                <th>Full Name</th><th>Username</th><th>Email</th><th>Role</th><th>Status</th>
              </tr>
            </thead>
            <tbody>${tableContent}</tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Enhancement 2: Search/Filter Logic
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const searchStr = `${u.firstName} ${u.lastName} ${u.email} ${u.username}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchQuery.toLowerCase());
      const matchesRole = filters.role === 'all' || u.role === filters.role;
      const matchesGender = filters.gender === 'all' || u.gender === filters.gender;
      const matchesStatus = filters.status === 'all' || 
        (filters.status === 'active' ? u.isActive : !u.isActive);

      return matchesSearch && matchesRole && matchesGender && matchesStatus;
    });
  }, [users, searchQuery, filters]);

  // Enhancement 3: Beginner-Friendly Validation Rules
  const validate = () => {
    const nextErrors = {};
    
    // Basic Required Check
    ['firstName', 'lastName', 'gender', 'role', 'email', 'address'].forEach(key => {
      if (!String(form[key]).trim()) nextErrors[key] = 'This field is required.';
    });

    // Age: Number only
    if (!/^\d+$/.test(form.age)) {
      nextErrors.age = 'Age must be a number only.';
    }

    // Contact Number: 11 digits
    if (!/^\d{11}$/.test(form.contactNumber)) {
      nextErrors.contactNumber = 'Contact number must be exactly 11 digits.';
    }

    // Username: No spaces
    if (/\s/.test(form.username)) {
      nextErrors.username = 'Username must not contain spaces.';
    } else if (!form.username) {
      nextErrors.username = 'Username is required.';
    }

    // Password: Min 8 characters
    if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    // Email format
    if (!nextErrors.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length) return setErrors(nextErrors);

    setUsers((prev) => {
      if (modal.id) return prev.map((u) => (u.id === modal.id ? { ...form, id: modal.id } : u));
      return [...prev, { ...form, id: Date.now() }];
    });
    closeModal();
  };

  const toggleStatus = (id) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)));
  };

  const closeModal = () => { setModal({ open: false, id: null }); setShowPassword(false); setErrors({}); };

  const fieldProps = (name, label, extra = {}) => ({
    name, label, value: form[name], fullWidth: true,
    error: Boolean(errors[name]), helperText: errors[name],
    onChange: (e) => {
      const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      setForm(p => ({ ...p, [name]: val }));
      if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
    },
    ...extra
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3} spacing={2}>
        <Typography variant="h4">Users</Typography>
        <Stack direction="row" spacing={1.5}>
          <Button variant="outlined" startIcon={<PdfIcon />} onClick={handlePrint}>Export PDF</Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => { setForm(blankForm); setModal({ open: true, id: null }); }}>
            Add User
          </Button>
        </Stack>
      </Stack>

      {/* Enhancement 2: Search & Filter Bar */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: alpha(theme.palette.common.black, 0.04), px: 2, py: 0.5, borderRadius: 1, flex: 1, minWidth: 250 }}>
          <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
          <InputBase placeholder="Search users..." fullWidth value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </Box>
        
        <TextField select size="small" label="Role" value={filters.role} onChange={(e) => setFilters(p => ({...p, role: e.target.value}))} sx={{ minWidth: 120 }}>
          <MenuItem value="all">All Roles</MenuItem>
          {roles.map(r => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
        </TextField>

        <TextField select size="small" label="Status" value={filters.status} onChange={(e) => setFilters(p => ({...p, status: e.target.value}))} sx={{ minWidth: 120 }}>
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Box sx={{ height: 500, width: '100%' }}>
          <DataGrid 
            rows={filteredUsers} 
            columns={[
              { field: 'id', headerName: 'ID', width: 70 },
              { field: 'fullName', headerName: 'Name', flex: 1, valueGetter: (_, row) => `${row.firstName} ${row.lastName}` },
              { field: 'username', headerName: 'Username', width: 130 },
              { field: 'email', headerName: 'Email', flex: 1 },
              { field: 'role', headerName: 'Role', width: 110, renderCell: (p) => labelize(p.value) },
              { field: 'status', headerName: 'Status', width: 120, renderCell: ({row}) => (
                <Chip size="small" label={row.isActive ? 'Active' : 'Inactive'} color={row.isActive ? 'success' : 'default'} />
              )},
              { field: 'actions', headerName: 'Actions', width: 200, sortable: false, renderCell: ({row}) => (
                <Stack direction="row" spacing={1}>
                  <Button size="small" onClick={() => setModal({ open: true, id: row.id }) || setForm(row)}>Edit</Button>
                  <Button size="small" color={row.isActive ? 'warning' : 'success'} onClick={() => toggleStatus(row.id)}>
                    {row.isActive ? 'Disable' : 'Enable'}
                  </Button>
                </Stack>
              )}
            ]}
          />
        </Box>
      </Paper>

      {/* Dialog with Strict Validation Fields */}
      <Dialog open={modal.open} onClose={closeModal} fullWidth maxWidth="md">
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle>{modal.id ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogContent dividers>
            <Stack spacing={2} sx={{ pt: 1 }}>
              <Stack direction="row" spacing={2}><TextField {...fieldProps('firstName', 'First Name')} /><TextField {...fieldProps('lastName', 'Last Name')} /></Stack>
              <Stack direction="row" spacing={2}>
                <TextField {...fieldProps('age', 'Age')} />
                <TextField {...fieldProps('gender', 'Gender', { select: true })}>
                  {genders.map(g => <MenuItem key={g} value={g}>{labelize(g)}</MenuItem>)}
                </TextField>
              </Stack>
              <Stack direction="row" spacing={2}><TextField {...fieldProps('contactNumber', 'Contact (11 Digits)')} /><TextField {...fieldProps('email', 'Email')} /></Stack>
              <Stack direction="row" spacing={2}>
                <TextField {...fieldProps('role', 'Role', { select: true })}>
                  {roles.map(r => <MenuItem key={r} value={r}>{labelize(r)}</MenuItem>)}
                </TextField>
                <TextField {...fieldProps('username', 'Username (No Spaces)')} />
              </Stack>
              <TextField {...fieldProps('password', 'Password (Min 8 Chars)', { 
                type: showPassword ? 'text' : 'password',
                InputProps: { endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                  </InputAdornment>
                )}
              })} />
              <TextField {...fieldProps('address', 'Address', { multiline: true, rows: 2 })} />
              <FormControlLabel control={<Switch checked={form.isActive} onChange={(e) => setForm(p => ({...p, isActive: e.target.checked}))} />} label="Active Status" />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit" variant="contained">Save Changes</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default UsersPage;