import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SidebarMenu from './components/SidebarMenu';
import ArtistPage from './pages/ArtistPage';
import ChartsPage from './pages/ChartsPage';
import Homepage from './pages/Homepage';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import darkTheme from './theme/dark';

const StyledApp = styled('div')`
  display: flex;
  min-height: 100vh;
  .page-content {
    flex-grow: 1;
  }
`;

function App() {


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <StyledApp className='App'>
        <div className='left-sidebar'>
          <SidebarMenu />
        </div>
        <div className='page-content'>
          <Navigation />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/artists/:id' element={<ArtistPage />} />
            <Route path='/charts' element={<ChartsPage />} />
          </Routes>
        </div>
      </StyledApp>
    </ThemeProvider>
  )
}

export default App;
