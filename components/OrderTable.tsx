"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const OrderTable = ({data} : any) => {
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className=" font-bold">Products</TableHead>
                <TableHead className=" font-bold">Paid</TableHead>
                <TableHead className=" font-bold">Recipient</TableHead>
                <TableHead className=" font-bold">Date</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {data.length > 0 ? data.map((order : any) =>
            (<TableRow key={order._id}>
                <TableCell className="font-medium">
                    {order.line_items.map((l:any) => (
                <div>
                  {l.price_data?.product_data.name} x
                  {l.quantity}<br />
                </div>
              ))}</TableCell>
                <TableCell className={order.paid ? 'text-green-600' : 'text-red-600'}>
                    {order.paid ? 'YES' : 'NO'}
                </TableCell>
                <TableCell>
                {order.name} : {order.email}<br />
                {order.city} , {order.postalCode} , {order.country}<br />
                {order.streetAddress}
              </TableCell>
                <TableCell className="text-right">{(new Date(order.createdAt)).toLocaleString()}</TableCell></TableRow>) )
             : <TableRow>
             <TableCell colSpan={4} className="text-center">
               No Result...
             </TableCell>
           </TableRow>}
        </TableBody>
    </Table>
  )
}

export default OrderTable