import { supabase } from "../supabase-client";

export async function fetchPropertyDetails({ type, id }) {
  const isRent = type?.toLowerCase() === "rent";
  const table = isRent ? "Rent" : "Sell";
  const imagesTable = isRent ? "rent_images" : "sell_images";

  const { data, error } = await supabase
    .from(table)
    .select(
      `
      *,
      ${imagesTable} (
        id,
        image_path,
        is_cover
      )
      `
    )
    .eq("id", Number(id))
    .single();

  if (error) throw error;
  return data;
}
