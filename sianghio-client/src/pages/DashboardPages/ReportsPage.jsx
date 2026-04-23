import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

/**
 * --- STYLING CONFIGURATION ---
 * Optimized for FULL WIDTH to eliminate dead space.
 */

const styles = {
  pageWrapper: {
    minHeight: "100vh",
    bgcolor: "#f8fafc",
    p: { xs: 2, md: 4 }, // Fluid padding
    width: "100%",
    boxSizing: "border-box",
  },
  // Main Card styling - expanded and responsive
  card: {
    borderRadius: 4,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    border: "1px solid #e2e8f0",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    mb: 2,
  },
  toggleGroup: (theme) => ({
    bgcolor: "#f1f5f9",
    p: 0.5,
    borderRadius: 2,
    "& .MuiToggleButtonGroup-grouped": {
      border: 0,
      px: 2,
      borderRadius: 1.5,
      "&.Mui-selected": {
        bgcolor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        color: theme.palette.primary.main,
        "&:hover": { bgcolor: "#fff" },
      },
    },
  }),
  gauge: {
    [`& .${gaugeClasses.valueText}`]: {
      fontSize: 28,
      fontWeight: 800,
      fontFamily: "Inter, sans-serif",
    },
  },
};

/**
 * --- DATA CONFIGURATION ---
 */

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const revenueData = [4000, 3000, 5000, 4780, 5890, 4800, 6500, 7200, 6100, 7800, 8200, 9100];
const expensesData = [2400, 1398, 3800, 2908, 4800, 3800, 4300, 5100, 4200, 5300, 5700, 6200];

const quarterlyBarData = [
  { data: [35, 44, 24, 34], label: "Series 1" },
  { data: [51, 6, 49, 30], label: "Series 2" },
];

const pieData = [
  { id: 0, value: 35, label: "Dashboard" },
  { id: 1, value: 25, label: "Reports" },
  { id: 2, value: 20, label: "Users" },
  { id: 3, value: 20, label: "Others" },
];

const sparkData = {
  users: [30, 45, 28, 80, 49, 90, 68, 85, 91, 77, 95, 110],
  revenue: [12, 18, 14, 22, 19, 30, 25, 28, 35, 32, 40, 48],
  reports: [5, 8, 6, 10, 9, 14, 11, 13, 16, 15, 19, 22],
};

/**
 * --- MAIN COMPONENT ---
 */

