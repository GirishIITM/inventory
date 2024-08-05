import { Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from './Home'
import NavBar from '../components/NavBar'
import Products from './Products'
import Reports from './Reports'
import Sales from './Sales'
import Settnigs from './Settnigs'
import CreateProduct from '../components/CreateProduct'

const WrapNavBar = (child: React.ReactNode) => (<><NavBar />{child}</>)

export default function AllRoutes() {
  return (
    <Routes>
      <Route element={WrapNavBar(<Home />)} path="/" />
      <Route element={<div>404 Not Found</div>} path='*' />
      <Route element={WrapNavBar(<Products />)} path='/products' />
      <Route element={WrapNavBar(<Reports />)} path='/reports' />
      <Route element={WrapNavBar(<Sales />)} path='/sales' />
      <Route element={WrapNavBar(<Settnigs />)} path='/settings' />
      <Route element={WrapNavBar(<CreateProduct />)} path='/product/create' />
    </Routes>
  )
}
