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
    overflow: auto;
    padding-bottom: 10px;


      ::-webkit-scrollbar {
      height: 4px;
      }
      
      /* Track */
      ::-webkit-scrollbar-track {
        background: none;
      }
       
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background: ${props => props.theme.palette.grey[800]};        
      }
      
      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: ${props => props.theme.palette.grey[700]}; 
      }
    

    .genre {
        margin: 10px;

        &.active {
            background: ${props => props.theme.palette.secondary.main};
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