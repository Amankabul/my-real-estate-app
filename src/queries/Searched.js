import { supabase } from "../supabase-client";

export async function fetchSearchedProperties({ type, address, rooms }) {
  const table = type === "Sell" ? "Sell" : "Rent";

  const imagesTable = table === "Rent" ? "rent_images" : "sell_images";

  const ROOMS_COL = "bedroom";

  const cleanAddress = (address ?? "").trim();
  const hasAddress = cleanAddress.length > 0;
  const hasRooms =
    rooms != null && rooms !== "" && !Number.isNaN(Number(rooms));

  const baseSelect = () =>
    supabase.from(table).select(
      `*,
       ${imagesTable} (
         id,
         image_path,
         is_cover
       )`
    );

  if (hasAddress && hasRooms) {
    const { data, error } = await baseSelect()
      .ilike("address", `%${cleanAddress}%`)
      .eq(ROOMS_COL, Number(rooms));

    if (error) throw error;
    if (data?.length) return data;

    // 2) fallback to rooms only if address gave 0 results
    const { data: data2, error: error2 } = await baseSelect().eq(
      ROOMS_COL,
      Number(rooms)
    );
    if (error2) throw error2;
    return data2 ?? [];
  }

  // rooms only
  if (hasRooms) {
    const { data, error } = await baseSelect().eq(ROOMS_COL, Number(rooms));
    if (error) throw error;
    return data ?? [];
  }

  // address only
  if (hasAddress) {
    const { data, error } = await baseSelect().ilike(
      "address",
      `%${cleanAddress}%`
    );
    if (error) throw error;
    return data ?? [];
  }

  return [];
}
