import { NextResponse } from "next/server";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const LOS_ANGELES_SANTA_MONICA = "34.0195,-118.4912";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get("input")?.trim();

  if (!GOOGLE_MAPS_API_KEY || !input || input.length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  const params = new URLSearchParams({
    input,
    key: GOOGLE_MAPS_API_KEY,
    components: "country:us",
    types: "address",
    location: LOS_ANGELES_SANTA_MONICA,
    radius: "35000",
  });

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params.toString()}`,
      { next: { revalidate: 0 } }
    );
    const result = (await response.json()) as {
      predictions?: Array<{
        description?: string;
        place_id?: string;
      }>;
      status?: string;
      error_message?: string;
    };

    if (!response.ok || result.status === "REQUEST_DENIED") {
      return NextResponse.json(
        {
          suggestions: [],
          error:
            result.error_message ||
            "Google Places autocomplete is unavailable.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      suggestions:
        result.predictions?.map((prediction) => ({
          description: prediction.description ?? "",
          placeId: prediction.place_id ?? "",
        })) ?? [],
    });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
