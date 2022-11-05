import Header from "../components/main/Header"

export default function Home() {
  return (
    <div>
      <Header />
      <a href="/login">Login</a><br />
      <a href="/import/pool">Pool</a><br />
      <a href="/import/etalons">Etalons</a><br />
      <a href="/calculate_etalons/map">Calculate etalons on map</a><br />
      <a href="/calculate_etalons/table">Calculate etalons in table</a><br />
      <a href="/calculate_pool">Calculate pool</a><br />
      <a href="/archive">Archive</a><br />
      <a href="/user">User</a><br />
    </div>
  )
}
