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
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
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

// ── Component ─────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [chartMode, setChartMode] = useState("bar");

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Reports & Analytics
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        A comprehensive visual summary of platform performance and key metrics.
      </Typography>

      {/* ── ROW 1: KPI Summary Cards ── */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={3}>
        {kpis.map((k) => (
          <Card key={k.label} elevation={2} sx={{ borderRadius: 3, flex: 1 }}>
            <CardContent sx={{ py: 2 }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Avatar sx={{ bgcolor: k.iconBg, color: k.iconColor, width: 44, height: 44 }}>
                  {k.icon}
                </Avatar>
                <Box flex={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" color="text.secondary">{k.label}</Typography>
                    <Chip
                      size="small"
                      icon={k.positive ? <TrendingUpIcon sx={{ fontSize: "14px !important" }} /> : <TrendingDownIcon sx={{ fontSize: "14px !important" }} />}
                      label={k.delta}
                      color={k.positive ? "success" : "error"}
                      variant="outlined"
                      sx={{ fontWeight: 700, fontSize: 11 }}
                    />
                  </Stack>
                  <Typography variant="h5" fontWeight={700} mt={0.3}>{k.value}</Typography>
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
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* ── ROW 2: Revenue Line Chart + System Health ── */}
      <Stack direction={{ xs: "column", lg: "row" }} spacing={2} mb={3}>
        {/* Revenue vs Expenses */}
        <Card elevation={2} sx={{ borderRadius: 3, flex: 1 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
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
            </Stack>
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

        {/* System Health */}
        <Card elevation={2} sx={{ borderRadius: 3, width: { xs: "100%", lg: 300 }, flexShrink: 0 }}>
          <CardContent sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" fontWeight={600}>System Health</Typography>
            <Typography variant="caption" color="text.secondary">Real-time utilization</Typography>
            <Divider sx={{ my: 1.5 }} />
            <Stack flex={1} justifyContent="space-evenly">
              {[
                { label: "CPU Load",      value: 72, icon: <SpeedIcon />,  iconBg: "#e3f2fd", iconColor: "#1976d2", chipColor: "primary" },
                { label: "Memory Usage",  value: 55, icon: <MemoryIcon />, iconBg: "#e8f5e9", iconColor: "#388e3c", chipColor: "success" },
                { label: "Disk Usage",    value: 38, icon: <StorageIcon />,iconBg: "#fff3e0", iconColor: "#f57c00", chipColor: "warning" },
              ].map((g) => (
                <Box key={g.label}>
                  <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
                    <Avatar sx={{ bgcolor: g.iconBg, color: g.iconColor, width: 32, height: 32 }}>
                      {React.cloneElement(g.icon, { sx: { fontSize: 18 } })}
                    </Avatar>
                    <Typography variant="body2" fontWeight={600} flex={1}>{g.label}</Typography>
                    <Chip label={`${g.value}%`} size="small" color={g.chipColor} variant="outlined" sx={{ fontWeight: 700, minWidth: 52 }} />
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={g.value}
                    color={g.chipColor}
                    sx={{ borderRadius: 2, height: 6, bgcolor: "#f5f5f5", ml: 5.5 }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      {/* ── ROW 3: Quarterly + Pie + Top Pages ── */}
      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        {/* Quarterly Growth */}
        <Card elevation={2} sx={{ borderRadius: 3, flex: 1 }}>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
              <Box>
                <Typography variant="h6" fontWeight={600}>Quarterly Growth</Typography>
                <Typography variant="caption" color="text.secondary">Revenue & Expenses by quarter</Typography>
              </Box>
              <ToggleButtonGroup
                size="small"
                value={chartMode}
                exclusive
                onChange={(_, v) => v && setChartMode(v)}
                sx={{
                  bgcolor: "#f5f5f5",
                  p: 0.4,
                  borderRadius: 2,
                  "& .MuiToggleButtonGroup-grouped": {
                    border: 0,
                    px: 1.5,
                    borderRadius: 1.5,
                    fontWeight: 700,
                    fontSize: 11,
                    "&.Mui-selected": {
                      bgcolor: "#fff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
                      color: "#1976d2",
                    },
                  },
                }}
              >
                <ToggleButton value="bar">BAR</ToggleButton>
                <ToggleButton value="line">LINE</ToggleButton>
              </ToggleButtonGroup>
            </Stack>
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

        {/* Traffic Pie */}
        <Card elevation={2} sx={{ borderRadius: 3, width: { xs: "100%", lg: 280 }, flexShrink: 0 }}>
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
                <Stack key={p.id} direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: pieColors[i] }} />
                    <Typography variant="body2" color="text.secondary">{p.label}</Typography>
                  </Stack>
                  <Typography variant="body2" fontWeight={700}>{p.value}%</Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card elevation={2} sx={{ borderRadius: 3, width: { xs: "100%", lg: 280 }, flexShrink: 0 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600}>Top Pages</Typography>
            <Typography variant="caption" color="text.secondary">Most visited pages</Typography>
            <Divider sx={{ my: 1.5 }} />
            <Stack spacing={2}>
              {topPages.map((p, i) => (
                <Box key={p.page}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar sx={{ width: 22, height: 22, fontSize: 11, fontWeight: 700, bgcolor: "#e3f2fd", color: "#1976d2" }}>
                        {i + 1}
                      </Avatar>
                      <Typography variant="body2" fontWeight={600}>{p.page}</Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">{p.views.toLocaleString()}</Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={p.pct}
                    sx={{ borderRadius: 2, height: 5, bgcolor: "#f5f5f5", ml: 3.5 }}
                  />
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}