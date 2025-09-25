
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BADGES, MISSIONS } from "@/lib/data";
import placeholderImages from "@/lib/placeholder-images.json";
import { Award, Calendar, Edit, Leaf, ShieldCheck, Star, Target, Trophy } from "lucide-react";

export default function ProfilePage() {
    const userAvatar = placeholderImages.placeholderImages.find(img => img.id === 'user-avatar-main');
    const completedMissions = MISSIONS.filter(m => m.isCompleted);
    const questPoints = completedMissions.reduce((sum, mission) => sum + mission.points, 0);
    const sustainabilityScore = Math.round((completedMissions.length / MISSIONS.length) * 100);

    return (
        <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
                <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                </Button>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
                <div className="md:col-span-1 flex flex-col items-center">
                    <Card className="w-full">
                        <CardContent className="flex flex-col items-center pt-6 text-center">
                            <Avatar className="h-24 w-24 mb-4 border-4 border-primary">
                                <AvatarImage src={userAvatar?.imageUrl} data-ai-hint={userAvatar?.imageHint} />
                                <AvatarFallback>JS</AvatarFallback>
                            </Avatar>
                            <h2 className="text-2xl font-bold">John Smith</h2>
                            <p className="text-muted-foreground">john.smith@example.com</p>
                             <div className="flex items-center gap-2 mt-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">Joined June 2024</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2 grid gap-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="text-primary"/>
                                Overall Progress
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6 sm:grid-cols-2">
                            <div className="flex flex-col space-y-1">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-sm font-medium text-muted-foreground">Sustainability Score</span>
                                    <span className="font-bold text-primary">{sustainabilityScore}%</span>
                                </div>
                                <Progress value={sustainabilityScore} />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="text-sm text-muted-foreground">Quest Points</p>
                                    <p className="text-2xl font-bold">{questPoints.toLocaleString()}</p>
                                </div>
                                <Award className="w-8 h-8 text-yellow-500" />
                            </div>
                             <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="text-sm text-muted-foreground">Missions Completed</p>
                                    <p className="text-2xl font-bold">{completedMissions.length}</p>
                                </div>
                                <Target className="w-8 h-8 text-green-500" />
                            </div>
                              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                <div>
                                    <p className="text-sm text-muted-foreground">Badges Earned</p>
                                    <p className="text-2xl font-bold">{BADGES.length}</p>
                                </div>
                                <ShieldCheck className="w-8 h-8 text-blue-500" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>My Badges</CardTitle>
                            <CardDescription>Achievements unlocked on your sustainability journey.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-4">
                                {BADGES.map(badge => (
                                    <div key={badge.id} className="flex flex-col items-center text-center gap-2" title={badge.description}>
                                        <Avatar className="h-16 w-16 border-4 border-accent/50">
                                            <AvatarImage data-ai-hint={badge.imageHint} src={badge.icon} alt={badge.name} />
                                            <AvatarFallback><Leaf/></AvatarFallback>
                                        </Avatar>
                                        <p className="text-xs font-semibold">{badge.name}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
