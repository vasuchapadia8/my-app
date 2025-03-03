"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface DonutChartProps {
  activeCount: number;
  inactiveCount: number;
}

export default function DonutChart({
  activeCount,
  inactiveCount,
}: DonutChartProps) {
  const data = [
    { name: "Active", value: activeCount, color: "#4caf50" },
    { name: "Inactive", value: inactiveCount, color: "#f44336" },
  ];

  const COLORS = ["#4caf50", "#f44336"];

  return (
    <Box sx={{ height: 300, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Center text */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" color="textSecondary">
          Inactive
        </Typography>
      </Box>
    </Box>
  );
}
