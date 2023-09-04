import NewPost from "@/components/NewPost";
import {
  Typography,
  Container,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Posts() {
  const supabase = createServerActionClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: posts } = await supabase.from("posts").select();

  return (
    <>
      <Container component='main' maxWidth='md' sx={{ mt: 5 }}>
        {posts?.map((post) => (
          <Card sx={{ minWidth: 275, mb: 2 }} key={post.id}>
            <CardContent>
              <Typography variant='h5' component='div'>
                {post.title}
              </Typography>
              <Typography
                variant='caption'
                sx={{ mb: 1 }}
                color='text.secondary'
              >
                Author: <Link href={`mailto:${post.mail}`}>{post.mail}</Link>
              </Typography>
              <Typography variant='body2'>{post.content}</Typography>
            </CardContent>
            <CardActions>
              <Link href={`/posts/${post.user_id}`}>
                <Button size='small'>View all posts by this author</Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Container>
      {user?.user_metadata.type === "author" && <NewPost />}
    </>
  );
}
