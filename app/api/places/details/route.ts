import { NextResponse } from "next/server";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const placeId = searchParams.get("placeId")?.trim();

  if (!GOOGLE_MAPS_API_KEY || !placeId) {
    return NextResponse.json({ place: null });
  }

  const params = new URLSearchParams({
    place_id: placeId,
    key: GOOGLE_MAPS_API_KEY,
    fields: "formatted_address,geometry,place_id",
  });

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?${params.toString()}`,
      { next: { revalidate: 0 } }
    );
    const result = (await response.json()) as {
      result?: {
        formatted_address?: string;
        place_id?: string;
        geometry?: {
          location?: {
            lat?: number;
            lng?: number;
          };
        };
      };
      status?: string;
      error_message?: string;
    };

    if (!response.ok || result.status === "REQUEST_DENIED" || !result.result) {
      return NextResponse.json(
        {
          place: null,
          error:
            result.error_message || "Google Places details are unavailable.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      place: {
        formattedAddress: result.result.formatted_address ?? "",
        placeId: result.result.place_id ?? placeId,
        latitude: result.result.geometry?.location?.lat ?? null,
        longitude: result.result.geometry?.location?.lng ?? null,
      },
    });
  } catch {
    return NextResponse.json({ place: null });
  }
}
