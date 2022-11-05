import Header from "../components/main/Header"

export default function Home() {
  return (
    <div>
      <Header />
      <a href="/login">Login</a>
      <a href="/import/pool">Pool</a>
      <a href="/import/etalons">Etalons</a>
      <a href="/calculate_etalons/map">Calculate etalons on map</a>
      <a href="/calculate_etalons/table">Calculate etalons in table</a>
      <a href="/calculate_pool">Calculate pool</a>
      <a href="/archive">Archive</a>
      <a href="/user">User</a>
    </div>
  )
}
