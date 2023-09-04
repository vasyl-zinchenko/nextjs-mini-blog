"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Messages from "../login/messages";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";

export default function SignUp() {
  const [type, setType] = useState("author");

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>

        <Box
          component='form'
          action='/auth/sign-up'
          method='post'
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />

          <FormLabel sx={{ display: "flex", mt: 2 }} id='type'>
            Type profile
          </FormLabel>
          <RadioGroup
            aria-labelledby='type'
            defaultValue='author'
            value={type}
            name='type'
            id='type'
            onChange={(event) => setType(event.target.value)}
          >
            <FormControlLabel
              value='author'
              control={<Radio />}
              label='Author'
            />
            <FormControlLabel
              value='commentator'
              control={<Radio />}
              label='Commentator'
            />
          </RadioGroup>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            formAction='/auth/sign-up'
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/login'>{"Already have an account? Login"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Messages />
    </Container>
  );
}