function ReportsPage() {
  const theme = useTheme();
  const [chartType, setChartType] = useState("bar");

  const kpiCards = [
    { label: "Monthly Users", data: sparkData.users, value: "1,284", trend: "+12%", color: theme.palette.primary.main },
    { label: "Revenue (K)", data: sparkData.revenue, value: "$48.3K", trend: "+8.4%", color: theme.palette.success.main },
    { label: "Reports Filed", data: sparkData.reports, value: "340", trend: "+5%", color: theme.palette.warning.main },
  ];

  return (
    <Box sx={styles.pageWrapper}>
      {/* Page Header - Left Aligned to match dashboard style */}
      <Box mb={4} ml={1}>
        <Typography variant="h4" fontWeight={800} color="text.primary" gutterBottom>
          Reports & Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary" fontWeight={400}>
          A comprehensive visual summary of platform performance and key metrics.
        </Typography>
      </Box>

      {/* Top Row: KPI Cards - Uses full width grid */}
      <Grid container spacing={3} mb={3}>
        {kpiCards.map((kpi) => (
          <Grid item xs={12} sm={6} md={4} key={kpi.label}>
            <Card elevation={0} sx={styles.card}>
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle2" color="text.secondary" fontWeight={700} textTransform="uppercase">
                    {kpi.label}
                  </Typography>
                  <Chip
                    label={kpi.trend}
                    size="small"
                    color={kpi.trend.startsWith("+") ? "success" : "error"}
                    sx={{ fontWeight: 800, borderRadius: 1.5 }}
                  />
                </Stack>
                <Typography variant="h3" fontWeight={800} color="text.primary" mb={1}>
                  {kpi.value}
                </Typography>
                <Box sx={{ mt: 2, height: 80 }}>
                  <SparkLineChart
                    data={kpi.data}
                    height={80}
                    color={kpi.color}
                    curve="natural"
                    area
                    showHighlight
                    showTooltip
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Middle Row: Financials and System Health */}
      <Grid container spacing={3} mb={3}>
        {/* Revenue vs Expenses - Larger proportion */}
        <Grid item xs={12} lg={8}>
          <Card elevation={0} sx={styles.card}>
            <CardContent sx={{ p: 3 }}>
              <Stack sx={styles.header}>
                <Box>
                  <Typography variant="h6" fontWeight={700}>Revenue vs Expenses</Typography>
                  <Typography variant="caption" color="text.secondary">Annual financial growth comparison</Typography>
                </Box>
                <Chip label="2024 Annual" variant="outlined" sx={{ borderRadius: 1.5, fontWeight: 600 }} />
              </Stack>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ width: "100%", height: 400 }}>
                <LineChart
                  xAxis={[{ scaleType: "point", data: months }]}
                  series={[
                    { data: revenueData, label: "Revenue", color: theme.palette.primary.main, curve: "natural", area: true },
                    { data: expensesData, label: "Expenses", color: theme.palette.error.main, curve: "natural", area: true },
                  ]}
                  margin={{ left: 50, right: 20, top: 20, bottom: 40 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* System Health Gauges */}
        <Grid item xs={12} lg={4}>
          <Card elevation={0} sx={styles.card}>
            <CardContent sx={{ p: 3, height: "100%", display: "flex", flexDirection: "column" }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>System Health</Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={2}>Real-time utilization</Typography>
              <Divider sx={{ mb: 4 }} />
              <Stack spacing={2} alignItems="center" justifyContent="center" flexGrow={1}>
                <Box textAlign="center" width="100%">
                  <Typography variant="body2" fontWeight={700} color="text.secondary" mb={1}>CPU LOAD</Typography>
                  <Gauge width={200} height={140} value={72} startAngle={-110} endAngle={110} sx={styles.gauge} />
                </Box>
                <Box textAlign="center" width="100%">
                  <Typography variant="body2" fontWeight={700} color="text.secondary" mb={1}>MEMORY USAGE</Typography>
                  <Gauge width={200} height={140} value={55} startAngle={-110} endAngle={110} sx={styles.gauge} />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Row: Growth and Distribution */}
      <Grid container spacing={3}>
        {/* Quarterly Growth */}
        <Grid item xs={12} lg={7}>
          <Card elevation={0} sx={styles.card}>
            <CardContent sx={{ p: 3 }}>
              <Stack sx={styles.header}>
                <Typography variant="h6" fontWeight={700}>Quarterly Growth</Typography>
                <ToggleButtonGroup
                  size="small"
                  value={chartType}
                  exclusive
                  onChange={(_, val) => val && setChartType(val)}
                  sx={styles.toggleGroup(theme)}
                >
                  <ToggleButton value="bar">BAR</ToggleButton>
                  <ToggleButton value="line">LINE</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ width: "100%", height: 350 }}>
                {chartType === "bar" ? (
                  <BarChart
                    series={quarterlyBarData}
                    xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" }]}
                    margin={{ left: 40, right: 20, top: 10, bottom: 40 }}
                  />
                ) : (
                  <LineChart
                    series={quarterlyBarData.map((s) => ({ ...s, curve: "natural" }))}
                    xAxis={[{ data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "point" }]}
                    margin={{ left: 40, right: 20, top: 10, bottom: 40 }}
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Traffic Distribution */}
        <Grid item xs={12} lg={5}>
          <Card elevation={0} sx={styles.card}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>Traffic Distribution</Typography>
              <Typography variant="caption" color="text.secondary" display="block" mb={2}>Engagement by section</Typography>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ width: "100%", height: 350, display: "flex", justifyContent: "center" }}>
                <PieChart
                  series={[{
                    data: pieData,
                    innerRadius: 80,
                    outerRadius: 120,
                    paddingAngle: 4,
                    cornerRadius: 8,
                    highlightScope: { faded: "global", highlighted: "item" },
                  }]}
                  margin={{ top: 0, bottom: 100, left: 0, right: 0 }}
                  slotProps={{
                    legend: {
                      direction: "row",
                      position: { vertical: "bottom", horizontal: "middle" },
                      padding: 0,
                      labelStyle: { fontSize: 13, fontWeight: 600 },
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportsPage;