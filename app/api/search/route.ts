import { NextResponse } from "next/server"
import { searchCoins } from "@/lib/coingecko/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q") ?? ""
  if (!q.trim()) {
    return NextResponse.json({ coins: [] })
  }
  const coins = await searchCoins(q)
  return NextResponse.json(
    { coins },
    {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    },
  )
}
