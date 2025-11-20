import { createClient as create } from "@supabase/supabase-js";

export function createClient() {
  return create(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
  );
}
