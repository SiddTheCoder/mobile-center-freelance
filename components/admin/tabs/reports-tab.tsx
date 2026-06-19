"use client"

import * as React from "react"
import { useAdminCollection } from "@/components/admin/admin-state"
import {
  type EditableField,
  ResourceControls,
} from "@/components/admin/admin-shared"

const reportFields: EditableField[] = [
  { key: "name", label: "Report name" },
  { key: "value", label: "Value" },
  { key: "trend", label: "Trend" },
  { key: "note", label: "Note", type: "textarea" },
]

const newReport = {
  name: "New report",
  value: "0",
  trend: "+0%",
  note: "Report note",
}

export function ReportsTab() {
  const { rows } = useAdminCollection("reports")

  // Data arrays for mock charts
  const salesBars = [45, 30, 60, 40, 50, 85, 75, 90, 65, 80, 55]
  const profitBars = [35, 25, 50, 35, 45, 80, 70, 85, 60, 75, 45]

  return (
    <div className="space-y-6">
      {/* Title and date controls header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-slate-800 tracking-tight">Finances</h1>
          <select className="h-10 rounded-full border-0 bg-orange-100 px-4 text-sm font-semibold text-orange-700 hover:bg-orange-200 transition-colors focus:ring-0 outline-none cursor-pointer">
            <option>View range</option>
          </select>
          <span className="text-xs font-semibold text-slate-400">
            February 2023 - March 2023
          </span>
        </div>
        <div>
          <ResourceControls
            collection="reports"
            fields={reportFields}
            newItem={newReport}
            createLabel="Add Report"
          />
        </div>
      </div>

      {/* Grid of Net Sales, Gross Profit, and Margin */}
      <div className="grid gap-5 sm:grid-cols-3">
        {/* Net Sales */}
        <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Net sales</h3>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-bold text-orange-600">$4.103</span>
              <span className="text-xs font-semibold text-emerald-605">+2.12%</span>
            </div>
          </div>
          {/* Chart */}
          <div className="h-24 flex items-end gap-1.5 mt-8 border-b border-slate-100 pb-1">
            {salesBars.map((height, idx) => (
              <span
                key={idx}
                style={{ height: `${height}%` }}
                className={`flex-1 rounded-t ${
                  idx % 3 === 0 ? "bg-orange-600" : idx % 3 === 1 ? "bg-orange-450 bg-orange-400" : "bg-orange-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Gross Profit */}
        <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Gross profit</h3>
            <div className="flex items-baseline gap-2 mt-1.5">
              <span className="text-2xl font-bold text-orange-600">$3.819</span>
              <span className="text-xs font-semibold text-emerald-605">+1.40%</span>
            </div>
          </div>
          {/* Chart */}
          <div className="h-24 flex items-end gap-1.5 mt-8 border-b border-slate-100 pb-1">
            {profitBars.map((height, idx) => (
              <span
                key={idx}
                style={{ height: `${height}%` }}
                className={`flex-1 rounded-t ${
                  idx % 3 === 0 ? "bg-orange-600" : idx % 3 === 1 ? "bg-orange-400" : "bg-orange-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Margin */}
        <div className="bg-white border border-slate-150 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.015)] flex flex-col justify-between min-h-[180px]">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Margin</h3>
          </div>
          <div className="flex-grow flex items-center justify-center text-slate-400 text-xs mt-4">
            Not enough data to show the chart.
          </div>
          <div className="h-2 border-b border-slate-100 w-full" />
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="bg-white border border-slate-150 rounded-2xl p-6 shadow-[0_2px_8px_rgba(0,0,0,0.015)]">
        <h2 className="text-sm font-bold text-slate-800">Revenue breakdown</h2>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
          {[
            { label: "Bottoms", color: "bg-[#ffedd5]" }, // orange-100
            { label: "T-shirt", color: "bg-[#f97316]" }, // orange-500
            { label: "Tops", color: "bg-[#ea580c]" },    // orange-600
            { label: "Accessories", color: "bg-[#9a3412]" }, // orange-800
            { label: "Jeans", color: "bg-[#fdba74]" },   // orange-300
          ].map((legend) => (
            <span key={legend.label} className="inline-flex items-center gap-1.5">
              <span className={`size-2.5 rounded-full ${legend.color}`} />
              {legend.label}
            </span>
          ))}
        </div>

        {/* Stacked Chart */}
        <div className="mt-6 flex h-40 items-end gap-1 border-b border-slate-200 pb-1 px-1">
          {Array.from({ length: 44 }).map((_, index) => {
            // Generate heights dynamically
            const baseVal = 30 + ((index * 13) % 60)
            const seg1 = baseVal * 0.25
            const seg2 = baseVal * 0.3
            const seg3 = baseVal * 0.15
            const seg4 = baseVal * 0.2
            const seg5 = baseVal * 0.1

            return (
              <div
                key={index}
                style={{ height: `${baseVal}%` }}
                className="flex flex-col w-full rounded overflow-hidden"
              >
                <span className="w-full bg-[#fdba74]" style={{ height: `${seg5}%` }} />
                <span className="w-full bg-[#9a3412]" style={{ height: `${seg4}%` }} />
                <span className="w-full bg-[#ea580c]" style={{ height: `${seg3}%` }} />
                <span className="w-full bg-[#f97316]" style={{ height: `${seg2}%` }} />
                <span className="w-full bg-[#ffedd5]" style={{ height: `${seg1}%` }} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
