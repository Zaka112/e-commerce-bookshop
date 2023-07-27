import React from 'react'

import { Paper } from '@mui/material'

import landing from "../../assets/landing.jpg"


export default function Home() {
  return (
    //TODO: bring some nice layout in
    <Paper sx={{ minHeight: 600, background:`url(${landing})`, backgroundRepeat:"no-repeat"}}></Paper>
  )
}
