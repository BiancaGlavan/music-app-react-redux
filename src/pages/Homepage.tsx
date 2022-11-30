import { useGetChartsQuery } from "../redux/features/apiDeezerSlice";


const Homepage = () => {
  const {data: charts} = useGetChartsQuery();
  console.log('charts: ', charts);
  return (
    <div>

    </div>
  )
}

export default Homepage;