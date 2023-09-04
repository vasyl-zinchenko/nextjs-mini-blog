"useClient";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, CssBaseline } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

export const dynamic = "force-dynamic";

export default function NewComment({ postId }: any) {
  const fetcher = async (...args: Parameters<typeof fetch>) => {
    const response = await fetch(...args);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const {
    data: test,
    mutate,
  } = useSWR(`/api/comments/` + postId, fetcher);

  const addComment = async (formData: FormData) => {
    const supabase = createClientComponentClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const title = formData.get("title");
    const content = formData.get("content");
    const mail = user?.email;

    try {
      await fetch("/api/comments/", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          mail,
          postId,
        }),
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const [comments, setComments] = useState<any[]>([]);

  const supabase = createClientComponentClient();

  const getComments = async () => {
    const { data: comments } = await supabase
      .from("comments")
      .select()
      .eq("postId", postId);
    if (comments) {
      setComments(comments);
    }
    console.log(comments);
    mutate();
  };

  useEffect(() => {
    getComments();
    mutate();
  }, [supabase, setComments]);

  return (
    <Container component='main' maxWidth='xs' sx={{ bgcolor: "white" }}>
      <CssBaseline />
      <Box component='form' action={addComment} noValidate sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          fullWidth
          id='title'
          label='Title'
          name='title'
          autoFocus
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='content'
          label='Content'
          type='content'
          id='content'
          multiline
          rows={4}
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 2 }}
          onClick={getComments}
        >
          Add comment
        </Button>
      </Box>
    </Container>
  );
}
