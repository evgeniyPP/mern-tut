import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LinksPage from './pages/LinksPage'
import CreatePage from './pages/CreatePage'
import DetailPage from './pages/DetailPage'
import AuthPage from './pages/AuthPage'

const useRoutes = isAuthed => {
  return isAuthed ? (
    <Switch>
      <Route path="/links" exact>
        <LinksPage />
      </Route>
      <Route path="/create" exact>
        <CreatePage />
      </Route>
      <Route path="/detail/:id">
        <DetailPage />
      </Route>
      <Route path="/" exact>
        <Redirect to="/create" />
      </Route>
    </Switch>
  ) : (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  )
}

export default useRoutes
