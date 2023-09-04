"use client";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewComment from "../NewComment";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useSWR from "swr";

const Post = ({ post }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState("");

  const fetcher = async (...args: [string, RequestInit]) => {
    const [url, options] = args;
    const res = await fetch(url, options);
    return res.json();
  };

  const { data: comments, mutate } = useSWR(`/api/comments/` + post.id, (url) =>
    fetcher(url, { method: "GET" })
  );

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClientComponentClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserType(user?.user_metadata.type);
    };
    getUser();
  }, []);

  const supabase = createClientComponentClient();

  return (
    <Card sx={{ minWidth: 275, mb: 5, mt: 5, bgcolor: "#eeeeee" }}>
      <CardContent>
        <Typography variant='h5' component='div'>
          {post.title}
        </Typography>
        <Typography variant='caption' sx={{ mb: 1 }} color='text.secondary'>
          Author: <Link href={`mailto:${post.mail}`}>{post.mail}</Link>
        </Typography>
        <Typography variant='body2'>{post.content}</Typography>
      </CardContent>
      <CardActions></CardActions>
      {comments?.map((comment: any) => (
        <Card sx={{ minWidth: 275, m: 1.5, bgcolor: "white" }} key={comment.id}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              commentator: {comment.mail}
            </Typography>
            <Typography variant='h5' component='div'>
              {comment.title}
            </Typography>

            <Typography variant='body2'>{comment.content}</Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      ))}

      {userType === "commentator" && (
        <>
          {isOpen && <NewComment postId={post.id} />}
          <Button
            type='submit'
            variant={!isOpen ? "contained" : "outlined"}
            sx={{ display: "flex", mx: "auto", my: 2 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {!isOpen ? "Add new comment" : "Close"}
          </Button>
        </>
      )}
    </Card>
  );
};

export default Post;
