import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

export default function StudentLayout() {
  return <>
    <Navbar/>
    <Outlet></Outlet>
  </>
} 