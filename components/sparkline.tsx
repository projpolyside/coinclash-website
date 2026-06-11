"use client"

import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts"

export function Sparkline({
  data,
  positive,
}: {
  data: number[]
  positive: boolean
}) {
  if (!data || data.length === 0) {
    return <div className="h-12 w-full" aria-hidden="true" />
  }
  const chartData = data.map((price, i) => ({ i, price }))
  const color = positive ? "var(--color-success)" : "var(--color-destructive)"
  const gradientId = `spark-${positive ? "up" : "down"}`

  return (
    <div className="h-12 w-full" aria-hidden="true">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 2, bottom: 2, left: 0, right: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <YAxis hide domain={["dataMin", "dataMax"]} />
          <Area
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
