import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Calendar02Icon, Money01Icon, Money02Icon, MoneyBag01Icon, UserMultipleIcon, Wallet03Icon } from "hugeicons-react";

const Cards = ({DashboardData}:any) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Completed Bookings
          </CardTitle>
          <Calendar02Icon size={18} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{DashboardData.completedBookingsCount}</div>
          {/* <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Cancelled Bookings
          </CardTitle>
          <Calendar02Icon size={18} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{DashboardData.cancelledBookingsCount}</div>
          {/* <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <Wallet03Icon size={18} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rs. {DashboardData.totalIncome}</div>
          {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Players</CardTitle>
          <UserMultipleIcon size={18} />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{DashboardData.totalPlayers}</div>
          {/* <p className="text-xs text-muted-foreground">+201 since last hour</p> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
