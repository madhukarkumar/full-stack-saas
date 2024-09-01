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

export interface Post {
  post_id: string;
  postName: string;
  postDetails: string;
  postURL: string;
  postVotes: number; // Add this line
}
