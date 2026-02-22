import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Users, LogOut, Settings, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Admin = () => {
    const [activeTab, setActiveTab] = useState("jobs");
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />

            <main className="flex-1 container py-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-heading font-bold text-slate-900">Admin Dashboard</h1>
                        <p className="text-slate-500">Manage jobs, applications, and site content.</p>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 font-bold">
                        <LogOut className="mr-2 w-4 h-4" /> Logout
                    </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-white border p-1 rounded-xl shadow-sm">
                        <TabsTrigger value="jobs" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-6">
                            <Briefcase className="mr-2 w-4 h-4" /> Manage Jobs
                        </TabsTrigger>
                        <TabsTrigger value="applications" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-6">
                            <Users className="mr-2 w-4 h-4" /> Applications
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white px-6">
                            <Settings className="mr-2 w-4 h-4" /> Settings
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="jobs">
                        <Card className="border-slate-200 shadow-sm overflow-hidden">
                            <CardHeader className="bg-white border-b flex flex-row items-center justify-between pb-4">
                                <div>
                                    <CardTitle className="text-xl">Job Listings</CardTitle>
                                </div>
                                <Button size="sm" className="bg-primary hover:bg-primary/90 font-bold">
                                    <Plus className="mr-2 w-4 h-4" /> New Job Posting
                                </Button>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="divide-y">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-slate-900">Position Title {i}</h4>
                                                <p className="text-xs text-slate-500">Posted on Feb {10 + i}, 2026 • Lusaka, Zambia</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary">Edit</Button>
                                                <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-600">Delete</Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="applications">
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">Recent Applications</CardTitle>
                            </CardHeader>
                            <CardContent className="h-64 flex items-center justify-center text-slate-400">
                                <div className="text-center space-y-2">
                                    <Users className="w-12 h-12 mx-auto opacity-20" />
                                    <p>No applications received yet.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="settings">
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">System Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <p className="text-sm text-slate-500 italic">Core configuration settings will appear here.</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />
        </div>
    );
};

export default Admin;
