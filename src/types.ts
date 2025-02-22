export interface IPost {
  title: string;
  body: string;
}

export interface IPostContext {
  posts: IPost[];
  onAddPost: (post: IPost) => void;
  onClearPosts: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}