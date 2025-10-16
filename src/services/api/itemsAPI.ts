
import { createClient } from '@supabase/supabase-js';
import { ItemType } from "../../models/ItemType";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PUBLIC_PROJECT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const itemsAPI = {
	async getAll() {
		const { data, error } = await supabase
			.from('Item')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) throw error;
		console.debug(data);
		return data as ItemType[];
	},

	async getById(id: number) {
		const { data, error } = await supabase
			.from('Item')
			.select('*')
			.eq('id', id)
			.single();

		if (error) throw error;
		return data as ItemType;
	},

	async create(item: Omit<ItemType, 'id' | 'created_at'>) {
		console.debug('item',item);
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
		const { error } = await supabase
			.from('Item')
			.delete()
			.eq('id', id);

		if (error) throw error;
	},

	async getUrgent() {
		const { data, error } = await supabase
			.from('Item')
			.select('*')
			.eq('urgent', true)
			.order('created_at', { ascending: false });

		if (error) throw error;
		return data as ItemType[];
	},

	async getUnbought() {
		const { data, error } = await supabase
			.from('Item')
			.select('*')
			.eq('bought', false)
			.order('created_at', { ascending: false });

		if (error) throw error;
		return data as ItemType[];
	}
};