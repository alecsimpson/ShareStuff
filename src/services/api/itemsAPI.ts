import {ItemType} from "../../models/ItemType";
import {getSupabase} from "../supabaseClient.ts";


export const itemsAPI = {
	async getAll() {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const {data, error} = await supabase
			.from('Item')
			.select('*')
			.order('created_at', {ascending: false});

		if (error) throw error;
		console.debug(data);
		return data as ItemType[];
	},

	async getById(id: number) {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('Item')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw error;
		return data as ItemType;
	},

	async create(item: Omit<ItemType, 'id' | 'created_at'>) {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('Item')
			.insert(item)
			.select()
			.single();

		if (error) throw error;
		return data as ItemType;
	},

	// Update item
	async update(id: number, updates: Partial<ItemType>) {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('Item')
			.update(updates)
			.eq('id', id)
			.select()
			.single();

		if (error) throw error;
		return data as ItemType;
	},

	async delete(id: number) {
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
		return data as ItemType[];
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
		return data as ItemType[];
	}
};