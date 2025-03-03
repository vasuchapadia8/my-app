// app/page.tsx
"use client";

import { Box, Container } from "@mui/material";
import SidebarComponent from "@/components/Sidebar";
import DashboardContent from "@/components/DashboardContent";

export default function Home() {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, backgroundColor: "#f5f5f5" }}
      >
        <Container maxWidth="xl">
          <DashboardContent />
        </Container>
      </Box>
    </Box>
  );
}
