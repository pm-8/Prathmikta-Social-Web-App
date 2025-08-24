import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User, Shield, Building2, Users } from "lucide-react";

interface LoginPageProps {
  onLogin: (userType: "citizen" | "municipal", userInfo: { username: string; name: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [citizenForm, setCitizenForm] = useState({ username: "", name: "" });
  const [officerForm, setOfficerForm] = useState({ username: "", name: "", officerId: "" });

  const handleCitizenLogin = () => {
    if (!citizenForm.username.trim() || !citizenForm.name.trim()) {
      alert("Please fill in all fields");
      return;
    }
    onLogin("citizen", {
      username: `USER#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      name: citizenForm.name
    });
  };

  const handleOfficerLogin = () => {
    if (!officerForm.username.trim() || !officerForm.name.trim() || !officerForm.officerId.trim()) {
      alert("Please fill in all fields");
      return;
    }
    onLogin("municipal", {
      username: `OFFICER#${officerForm.officerId}`,
      name: officerForm.name
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Prathmikta</h1>
          <p className="text-muted-foreground">
            Connecting Citizens with Municipal Corporations
          </p>
        </div>

        <Tabs defaultValue="citizen" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="citizen" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Citizen
            </TabsTrigger>
            <TabsTrigger value="officer" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Municipal Officer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="citizen">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Citizen Login
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="citizen-name">Full Name</Label>
                  <Input
                    id="citizen-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={citizenForm.name}
                    onChange={(e) => setCitizenForm({ ...citizenForm, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="citizen-username">Email or Phone</Label>
                  <Input
                    id="citizen-username"
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={citizenForm.username}
                    onChange={(e) => setCitizenForm({ ...citizenForm, username: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={handleCitizenLogin} className="w-full">
                    Login as Citizen
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Report and track civic issues in your area
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="officer">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Municipal Officer Login
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="officer-name">Officer Name</Label>
                  <Input
                    id="officer-name"
                    type="text"
                    placeholder="Enter your full name"
                    value={officerForm.name}
                    onChange={(e) => setOfficerForm({ ...officerForm, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="officer-id">Officer ID</Label>
                  <Input
                    id="officer-id"
                    type="text"
                    placeholder="Enter your officer ID"
                    value={officerForm.officerId}
                    onChange={(e) => setOfficerForm({ ...officerForm, officerId: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="officer-username">Department Email</Label>
                  <Input
                    id="officer-username"
                    type="email"
                    placeholder="Enter your department email"
                    value={officerForm.username}
                    onChange={(e) => setOfficerForm({ ...officerForm, username: e.target.value })}
                  />
                </div>

                <div className="pt-4">
                  <Button onClick={handleOfficerLogin} className="w-full">
                    Login as Municipal Officer
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  Manage and resolve civic issues reported by citizens
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="text-center text-xs text-muted-foreground">
          This is a demo app. No real authentication is performed.
        </div>
      </div>
    </div>
  );
}