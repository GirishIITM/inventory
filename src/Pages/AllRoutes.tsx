import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from './Home'
import NavBar from '../components/NavBar'

const WrapNavBar = (child: React.ReactNode) => (<><NavBar />{child}</>)

export default function AllRoutes() {
  return (
    <Routes>
      <Route element={WrapNavBar(<Home />)} path="/" />
      <Route element={<div>404 Not Found</div>} path='*' />
    </Routes>
  )
}
