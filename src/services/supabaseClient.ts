import {createClient, SupabaseClient} from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PUBLIC_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables');
}

let supabaseClient: SupabaseClient | null = null;

export function getSupabase() {
	if (!supabaseClient) {
		if (!supabaseUrl || !supabaseAnonKey) {
			console.error('Missing Supabase environment variables. Set VITE_SUPABASE_PUBLIC_PROJECT_URL and VITE_SUPABASE_ANON_KEY at build time.');
			return null;
		}
		supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
	}

	return supabaseClient;
}