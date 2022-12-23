import { Box, Button, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IArtist } from "../../redux/features/apiDeezerSlice";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useAddArtistToFavMutation } from "../../redux/features/apiSlice";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface IPropsSimilarArtistsTab {
  artists: IArtist[];
  onTabChange: (tab: string) => void;
}

const StyledSimilarArtistsTab = styled(Box)`
  margin-top: 30px;
  flex-shrink: 0;
  flex-grow: 1;

  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-top: 30px;
  }

  ${(props) => props.theme.breakpoints.up("md")} {
    margin-left: 0;
    margin-top: 30px;
  }

  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-top: 30px;
  }

  .similar-artists-title {
    margin-bottom: 20px;
  }

  .artist-info {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    .name-and-fans {
      flex-grow: 1;
      margin-left: 20px;
    }

    .artist-img {
      width: 68px;
      height: 68px;
      border-radius: 100%;
    }
  }

  .fav-btn {
    color: ${(props) => props.theme.palette.primary.main};
  }
`;

const SimilarArtistsTab = ({ artists, onTabChange }: IPropsSimilarArtistsTab) => {
  const [addArtistToFav, addArtistToFavResponse] = useAddArtistToFavMutation();
  const authState = useAppSelector((state) => state.auth);

  const handleAddArtistToFav = (artist: IArtist) => {
    const artistToSave = {
      deezer_id: artist.id,
      name: artist.name,
      picture_big: artist.picture_big,
      nb_fan: artist.nb_fan,
      picture: artist.picture,
    };

    addArtistToFav({ artist: artistToSave });
  };

  const isArtistFavorite = (artist: IArtist) => {
    return authState.favorites.artists.includes(artist.id);
  }

  return (
    <StyledSimilarArtistsTab className="SimilarArtistsTab">
      <Typography className="similar-artists-title" variant="h2">
        Fans also like
      </Typography>
      {artists.map((artist, idx) => (
        <Box key={artist.id} className="artist-info">
          <img className="artist-img" src={artist.picture} alt="" />
          <Box className="name-and-fans">
            <Link to={`/artists/${artist.id}`}>
              <Typography variant="body1">{artist.name}</Typography>
            </Link>
            <Typography variant="h6" color="textSecondary">
              {new Intl.NumberFormat().format(artist.nb_fan)} listeners
            </Typography>
          </Box>
          <Box className="icon">
            <IconButton className="fav-btn" onClick={() => handleAddArtistToFav(artist)}>
              {!isArtistFavorite(artist) ? <FavoriteBorderOutlinedIcon /> : <FavoriteIcon />}
            </IconButton>
          </Box>
        </Box>
      ))}

      <Button variant="outlined" onClick={() => onTabChange("related")}>
        See more artists
      </Button>
    </StyledSimilarArtistsTab>
  );
};

export default SimilarArtistsTab;
