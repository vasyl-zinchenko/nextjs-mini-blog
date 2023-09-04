import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container, CssBaseline } from "@mui/material";

export const dynamic = "force-dynamic";

export default async function NewPost() {
  const addPost = async (formData: FormData) => {
    "use server";

    const supabase = createServerActionClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const title = formData.get("title");
    const content = formData.get("content");
    const mail = user?.email;

    await supabase.from("posts").insert({ title, content, mail });
    revalidatePath("/");
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box component='form' action={addPost} noValidate sx={{ mt: 1 }}>
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
        >
          Add post
        </Button>
      </Box>
    </Container>
  );
}
