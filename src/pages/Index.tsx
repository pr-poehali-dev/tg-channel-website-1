import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import TelegramWidget from '@/components/TelegramWidget';

interface Comment {
  id: number;
  author: string;
  avatar: string;
  text: string;
  likes: number;
  time: string;
  liked: boolean;
}

interface Post {
  id: number;
  title: string;
  content: string;
  image: string;
  date: string;
  views: number;
  likes: number;
  comments: Comment[];
  showComments: boolean;
}

const Index = () => {
  const [email, setEmail] = useState('');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: '🚀 Запустили новый проект!',
      content: 'Рады представить вам нашу новую инициативу. Это будет что-то невероятное! Следите за обновлениями и делитесь своими мыслями в комментариях.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      date: '2 часа назад',
      views: 1234,
      likes: 89,
      showComments: false,
      comments: [
        {
          id: 1,
          author: 'Анна Смирнова',
          avatar: 'AS',
          text: 'Супер! Ждем с нетерпением 🔥',
          likes: 12,
          time: '1 час назад',
          liked: false
        },
        {
          id: 2,
          author: 'Дмитрий К.',
          avatar: 'ДК',
          text: 'Очень интересно, расскажите подробнее!',
          likes: 8,
          time: '45 мин назад',
          liked: false
        }
      ]
    },
    {
      id: 2,
      title: '💡 Полезный совет дня',
      content: 'Делимся с вами лучшими практиками и инсайтами из нашего опыта. Применяйте и достигайте новых высот!',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
      date: '5 часов назад',
      views: 2156,
      likes: 156,
      showComments: false,
      comments: [
        {
          id: 1,
          author: 'Мария Петрова',
          avatar: 'МП',
          text: 'Отличный контент, спасибо!',
          likes: 5,
          time: '3 часа назад',
          liked: false
        }
      ]
    },
    {
      id: 3,
      title: '🎯 Достигли новой цели',
      content: 'Благодаря вашей поддержке мы смогли достичь невероятных результатов. Вы — лучшее сообщество!',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
      date: 'вчера',
      views: 3421,
      likes: 234,
      showComments: false,
      comments: []
    }
  ]);
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Спасибо за подписку! Письмо отправлено на ${email}`);
      setEmail('');
    }
  };

  const toggleComments = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, showComments: !post.showComments } : post
    ));
  };

  const addComment = (postId: number) => {
    const commentText = newComment[postId]?.trim();
    if (!commentText) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              author: 'Вы',
              avatar: 'ВЫ',
              text: commentText,
              likes: 0,
              time: 'только что',
              liked: false
            }
          ]
        };
      }
      return post;
    }));

    setNewComment({ ...newComment, [postId]: '' });
  };

  const toggleCommentLike = (postId: number, commentId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: post.comments.map(comment => 
            comment.id === commentId 
              ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
              : comment
          )
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div 
        className="relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-[length:200%_200%]"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-white animate-fade-in">
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white border-white/30 text-lg px-6 py-2">
              <Icon name="Zap" size={20} className="mr-2" />
              Самый яркий канал
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Добро пожаловать<br />в наш мир 🚀
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Здесь мы делимся идеями, инсайтами и вдохновением. Присоединяйся к сообществу активных людей!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-full shadow-2xl hover:scale-105 transition-all"
                onClick={() => window.open('https://t.me/scriptsforcheats', '_blank')}
              >
                <Icon name="Send" size={20} className="mr-2" />
                Подписаться в Telegram
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20 text-lg px-8 py-6 rounded-full"
                onClick={() => document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Смотреть посты
              </Button>
            </div>
            <div className="mt-12 flex justify-center gap-8 text-white/80">
              <div className="animate-scale-in">
                <div className="text-3xl font-bold">12K+</div>
                <div className="text-sm">Подписчиков</div>
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm">Постов</div>
              </div>
              <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm">Активности</div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(250 245 255)"/>
          </svg>
        </div>
      </div>

      <div id="posts" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Последние посты
            </h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Icon name="Flame" size={18} className="mr-2" />
              Актуальное
            </Badge>
          </div>

          <Card className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <Icon name="Send" size={24} className="text-primary" />
              <h3 className="text-2xl font-bold">Прямой эфир из Telegram</h3>
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <TelegramWidget channelUsername="scriptsforcheats" width="100%" />
            </div>
          </Card>

          <div className="space-y-8">
            {posts.map((post, index) => (
              <Card 
                key={post.id} 
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 animate-fade-in border-2 hover:border-primary/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{post.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-lg text-muted-foreground mb-4">{post.content}</p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Eye" size={16} />
                      {post.views.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Heart" size={16} className="text-red-500 fill-red-500" />
                      {post.likes}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => toggleComments(post.id)}
                    >
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      {post.showComments ? 'Скрыть' : 'Показать'} комментарии ({post.comments.length})
                    </Button>
                    <Button variant="outline" size="icon">
                      <Icon name="Share2" size={18} />
                    </Button>
                  </div>

                  {post.showComments && (
                    <div className="mt-6 space-y-4 animate-fade-in">
                      <div className="space-y-4">
                        {post.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                                {comment.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold">{comment.author}</span>
                                <span className="text-xs text-muted-foreground">{comment.time}</span>
                              </div>
                              <p className="text-sm mb-2">{comment.text}</p>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 px-2"
                                onClick={() => toggleCommentLike(post.id, comment.id)}
                              >
                                <Icon 
                                  name="Heart" 
                                  size={14} 
                                  className={comment.liked ? "text-red-500 fill-red-500" : ""}
                                />
                                <span className="ml-1">{comment.likes}</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Textarea 
                          placeholder="Написать комментарий..."
                          value={newComment[post.id] || ''}
                          onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                          className="resize-none"
                          rows={2}
                        />
                        <Button 
                          onClick={() => addComment(post.id)}
                          disabled={!newComment[post.id]?.trim()}
                          className="self-end"
                        >
                          <Icon name="Send" size={18} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary via-secondary to-accent py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-8 md:p-12 shadow-2xl animate-scale-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Не пропускай новости! 📬
              </h2>
              <p className="text-lg text-muted-foreground">
                Подпишись на рассылку и получай самые интересные посты прямо на почту
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <Input 
                type="email"
                placeholder="Введи свой email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-lg"
              />
              <Button 
                type="submit" 
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white h-12 px-8"
              >
                <Icon name="Mail" size={20} className="mr-2" />
                Подписаться
              </Button>
            </form>
          </Card>
        </div>
      </div>

      <footer className="bg-white border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">© 2024 Наш Канал. Все права защищены.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Send" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;