// components/DashboardContent.tsx
"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Button, Grid } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DonutChart from "./DonutChart";
import { GridApi } from "ag-grid-community";
import { CameraData } from "@/types";

export default function DashboardContent() {
  const [rowData, setRowData] = useState<CameraData[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  // Column definitions
  const columnDefs = [
    {
      field: "id",
      width: 50,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
    { field: "ip", width: 130 },
    { field: "name", width: 150 },
    { field: "type", width: 120 },
    { field: "club_id", headerName: "club_id", width: 100 },
    { field: "region", width: 110 },
    { field: "lat", width: 100 },
    { field: "long", width: 100 },
    {
      field: "status",
      width: 100,
      cellRenderer: (params: any) => {
        return params.value === "Active"
          ? '<span style="color: green;">Active</span>'
          : '<span style="color: red;">Inactive</span>';
      },
    },
    { field: "calibration", headerName: "calib...", width: 100 },
    { field: "resolution", headerName: "resol...", width: 100 },
    { field: "frameRate", headerName: "fram...", width: 100 },
    {
      field: "health",
      width: 100,
      cellRenderer: (params: any) => {
        return params.value === "healthy"
          ? '<div style="display: flex; justify-content: center;"><span style="color: green;">healthy</span></div>'
          : '<div style="display: flex; justify-content: center;"><span style="color: red;">unhealthy</span></div>';
      },
    },
    {
      field: "online",
      width: 90,
      cellRenderer: (params: any) => {
        return params.value
          ? '<div style="display: flex; justify-content: center;"><span style="color: green;"><i class="fa fa-check-circle"></i></span></div>'
          : '<div style="display: flex; justify-content: center;"><span style="color: red;"><i class="fa fa-times-circle"></i></span></div>';
      },
    },
    { field: "lastChecked", headerName: "lastC...", width: 130 },
    {
      field: "actions",
      width: 100,
      cellRenderer: () => {
        return "<button>⋮</button>";
      },
    },
  ];

  // Default column definitions
  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  useEffect(() => {
    // Mock data based on the screenshot
    const mockData: CameraData[] = [
      {
        id: "cam1",
        ip: "192.168...",
        name: "SAL_GR...",
        type: "Bosch-N...",
        club_id: "8299",
        region: "Midwest",
        lat: "37.7749",
        long: "-122.4194",
        status: "Active",
        calibration: "1-4999",
        resolution: "3840X2160",
        frameRate: "30",
        health: "healthy",
        online: true,
        lastChecked: "2024-12...",
      },
      {
        id: "cam2",
        ip: "192.168...",
        name: "SAL_GR...",
        type: "AXIS P1...",
        club_id: "8299",
        region: "West",
        lat: "34.0522",
        long: "-118.2437",
        status: "Inactive",
        calibration: "1-4999",
        resolution: "3840X2160",
        frameRate: "30",
        health: "healthy",
        online: false,
        lastChecked: "2024-12...",
      },
      {
        id: "cam3",
        ip: "192.168...",
        name: "SAL_GR...",
        type: "Bosch-N...",
        club_id: "8299",
        region: "East",
        lat: "40.7128",
        long: "-74.006",
        status: "Active",
        calibration: "1-4999",
        resolution: "3840X2160",
        frameRate: "30",
        health: "healthy",
        online: true,
        lastChecked: "2024-12...",
      },
      {
        id: "cam4",
        ip: "192.168...",
        name: "SAL_GR...",
        type: "Bosch-N...",
        club_id: "8298",
        region: "Midwest",
        lat: "37.7749",
        long: "-122.4194",
        status: "Active",
        calibration: "1-4999",
        resolution: "3840X2160",
        frameRate: "30",
        health: "healthy",
        online: true,
        lastChecked: "2024-12...",
      },
      {
        id: "cam5",
        ip: "192.168...",
        name: "SAL_GR...",
        type: "AXIS P1...",
        club_id: "8298",
        region: "West",
        lat: "36.0522",
        long: "-118.2437",
        status: "Inactive",
        calibration: "1-4999",
        resolution: "3840X2160",
        frameRate: "30",
        health: "healthy",
        online: false,
        lastChecked: "2024-12...",
      },
      {
        id: "cam6",
        ip: "192.168...",
        name: "SAL_GR...",
        type: "Bosch-N...",
        club_id: "8298",
        region: "East",
        lat: "37.7787",
        long: "-98.797",
        status: "Active",
        calibration: "1-4999",
        resolution: "3840X2160",
        frameRate: "30",
        health: "healthy",
        online: true,
        lastChecked: "2024-12...",
      },
    ];

    setRowData(mockData);
  }, []);

  const onGridReady = (params: any) => {
    setGridApi(params.api);
  };

  const onBtnExport = () => {
    if (gridApi) {
      gridApi.exportDataAsCsv();
    }
  };

  // Calculate active and inactive counts for the chart
  const activeCount = rowData.filter((cam) => cam.status === "Active").length;
  const inactiveCount = rowData.filter(
    (cam) => cam.status === "Inactive"
  ).length;

  return (
    <>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#0066b2",
          color: "white",
          p: 2,
          mb: 3,
          borderRadius: 1,
        }}
      >
        <Typography variant="h5" align="center">
          Argus Camera Monitoring Dashboard
        </Typography>
      </Paper>

      {/* Camera Status Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="h6">Camera Status</Typography>
          <Button
            variant="outlined"
            startIcon={<CloudDownloadIcon />}
            onClick={onBtnExport}
            size="small"
          >
            Download CSV
          </Button>
        </Box>

        {/* AG Grid Table */}
        <div
          className="ag-theme-material"
          style={{ height: 400, width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={6}
            rowSelection="multiple"
            onGridReady={onGridReady}
          />
        </div>
      </Box>

      {/* Pagination info */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <Typography variant="body2" color="textSecondary">
          1 to 6 of 6 | Page 1 of 1
        </Typography>
      </Box>

      {/* Camera Status Overview */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Camera Status Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DonutChart
              activeCount={activeCount}
              inactiveCount={inactiveCount}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
