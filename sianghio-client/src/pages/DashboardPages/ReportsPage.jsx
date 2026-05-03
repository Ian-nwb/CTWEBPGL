import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Avatar,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  LinearProgress,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SpeedIcon from "@mui/icons-material/Speed";
import MemoryIcon from "@mui/icons-material/Memory";
import StorageIcon from "@mui/icons-material/Storage";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// ── Data ─────────────────────────────────────────────────────────────────────
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const revenueData  = [41000,38000,55000,49000,63000,58000,72000,80000,68000,85000,91000,104000];
const expensesData = [28000,22000,41000,33000,52000,44000,50000,59000,47000,61000,63000,74000];

const kpis = [
  {
    label: "Total Revenue",
    value: "$104K",
    delta: "+14%",
    positive: true,
    spark: [41,38,55,49,63,58,72,80,68,85,91,104],
    icon: <AttachMoneyIcon />,
    iconBg: "#e3f2fd",
    iconColor: "#1976d2",
  },
  {
    label: "Active Users",
    value: "3,841",
    delta: "+9%",
    positive: true,
    spark: [30,45,28,80,49,90,68,85,91,77,95,110],
    icon: <PeopleIcon />,
    iconBg: "#e8f5e9",
    iconColor: "#388e3c",
  },
  {
    label: "Reports Filed",
    value: "340",
    delta: "+5%",
    positive: true,
    spark: [5,8,6,10,9,14,11,13,16,15,19,22],
    icon: <BarChartIcon />,
    iconBg: "#fff3e0",
    iconColor: "#f57c00",
  },
  {
    label: "Conversion Rate",
    value: "6.2%",
    delta: "-0.3%",
    positive: false,
    spark: [6.5,6.8,6.4,6.9,6.3,6.7,6.5,6.2,6.4,6.1,6.3,6.2],
    icon: <TrendingUpIcon />,
    iconBg: "#fce4ec",
    iconColor: "#c62828",
  },
];

const quarterSeries = [
  { data: [42,58,47,63], label: "Revenue",  color: "#1976d2" },
  { data: [30,39,34,48], label: "Expenses", color: "#f57c00" },
];

const pieData = [
  { id: 0, value: 38, label: "Direct" },
  { id: 1, value: 27, label: "Organic" },
  { id: 2, value: 20, label: "Referral" },
  { id: 3, value: 15, label: "Social" },
];
const pieColors = ["#1976d2","#388e3c","#f57c00","#7b1fa2"];

const topPages = [
  { page: "/dashboard",  views: 12840, pct: 92 },
  { page: "/reports",    views: 8310,  pct: 60 },
  { page: "/users",      views: 5420,  pct: 39 },
  { page: "/settings",   views: 3200,  pct: 23 },
  { page: "/billing",    views: 1870,  pct: 13 },
];

