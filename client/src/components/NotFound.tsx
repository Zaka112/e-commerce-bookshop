import { Paper, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Paper><Typography>You are not authoriezed for this. Please <Link to="/users/signin">SignIn</Link></Typography></Paper>
  )
}
