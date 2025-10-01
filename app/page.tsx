"use client"

import type { ComponentProps } from "react"
import { useMemo } from "react"

import { Badge } from "@/components/badge"
import { Heading, Subheading } from "@/components/heading"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/table"
import {
  flexRender,
  getCoreRowModel,
  type ColumnDef,
  useReactTable,
} from "@tanstack/react-table"

type Order = {
  id: string
  event: string
  customer: string
  tickets: number
  total: string
  status: 'Paid' | 'Pending' | 'Refunded'
  date: string
}

type BadgeColor = ComponentProps<typeof Badge>["color"]

const STATUS_COLOR: Record<Order["status"], BadgeColor> = {
  Paid: 'green',
  Pending: 'amber',
  Refunded: 'zinc',
}

export default function Page() {
  const data = useMemo<Order[]>(
    () => [
      {
        id: 'INV-001245',
        event: 'Bear Hug: Live in Concert',
        customer: 'Erica Schultz',
        tickets: 2,
        total: '$164.00',
        status: 'Paid',
        date: 'Jan 14, 2024',
      },
      {
        id: 'INV-001232',
        event: 'Viking People',
        customer: 'Carlos Hawkins',
        tickets: 4,
        total: '$312.00',
        status: 'Pending',
        date: 'Jan 12, 2024',
      },
      {
        id: 'INV-001219',
        event: 'Six Fingers — DJ Set',
        customer: 'Danielle Costa',
        tickets: 1,
        total: '$78.00',
        status: 'Paid',
        date: 'Jan 9, 2024',
      },
      {
        id: 'INV-001201',
        event: 'We All Look The Same',
        customer: 'Anika Patel',
        tickets: 3,
        total: '$225.00',
        status: 'Refunded',
        date: 'Jan 4, 2024',
      },
      {
        id: 'INV-001196',
        event: 'Bear Hug: Live in Concert',
        customer: 'Henry Bell',
        tickets: 2,
        total: '$164.00',
        status: 'Paid',
        date: 'Jan 2, 2024',
      },
    ],
    [],
  )

  const columns = useMemo<ColumnDef<Order>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'Invoice',
        cell: (info) => (
          <span className="font-medium text-zinc-950 dark:text-white">{info.getValue<string>()}</span>
        ),
      },
      {
        accessorKey: 'event',
        header: 'Event',
      },
      {
        accessorKey: 'customer',
        header: 'Customer',
      },
      {
        accessorKey: 'tickets',
        header: 'Tickets',
        cell: (info) => info.getValue<number>().toString(),
      },
      {
        accessorKey: 'total',
        header: 'Total',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => {
          const value = info.getValue<Order['status']>()

          return <Badge color={STATUS_COLOR[value]}>{value}</Badge>
        },
      },
      {
        accessorKey: 'date',
        header: 'Date',
      },
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="space-y-6">
      <div>
        <Heading level={1}>Recent orders</Heading>
        <p className="mt-2 max-w-2xl text-base/6 text-zinc-600 dark:text-zinc-400">
          Track payments and manage customer follow ups for your upcoming events.
        </p>
      </div>

      <section className="space-y-4">
        <div>
          <Subheading level={2}>Order details</Subheading>
          <p className="mt-1 text-sm/6 text-zinc-500 dark:text-zinc-400">
            Powered by TanStack Table for predictable sorting, filtering, and pagination integrations.
          </p>
        </div>

        <Table striped bleed>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}
