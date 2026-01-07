// src/queries/featured.js
import { supabase } from "../supabase-client";

export async function fetchFeaturedProperties(activeFilter) {
  const imagesTable = activeFilter === "Rent" ? "rent_images" : "sell_images";
  const folderPrefix = activeFilter === "Rent" ? "rent" : "sell";
  const BUCKET = "rent-images";

  const { data, error } = await supabase.from(activeFilter).select(`
    *,
    ${imagesTable} (
      id,
      image_path,
      is_cover
    )
  `);

  if (error) throw new Error("Failed to load featured properties");

  const formatted = (data || []).map((property) => {
    const imgs = property?.[imagesTable] || [];

    const images = imgs.map((img) => {
      const path =
        img.image_path?.startsWith("rent/") ||
        img.image_path?.startsWith("sell/")
          ? img.image_path
          : `${folderPrefix}/${img.image_path}`;

      const { data: urlData } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(path);

      return {
        ...img,
        image_path: path,
        publicUrl: urlData?.publicUrl || "",
      };
    });

    return { ...property, images };
  });

  return formatted;
}
