import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Container,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Link from "next/link";
import NewComment from "@/components/NewComment";
import NewPost from "@/components/NewPost";
import Post from "@/components/post/Post";

const BlogPost = async ({ params }: any) => {
  const supabase = createServerActionClient({ cookies });

  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("user_id", params.user_id);

  if (error) {
    console.error(error);
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <Container component='main' maxWidth='md' >
        {data?.map((post) => (
          <Post post={post} />
        ))}
      </Container>
    </div>
  );
};

export default BlogPost;
