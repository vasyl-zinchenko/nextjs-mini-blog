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
import { InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export default function Login() {
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
          Login
        </Typography>
        <Box
          component='form'
          action='/auth/sign-in'
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

          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            formAction='/auth/sign-in'
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/signup'>{"Don't have an account? Signup"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Messages />
    </Container>
  );
}

// <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
//   <Link
//     href="/"
//     className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
//   >
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
//     >
//       <polyline points="15 18 9 12 15 6" />
//     </svg>{' '}
//     Back
//   </Link>

//   <form
//     className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
//     action="/auth/sign-in"
//     method="post"
//   >
//     <label className="text-md" htmlFor="email">
//       Email
//     </label>
//     <input
//       className="rounded-md px-4 py-2 bg-inherit border mb-6"
//       name="email"
//       placeholder="you@example.com"
//       required
//     />
//     <label className="text-md" htmlFor="password">
//       Password
//     </label>
//     <input
//       className="rounded-md px-4 py-2 bg-inherit border mb-6"
//       type="password"
//       name="password"
//       placeholder="••••••••"
//       required
//     />
//     <button className="bg-green-700 rounded px-4 py-2 text-white mb-2">
//       Sign In
//     </button>
//     <button
//       formAction="/auth/sign-up"
//       className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
//     >
//       Sign Up
//     </button>
//     <Messages />
//   </form>
// </div>
