import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SidebarMenu from './components/SidebarMenu';
import ArtistPage from './pages/ArtistPage';
import ExplorePage from './pages/ExplorePage';
import Homepage from './pages/Homepage';
import { ThemeProvider, styled, useTheme } from '@mui/material/styles';
import { CssBaseline, useMediaQuery } from '@mui/material';
import darkTheme from './theme/dark';
import AlbumPage from './pages/AlbumPage';
import PlaylistPage from './pages/PlaylistPage';
import MusicPlayer from './components/music-player/MusicPlayer';
import LoadersPage from './pages/LoadersPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';

const StyledApp = styled('div')`

  min-height: 100vh;
  display: block;

  .page-content {
    display: block;
    max-width: 100%;
    padding-top: 60px;
    padding-bottom: 150px;
  }

  ${props => props.theme.breakpoints.up('md')} {
    display: flex;
   
    .page-content {
      flex-grow: 1;
      max-width: calc(100vw - 300px);
    }
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
            <Route path='/loaders' element={<LoadersPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/favorites' element={<FavoritesPage />} />
            <Route path='/profile' element={<ProfilePage />} />
          </Routes>
        </div>
        <MusicPlayer />
      </StyledApp>
    </ThemeProvider>
  )
}

export default App;
