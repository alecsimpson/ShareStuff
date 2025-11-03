import {ItemT} from "../../models/ItemT";
import {getSupabase} from "../supabaseClient.ts";


export const itemsAPI = {
	async getAll(): Promise<ItemT[]> {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const {data, error} = await supabase
			.from('items')
			.select('*')
			.order('created_at', {ascending: false});

		if (error) throw error;
		return data as ItemT[];
	},

	async getById(id: number): Promise<ItemT> {
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

	async create(item: Omit<ItemT, 'id' | 'created_at'>): Promise<ItemT> {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('items')
			.insert(item)
			.select()
			.single();

		if (error) throw error;
		return data as ItemT;
	},

	// Update item
	async update(id: string, updates: Partial<ItemT>): Promise<ItemT> {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('items')
			.update(updates)
			.eq('id', id)
			.select()
			.single();

		if (error) throw error;
		return data as ItemT;
	},

	async delete(id: string): Promise<void> {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { error } = await supabase
			.from('items')
			.delete()
			.eq('id', id);

		if (error) throw error;
	},

	async getUrgent(): Promise<ItemT[]> {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('items')
			.select('*')
			.eq('urgent', true)
			.order('created_at', { ascending: false });

		if (error) throw error;
		return data as ItemT[];
	},

	async getUnbought(): Promise<ItemT[]> {
		const supabase = getSupabase();
		if (!supabase) throw new Error('Supabase not initialized');

		const { data, error } = await supabase
			.from('items')
			.select('*')
			.eq('bought', false)
			.order('created_at', { ascending: false });

		if (error) throw error;
		return data as ItemT[];
	}
};