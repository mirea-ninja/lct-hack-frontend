import Header from "../components/main/Header"
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <Header />
      <Link href="/login">Login</Link>
      <br />
      <Link href="/import/pool">Pool</Link>
      <br />
      <Link href="/import/etalons">Etalons</Link>
      <br />
      <Link href="/calculate_etalons/map">Calculate etalons on map</Link>
      <br />
      <Link href="/calculate_etalons/table">Calculate etalons in table</Link>
      <br />
      <Link href="/calculate_pool">Calculate pool</Link>
      <br />
      <Link href="/archive">Archive</Link>
      <br />
      <Link href="/user">User</Link>
      <br />
    </div>
  )
}
