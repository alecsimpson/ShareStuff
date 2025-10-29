import {ItemT} from "../../models/ItemT";
import {getSupabase} from "../supabaseClient.ts";


export const itemsAPI = {
	async getAll() {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const {data, error} = await supabase
			.from('items')
			.select('*')
			.order('created_at', {ascending: false});

		if (error) throw error;
		console.debug(data);
		return data as ItemT[];
	},

	async getById(id: number) {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('items')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw error;
		return data as ItemT;
	},

	async create(item: Omit<ItemT, 'id' | 'created_at'>) {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('Item')
			.insert(item)
			.select()
			.single();

		if (error) throw error;
		return data as ItemT;
	},

	// Update item
	async update(id: string, updates: Partial<ItemT>) {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('Item')
			.update(updates)
			.eq('id', id)
			.select()
			.single();

		if (error) throw error;
		return data as ItemT;
	},

	async delete(id: string) {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { error } = await supabase
			.from('Item')
			.delete()
			.eq('id', id);

		if (error) throw error;
	},

	async getUrgent() {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('Item')
			.select('*')
			.eq('urgent', true)
			.order('created_at', { ascending: false });

		if (error) throw error;
		return data as ItemT[];
	},

	async getUnbought() {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('Item')
			.select('*')
			.eq('bought', false)
			.order('created_at', { ascending: false });

		if (error) throw error;
		return data as ItemT[];
	}
};