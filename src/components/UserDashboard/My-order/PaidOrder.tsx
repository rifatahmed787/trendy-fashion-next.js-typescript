"use client";
import React from "react";
import { useGetOrderByUserQuery } from "@/Redux/features/order/orderApi";
import { IOrder } from "@/Types/order";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/UI/Table/Table";
import Paragraph from "@/components/UI/Paragraph/Paragraph";
import Link from "next/link";
import Dropdown from "@/components/UI/Dropdown";
import TableSkeleteon from "@/components/Skeleton/TableSkeleteon";

const PaidOrder = () => {
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useGetOrderByUserQuery({});
  console.log(orders);

  const orderData = orders?.data?.filter(
    (or: IOrder) => or?.paymentType == "Online" && or?.paymentStatus
  );

  const downloadReceipt = (receiptUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = receiptUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container px-5 mx-auto py-5">
      {isLoading ? (
        <>
          <TableSkeleteon />
        </>
      ) : (
        <>
          {!isError && !error && orderData?.length > 0 ? (
            <>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Reciept URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderData?.map((order: IOrder) => (
                    <>
                      <TableRow>
                        <TableCell className="font-medium">
                          #{order?.id}
                        </TableCell>
                        <TableCell>
                          {new Date(order?.createdAt).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {order?.paymentStatus && (
                            <>
                              <Paragraph className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60">
                                Paid
                              </Paragraph>
                            </>
                          )}
                        </TableCell>
                        <TableCell>
                          {order?.paymentType == "Online" && (
                            <Paragraph>Credit Card</Paragraph>
                          )}
                        </TableCell>
                        <TableCell >
                          ${order?.totalPrice}
                        </TableCell>
                        <TableCell className="text-right">
                          <button
                            onClick={() =>
                              downloadReceipt(
                                order.receipt_url,
                                `receipt_${order.id}.pdf`
                              )
                            }
                            className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none"
                          >
                            Download
                          </button>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <div className="flex flex-col justify-center gap-10">
              <Paragraph className="mx-auto">Your Order is Empty!</Paragraph>
              <Link
                href="/products"
                className="flex mx-auto border rounded-lg py-3 px-2 font-semibold text-sm"
              >
                <svg className="fill-current mr-2 w-4" viewBox="0 0 448 512">
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PaidOrder;
