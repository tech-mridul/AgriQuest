import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Activity,
  Award,
  BookOpen,
  ChevronRight,
  Leaf,
  Sprout,
  Target,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { BADGES, EDUCATIONAL_CONTENT, MISSIONS } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const currentMissions = MISSIONS.filter(m => !m.isCompleted).slice(0, 3);
  const completedMissionCount = MISSIONS.filter(m => m.isCompleted).length;
  const sustainabilityScore = Math.round((completedMissionCount / MISSIONS.length) * 100);
  const questPoints = MISSIONS.filter(m => m.isCompleted).reduce((sum, mission) => sum + mission.points, 0);

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sustainability Score
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sustainabilityScore}%</div>
            <p className="text-xs text-muted-foreground">
              +10% from last month
            </p>
            <Progress value={sustainabilityScore} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quest Points</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{questPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Redeemable for rewards
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Missions Completed</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedMissionCount} / {MISSIONS.length}</div>
            <p className="text-xs text-muted-foreground">
              Keep up the great work!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quests</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {MISSIONS.filter(m => !m.isCompleted).length}
            </div>
            <p className="text-xs text-muted-foreground">
              New AI-powered quests available
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader className="flex-row items-center">
             <div className="flex-1">
                <CardTitle>My Current Missions</CardTitle>
                <CardDescription>
                  Complete these to boost your score and earn points.
                </CardDescription>
              </div>
              <Button asChild size="sm">
                <Link href="/missions">View All</Link>
              </Button>
          </CardHeader>
          <CardContent className="space-y-4">
             {currentMissions.length > 0 ? (
                currentMissions.map((mission) => (
                  <div key={mission.id} className="flex items-center space-x-4 p-2 rounded-lg hover:bg-muted">
                    <div className="p-2 bg-muted rounded-full">
                       <Sprout className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{mission.title}</p>
                      <p className="text-sm text-muted-foreground">{mission.description}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-accent">+{mission.points}pts</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground"/>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                  <Trophy className="w-12 h-12 text-muted-foreground mb-4"/>
                  <h3 className="text-lg font-semibold">All Missions Completed!</h3>
                  <p className="text-muted-foreground text-sm mb-4">Generate new missions to continue your quest.</p>
                  <Button asChild>
                    <Link href="/missions">Get New Missions</Link>
                  </Button>
                </div>
              )}
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Earned Badges</CardTitle>
            <CardDescription>
              Showcasing your sustainable farming achievements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {BADGES.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center text-center gap-2">
                  <Avatar className="h-16 w-16 border-2 border-accent">
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BookOpen /> Educational Hub</CardTitle>
          <CardDescription>
            Learn more about sustainable practices.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EDUCATIONAL_CONTENT.map((content) => (
              <div key={content.id} className="p-4 border rounded-lg hover:bg-muted transition-colors">
                <Badge variant="secondary" className="mb-2">{content.category}</Badge>
                <h3 className="font-semibold mb-1">{content.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{content.summary}</p>
                <Button variant="link" className="p-0 h-auto">Read More <ChevronRight className="w-4 h-4 ml-1" /></Button>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
