import { ISong } from "../../redux/features/apiDeezerSlice";
import Track from "./Track";

interface IPropsTrackList {
    tracks: ISong[];
    cover: string;
}

const TrackList = ({tracks, cover}: IPropsTrackList) => {
  return (
    <div>
        {tracks.map((track, idx) => <Track trackNr={idx + 1} cover={cover} key={track.id} track={track}/>)}
    </div>
  )
}

export default TrackList;