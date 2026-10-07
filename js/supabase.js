const SUPABASE_URL = "https://lxbsepyehxmtpxtjgaah.supabase.co";
const SUPABASE_KEY = "sb_publishable_j311fiyuJ8XKoIkG5yGRIA_m7ccvElY";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);
console.log("Supabase connected:", supabaseClient);