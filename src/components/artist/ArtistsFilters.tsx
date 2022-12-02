import { Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import classNames from "classnames";
import { IGenre } from "../../redux/features/apiDeezerSlice";

interface IPropsArtistsFilters {
    genres: IGenre[];
    onChange: (id: number) => void;
    activeGenreId: number;
}

const StyledArtistsFilters = styled('div')`
    display: flex;
    flex-wrap: wrap;

    .genre {
        margin: 10px;

        &.active {
            background: red;
        }
    }
`;

const ArtistsFilters = ({genres, onChange, activeGenreId}: IPropsArtistsFilters) => {

    const handleClick = (genreId: number) => {
        onChange(genreId);
    }

  return (
    <StyledArtistsFilters className="ArtistsFilters">
        {genres.map((genre) => <Chip className={classNames('genre', {active: activeGenreId === genre.id})} key={genre.id} label={genre.name} onClick={() => handleClick(genre.id)} />)}
    </StyledArtistsFilters>
  )
}

export default ArtistsFilters;