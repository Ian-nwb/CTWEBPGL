import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  TextField,
  Stack,
  IconButton,
  Switch,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../../services/articleService";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DashArticleListPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editArticleId, setEditArticleId] = useState(null);
  const [newArticle, setNewArticle] = useState({
    slug: "",
    title: "",
    paragraphs: 0,
    preview: "",
    status: "Active",
  });

  const loadArticles = async () => {
    setLoading(true);
    try {
      const { data } = await fetchArticles();
      setArticles(data.articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleOpen = () => {
    setNewArticle({
      slug: "",
      title: "",
      paragraphs: 0,
      preview: "",
      status: "Active",
    });
    setIsEditing(false);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditArticleId(null);
  };

  const handleEdit = (article) => {
    setNewArticle(article);
    setEditArticleId(article._id);
    setIsEditing(true);
    setOpen(true);
  };

  const handleSaveArticle = async () => {
    try {
      if (isEditing) {
        await updateArticle(editArticleId, newArticle);
      } else {
        await createArticle(newArticle);
      }
      loadArticles();
      handleClose();
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Disabled" : "Active";
      await updateArticle(id, { status: newStatus });
      loadArticles();
    } catch (error) {
      console.error("Error toggling article status:", error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "slug", headerName: "Slug", flex: 1 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "paragraphs", headerName: "Paragraphs", flex: 0.5 },
    { field: "preview", headerName: "Preview", flex: 2 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={params.value === "Active" ? "success" : "error"}
          size="small"
        >
          {params.value}
        </Button>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <Switch
            checked={params.row.status === "Active"}
            onChange={() => handleToggleStatus(params.row._id, params.row.status)}
            color="primary"
          />
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Articles</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Article
        </Button>
      </Stack>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={articles}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" mb={2}>
            {isEditing ? "Edit Article" : "Add Article"}
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Slug"
              fullWidth
              value={newArticle.slug}
              onChange={(e) => setNewArticle({ ...newArticle, slug: e.target.value })}
            />
            <TextField
              label="Title"
              fullWidth
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            />
            <TextField
              label="Paragraphs"
              type="number"
              fullWidth
              value={newArticle.paragraphs}
              onChange={(e) => setNewArticle({ ...newArticle, paragraphs: parseInt(e.target.value) })}
            />
            <TextField
              label="Preview"
              fullWidth
              multiline
              rows={4}
              value={newArticle.preview}
              onChange={(e) => setNewArticle({ ...newArticle, preview: e.target.value })}
            />
            <Button variant="contained" onClick={handleSaveArticle}>
              {isEditing ? "Save Changes" : "Add Article"}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashArticleListPage;
