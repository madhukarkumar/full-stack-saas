export type PostRow = {
  post_id: number;
  postName: string;
  postDetails: string;
  CreatedAt: string;
  UpdatedAt: string;
  userEmail: string;
  postURL: string;
  postVotes: number;
  postImageURL: string;
};

export type Post = PostRow;