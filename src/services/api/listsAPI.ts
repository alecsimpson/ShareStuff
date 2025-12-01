import {getSupabase} from "../supabaseClient.ts";
import {ListT} from "../../models/ListT.ts";

function getSupabase() {
	const supabase = getSupabase();
	if (!supabase) throw new Error('Supabase not initialized');
	return supabase;
}


export const listsAPI = {

	async create(list: Omit<ListT, 'id' | 'created_at'>): Promise<ListT> {
		const supabase = getSupabase()

		const { data, error } = await supabase
			.from("lists")
			.insert(list)
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	async getListById(id: string): Promise<ListT> {
		const supabase = getSupabase()

		const { data, error } = await supabase
			.from('lists')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw error;
		return data;
	},

	async updateList(list: ListT): Promise<ListT> {
		const supabase = getSupabase()

		const { data, error } = await supabase
			.from('lists')
			.update({ ...list, items: list.items, updated_at: new Date().toISOString()})
			.eq('id', list.id)
			.select()
			.single();

		if (error) throw error;
		return data
	},

	async getHomePageList(): Promise<ListT> {
		const supabase = getSupabase()

		const { data, error } = await supabase
			.from('lists')
			.select('*')
			.eq('key', 'shared')
			.single();

		if (error) throw error;
		return data
	}


}