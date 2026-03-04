"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type EmotionPoint = {
  timestampSeconds: number;
  intensity: number;
  emotion: string;
};

interface EmotionalChartProps {
  data: EmotionPoint[];
}

export function EmotionalChart({ data }: EmotionalChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-[200px] w-full flex items-center justify-center bg-black/5 rounded-xl text-black/30 text-sm">
        暂无情绪曲线数据
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload as EmotionPoint;
      return (
        <div className="bg-white border border-black/5 shadow-xl rounded-xl p-3 text-sm">
          <p className="font-bold text-black mb-1">
            {formatTime(dataPoint.timestampSeconds)}
          </p>
          <p className="text-indigo-600 font-medium">
            Intensity: {dataPoint.intensity}/10
          </p>
          {dataPoint.emotion && (
            <p className="text-black/40 capitalize mt-1 text-xs">
              {dataPoint.emotion}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f0f0f0"
          />
          <XAxis
            dataKey="timestampSeconds"
            tickFormatter={formatTime}
            stroke="#999"
            fontSize={11}
            tickMargin={8}
          />
          <YAxis
            domain={[0, 10]}
            stroke="#999"
            fontSize={11}
            tickMargin={8}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="intensity"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4, fill: "#6366f1" }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