const systemHealth = [
  { label: "CPU Load",     value: 72, icon: <SpeedIcon />,  iconBg: "#e3f2fd", iconColor: "#1976d2", chipColor: "primary" },
  { label: "Memory Usage", value: 55, icon: <MemoryIcon />, iconBg: "#e8f5e9", iconColor: "#388e3c", chipColor: "success" },
  { label: "Disk Usage",   value: 38, icon: <StorageIcon />,iconBg: "#fff3e0", iconColor: "#f57c00", chipColor: "warning" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [chartMode, setChartMode] = useState("bar");

  const handleExportPDF = () => {
    const printWindow = window.open("", "_blank", "width=1200,height=900");
    const timestamp = new Intl.DateTimeFormat("en-PH", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    const kpiHtml = kpis.map((k) => `
      <div class="kpi-card">
        <div class="kpi-label">${k.label}</div>
        <div class="kpi-value">${k.value}</div>
        <div class="kpi-delta ${k.positive ? "pos" : "neg"}">${k.delta} vs last month</div>
      </div>
    `).join("");

    printWindow.document.write(`
      <html>
        <head>
          <title>System Performance Report</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #333; }
            .header { border-bottom: 2px solid #1976d2; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            h1 { color: #1976d2; margin: 0; font-size: 28px; }
            .meta { color: #666; font-size: 14px; }
            .kpi-container { display: flex; gap: 15px; margin-bottom: 30px; }
            .kpi-card { flex: 1; border: 1px solid #e0e0e0; border-radius: 8px; padding: 15px; background: #fafafa; }
            .kpi-label { font-size: 12px; color: #666; text-transform: uppercase; font-weight: bold; }
            .kpi-value { font-size: 24px; font-weight: bold; margin: 5px 0; }
            .kpi-delta { font-size: 12px; font-weight: bold; }
            .pos { color: #2e7d32; }
            .neg { color: #d32f2f; }
            .section-title { font-size: 18px; font-weight: bold; margin: 20px 0 10px; border-left: 4px solid #1976d2; padding-left: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { background: #f5f5f5; text-align: left; padding: 12px; font-size: 13px; border-bottom: 2px solid #ddd; }
            td { padding: 12px; border-bottom: 1px solid #eee; font-size: 13px; }
            .health-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #ccc; }
            @media print { body { padding: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h1>System Performance Report</h1>
              <div class="meta">Analytics Summary Report</div>
            </div>
            <div class="meta" style="text-align:right;">
              Generated: ${timestamp}<br/>Status: <span class="pos">Active</span>
            </div>
          </div>
          <div class="kpi-container">${kpiHtml}</div>
          <div class="section-title">Traffic & Engagement Overview</div>
          <table>
            <thead>
              <tr>
                <th>Traffic Source</th><th>Share Percentage</th>
                <th>Top Visited Pages</th><th>Monthly Views</th>
              </tr>
            </thead>
            <tbody>
              ${pieData.map((p, i) => `
                <tr>
                  <td>${p.label}</td>
                  <td><strong>${p.value}%</strong></td>
                  <td>${topPages[i]?.page || "-"}</td>
                  <td>${topPages[i]?.views.toLocaleString() || "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <div style="display:flex;gap:40px;margin-top:30px;">
            <div style="flex:1;">
              <div class="section-title">System Infrastructure Health</div>
              <div class="health-row"><span>CPU Utilization</span><strong>72%</strong></div>
              <div class="health-row"><span>Memory Usage</span><strong>55%</strong></div>
              <div class="health-row"><span>Disk Space</span><strong>38%</strong></div>
            </div>
            <div style="flex:1;background:#e3f2fd;padding:20px;border-radius:8px;">
              <div style="font-weight:bold;color:#1976d2;">Executive Summary</div>
              <p style="font-size:13px;line-height:1.6;">
                The platform is seeing a <strong>14% growth in revenue</strong> this quarter.
                Traffic is largely driven by <strong>Direct (${pieData[0].value}%)</strong> and
                <strong>Organic (${pieData[1].value}%)</strong> channels.
              </p>
            </div>
          </div>
          <script>window.onload = function() { window.print(); window.close(); }<\/script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <Box sx={{ p: 3, bgcolor: "grey.50", minHeight: "100vh" }}>

      {/* ── Header ── */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Reports &amp; Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A comprehensive visual summary of platform performance and key metrics.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportPDF}
          sx={{
            ml: 3,
            flexShrink: 0,
            alignSelf: "center",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
          }}
        >
          Export Report
        </Button>
      </Box>

      {/* ── ROW 1: KPI Cards ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
          gap: 2,
          mb: 3,
        }}
      >
        {kpis.map((k) => (
          <Card key={k.label} elevation={2} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ py: 2 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
                <Avatar sx={{ bgcolor: k.iconBg, color: k.iconColor, width: 44, height: 44, flexShrink: 0 }}>
                  {k.icon}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                    <Typography variant="body2" color="text.secondary">
                      {k.label}
                    </Typography>
                    <Chip
                      size="small"
                      icon={
                        k.positive
                          ? <TrendingUpIcon sx={{ fontSize: "14px !important" }} />
                          : <TrendingDownIcon sx={{ fontSize: "14px !important" }} />
                      }
                      label={k.delta}
                      color={k.positive ? "success" : "error"}
                      variant="outlined"
                      sx={{ fontWeight: 700, fontSize: 11 }}
                    />
                  </Box>
                  <Typography variant="h5" fontWeight={700} mt={0.5}>
                    {k.value}
                  </Typography>
                  <Box sx={{ mt: 1, height: 44 }}>
                    <SparkLineChart
                      data={k.spark}
                      height={44}
                      color={k.iconColor}
                      curve="natural"
                      area
                      showHighlight
                      showTooltip
                    />
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ── ROW 2: Revenue Chart + System Health ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 300px" },
          gap: 2,
          mb: 3,
        }}
      >
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
              <Box>
                <Typography variant="h6" fontWeight={600}>Revenue vs Expenses</Typography>
                <Typography variant="caption" color="text.secondary">Annual financial comparison</Typography>
              </Box>
              <Chip
                icon={<CalendarMonthIcon sx={{ fontSize: "14px !important" }} />}
                label="2024 Annual"
                variant="outlined"
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <LineChart
              xAxis={[{ scaleType: "point", data: months }]}
              series={[
                { data: revenueData,  label: "Revenue",  color: "#1976d2", curve: "natural", area: true, showMark: false },
                { data: expensesData, label: "Expenses", color: "#f57c00", curve: "natural", area: true, showMark: false },
              ]}
              height={260}
              margin={{ left: 64, right: 20, top: 16, bottom: 36 }}
            />
          </CardContent>
        </Card>

        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" fontWeight={600}>System Health</Typography>
            <Typography variant="caption" color="text.secondary">Real-time utilization</Typography>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", gap: 2 }}>
              {systemHealth.map((g) => (
                <Box key={g.label}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 0.75 }}>
                    <Avatar sx={{ bgcolor: g.iconBg, color: g.iconColor, width: 32, height: 32 }}>
                      {React.cloneElement(g.icon, { sx: { fontSize: 18 } })}
                    </Avatar>
                    <Typography variant="body2" fontWeight={600} sx={{ flex: 1 }}>
                      {g.label}
                    </Typography>
                    <Chip
                      label={`${g.value}%`}
                      size="small"
                      color={g.chipColor}
                      variant="outlined"
                      sx={{ fontWeight: 700, minWidth: 52 }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={g.value}
                    color={g.chipColor}
                    sx={{ borderRadius: 2, height: 6, bgcolor: "grey.100", ml: 5.5 }}
                  />
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* ── ROW 3: Quarterly + Pie + Top Pages ── */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 260px 260px" },
          gap: 2,
        }}
      >
        {/* Quarterly Growth */}
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Box>
                <Typography variant="h6" fontWeight={600}>Quarterly Growth</Typography>
                <Typography variant="caption" color="text.secondary">
                  Revenue &amp; Expenses by quarter
                </Typography>
              </Box>
              <ToggleButtonGroup
                size="small"
                value={chartMode}
                exclusive
                onChange={(_, v) => v && setChartMode(v)}
                sx={{
                  bgcolor: "grey.100",
                  p: 0.4,
                  borderRadius: 2,
                  "& .MuiToggleButtonGroup-grouped": {
                    border: 0,
                    px: 1.5,
                    borderRadius: 1.5,
                    fontWeight: 700,
                    fontSize: 11,
                    "&.Mui-selected": {
                      bgcolor: "background.paper",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                      color: "#1976d2",
                    },
                  },
                }}
              >
                <ToggleButton value="bar">BAR</ToggleButton>
                <ToggleButton value="line">LINE</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Divider sx={{ my: 1.5 }} />
            {chartMode === "bar" ? (
              <BarChart
                series={quarterSeries}
                xAxis={[{ data: ["Q1","Q2","Q3","Q4"], scaleType: "band" }]}
                height={240}
                margin={{ left: 44, right: 16, top: 12, bottom: 36 }}
              />
            ) : (
              <LineChart
                series={quarterSeries.map((s) => ({ ...s, curve: "natural", showMark: false }))}
                xAxis={[{ data: ["Q1","Q2","Q3","Q4"], scaleType: "point" }]}
                height={240}
                margin={{ left: 44, right: 16, top: 12, bottom: 36 }}
              />
            )}
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>Traffic Sources</Typography>
            <Typography variant="caption" color="text.secondary">Engagement by channel</Typography>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <PieChart
                series={[{
                  data: pieData,
                  innerRadius: 55,
                  outerRadius: 90,
                  paddingAngle: 3,
                  cornerRadius: 4,
                  colors: pieColors,
                  highlightScope: { faded: "global", highlighted: "item" },
                }]}
                height={190}
                margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                slotProps={{ legend: { hidden: true } }}
              />
            </Box>
            <Stack spacing={1} mt={1}>
              {pieData.map((p, i) => (
                <Box
                  key={p.id}
                  sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: pieColors[i], flexShrink: 0 }} />
                    <Typography variant="body2" color="text.secondary">{p.label}</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={700}>{p.value}%</Typography>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>Top Pages</Typography>
            <Typography variant="caption" color="text.secondary">Most visited pages</Typography>
            <Divider sx={{ my: 1.5 }} />
            <Stack spacing={2}>
              {topPages.map((p, i) => (
                <Box key={p.page}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar
                        sx={{
                          width: 22,
                          height: 22,
                          fontSize: 11,
                          fontWeight: 700,
                          bgcolor: "#e3f2fd",
                          color: "#1976d2",
                        }}
                      >
                        {i + 1}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>{p.page}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {p.views.toLocaleString()}
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={p.pct}
                    sx={{ borderRadius: 2, height: 5, bgcolor: "grey.100", ml: 3.5 }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}