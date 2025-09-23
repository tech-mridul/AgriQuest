import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LEADERBOARD } from "@/lib/data";
import placeholderImages from "@/lib/placeholder-images.json";
import { Trophy } from "lucide-react";

const findImage = (id: string) => placeholderImages.placeholderImages.find(img => img.id === id);

export default function LeaderboardPage() {
  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Trophy className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Trophy className="w-5 h-5 text-orange-400" />;
    return <span className="font-mono text-sm text-muted-foreground w-5 text-center">{rank}</span>;
  };
    
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Top Farmers</CardTitle>
            <CardDescription>See who's leading the way in sustainable farming this season.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px]">Rank</TableHead>
                        <TableHead>Farmer</TableHead>
                        <TableHead className="text-right">Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {LEADERBOARD.map((entry) => {
                        const avatar = findImage(entry.farmer.avatar);
                        return (
                            <TableRow key={entry.rank}>
                                <TableCell>
                                    <div className="flex items-center justify-center h-full">
                                        {getRankBadge(entry.rank)}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                                            <AvatarFallback>{entry.farmer.name.substring(0,2)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{entry.farmer.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-mono font-bold text-lg text-primary">{entry.score.toLocaleString()}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
