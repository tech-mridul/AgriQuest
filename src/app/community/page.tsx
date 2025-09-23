'use client';

import {useEffect, useState} from 'react';
import {collection, query, onSnapshot, orderBy} from 'firebase/firestore';
import {firestore} from '@/lib/firebase';
import type {CommunityPost} from '@/lib/types';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Textarea} from '@/components/ui/textarea';
import {LEADERBOARD} from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import {MessageCircle, ThumbsUp, ImageIcon, Send, Hash, Loader2} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {Badge} from '@/components/ui/badge';
import {addPost} from './actions';
import {useToast} from '@/hooks/use-toast';

const findImage = (id: string) => placeholderImages.placeholderImages.find(img => img.id === id);

function PostSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <div className="bg-muted rounded-full w-10 h-10 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="bg-muted h-4 w-1/4 animate-pulse rounded" />
          <div className="bg-muted h-4 w-3/4 animate-pulse rounded" />
        </div>
      </CardHeader>
    </Card>
  );
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {toast} = useToast();

  const mainUserAvatar = findImage('user-avatar-main');
  const trendingTopics = ['#CoverCrops', '#WaterConservation', '#OrganicPestControl', '#SoilHealth', '#AgriTech'];

  useEffect(() => {
    const q = query(collection(firestore, 'community-posts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const postsData: CommunityPost[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          postsData.push({
            id: doc.id,
            author: data.author,
            content: data.content,
            likes: data.likes,
            comments: data.comments,
            // Convert Firestore Timestamp to a readable string
            timestamp: data.timestamp ? new Date(data.timestamp.seconds * 1000).toLocaleDateString() : 'Just now',
            image: data.image,
          });
        });
        setPosts(postsData);
        setLoading(false);
      },
      error => {
        console.error('Error fetching posts:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to fetch community posts.',
        });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [toast]);

  const handleSubmit = async () => {
    if (!newPost.trim()) return;
    setIsSubmitting(true);
    try {
      // For this prototype, we'll use the main user's details for all new posts.
      await addPost(newPost, 'John Smith', 'user-avatar-main');
      setNewPost('');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not submit your post. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Community Hub</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <Avatar>
                <AvatarImage src={mainUserAvatar?.imageUrl} data-ai-hint={mainUserAvatar?.imageHint} />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  placeholder="Share a tip or ask a question..."
                  className="mb-2 bg-background"
                  value={newPost}
                  onChange={e => setNewPost(e.target.value)}
                  disabled={isSubmitting}
                />
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                    <ImageIcon className="w-5 h-5" />
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting || !newPost.trim()}>
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    Post
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {loading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : (
            posts.map(post => {
              const authorAvatar = findImage(post.author.avatar);
              const postImage = post.image ? findImage(post.image) : null;

              return (
                <Card key={post.id} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    <Avatar>
                      <AvatarImage src={authorAvatar?.imageUrl} data-ai-hint={authorAvatar?.imageHint} />
                      <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <p className="font-semibold">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                      </div>
                      <p className="text-sm mt-1">{post.content}</p>
                    </div>
                  </CardHeader>
                  {postImage && (
                    <CardContent>
                      <div className="relative aspect-video overflow-hidden rounded-lg border">
                        <Image
                          src={postImage.imageUrl}
                          alt="Post image"
                          fill
                          style={{objectFit: 'cover'}}
                          data-ai-hint={postImage.imageHint}
                        />
                      </div>
                    </CardContent>
                  )}
                  <CardFooter className="flex gap-1 bg-muted/50 py-2 px-6">
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })
          )}
        </div>
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="text-primary" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map(topic => (
                  <Badge
                    key={topic}
                    variant="secondary"
                    className="text-sm cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link href="#">{topic}</Link>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {LEADERBOARD.slice(0, 3).map(user => {
                const avatar = findImage(user.farmer.avatar);
                return (
                  <div key={user.rank} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                      <AvatarFallback>{user.farmer.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">{user.farmer.name}</p>
                      <p className="text-xs text-muted-foreground">{user.score.toLocaleString()} points</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
