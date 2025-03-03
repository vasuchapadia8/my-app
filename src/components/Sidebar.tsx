// components/Sidebar.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MenuIcon from "@mui/icons-material/Menu";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Image from "next/image";

export default function SidebarComponent() {
  const [status, setStatus] = useState<string>("all");
  const [clubId, setClubId] = useState<string>("all");

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleClubIdChange = (event: SelectChangeEvent) => {
    setClubId(event.target.value);
  };

  return (
    <Box
      sx={{
        width: 250,
        backgroundColor: "white",
        borderRight: "1px solid #e0e0e0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2, display: "flex", justifyContent: "center", mb: 2 }}>
        <svg width="120" height="120" viewBox="0 0 240 240">
          <path d="M120 20L20 120L120 220L220 120L120 20Z" fill="#0066b2" />
        </svg>
      </Box>

      {/* Monitoring Tools Header */}
      <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1 }}>
        <MenuIcon sx={{ mr: 1 }} />
        <Typography variant="subtitle1">Monitoring Tools</Typography>
      </Box>

      {/* Navigation */}
      <List>
        <ListItem
          button
          selected={true}
          sx={{
            backgroundColor: "#f44336",
            color: "white",
            "&:hover": {
              backgroundColor: "#d32f2f",
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <CameraAltIcon />
          </ListItemIcon>
          <ListItemText primary="Cameras" />
        </ListItem>

        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Search & Filter */}
      <Box sx={{ p: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ display: "flex", alignItems: "center", mb: 2 }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          Search & Filter
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{ display: "flex", alignItems: "center", mb: 1 }}
          >
            <FilterListIcon fontSize="small" sx={{ mr: 0.5 }} />
            Select Filters
          </Typography>

          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel id="club-id-label">Select Club ID</InputLabel>
            <Select
              labelId="club-id-label"
              id="club-id-select"
              value={clubId}
              label="Select Club ID"
              onChange={handleClubIdChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="8299">8299</MenuItem>
              <MenuItem value="8298">8298</MenuItem>
            </Select>
          </FormControl>

          <FormControl component="fieldset">
            <FormLabel component="legend">Filter by Status</FormLabel>
            <RadioGroup
              aria-label="status"
              name="status"
              value={status}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value="all"
                control={<Radio color="error" />}
                label="All"
              />
              <FormControlLabel
                value="active"
                control={<Radio />}
                label="Active"
              />
              <FormControlLabel
                value="inactive"
                control={<Radio />}
                label="Inactive"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}
