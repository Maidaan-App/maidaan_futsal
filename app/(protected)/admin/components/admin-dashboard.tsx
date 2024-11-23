"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentSales } from "./recent-sales";
import { Overview } from "./overview";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import { useGetAdminDashboardQuery } from "@/store/api/Admin/adminDashboard";
import Cards from "./Dashboard/Cards";
import Loader from "@/components/Loader";

const AdminDashboard = ({ current_user }: any) => {
  const { data: DashboardData, isLoading: DashboardDataLoading } =
    useGetAdminDashboardQuery("");
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav current_user={current_user} />
        </div>
      </Layout.Header>
      <>
        {DashboardDataLoading ? (
          <div className="flex h-[80vh] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            {DashboardData && (
              <div className="m-2">
                <div className="mb-2 flex items-center justify-between space-y-2 ">
                  <h1 className="text-2xl font-bold tracking-tight">
                    Dashboard
                  </h1>
                  {/* <div className="flex items-center space-x-2">
                    <Button>Download</Button>
                  </div> */}
                </div>
                <Tabs
                  orientation="vertical"
                  defaultValue="overview"
                  className="space-y-4"
                >
                  {/* <div className="w-full overflow-x-auto pb-2">
                    <TabsList>
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                      <TabsTrigger value="notifications">
                        Notifications
                      </TabsTrigger>
                    </TabsList>
                  </div> */}
                  <TabsContent value="overview" className="space-y-4">
                    <Cards DashboardData={DashboardData} />
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
                    <Overview DashboardData={DashboardData} />

                      {/* <Card className="col-span-1 lg:col-span-4">
                        <CardHeader>
                          <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                          <Overview DashboardData={DashboardData} />
                        </CardContent>
                      </Card> */}
                      <Card className="col-span-1 lg:col-span-3">
                        <CardHeader>
                          <CardTitle>Recent Bookings</CardTitle>
                          <CardDescription>
                            You recent Bookings.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <RecentSales DashboardData={DashboardData} />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </>
        )}
      </>
    </Layout>
  );
};

export default AdminDashboard;
