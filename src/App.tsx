import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SidebarMenu from './components/SidebarMenu';
import ArtistPage from './pages/ArtistPage';
import ExplorePage from './pages/ExplorePage';
import Homepage from './pages/Homepage';
import { createTheme, ThemeProvider, styled, useTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import darkTheme from './theme/dark';
import AlbumPage from './pages/AlbumPage';
import PlaylistPage from './pages/PlaylistPage';

const StyledApp = styled('div')`
  display: flex;
  min-height: 100vh;
  .page-content {
    flex-grow: 1;
    padding-top: 60px;
  }
`;

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <StyledApp className='App'>
        {!isMobile && <div className='left-sidebar'><SidebarMenu /></div>}
        <div className='page-content'>
          <Navigation />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/artists/:id' element={<ArtistPage />} />
            <Route path='/explore' element={<ExplorePage />} />
            <Route path='/album/:id' element={<AlbumPage />} />
            <Route path='/playlist/:id' element={<PlaylistPage />} />
          </Routes>
        </div>
      </StyledApp>
    </ThemeProvider>
  )
}

export default App;
