import {getSupabase} from '../supabaseClient';
import {ChoreT} from '../../models/Chores/ChoreT.ts';
import {Person} from '../../models/Chores/Person';
import {ChoreCompletion} from '../../models/Chores/ChoreCompletion';

function requireSupabase() {
	const supabase = getSupabase();
	if (!supabase) throw new Error('Supabase not initialized');
	return supabase;
}

export const choresAPI = {
	// Chores
	async getChores(): Promise<ChoreT[]> {
		const supabase = requireSupabase();
		const { data, error } = await supabase
			.from('chores')
			.select('*')
			.order('created_at', { ascending: false });

		if (error) throw error;
		return data || [];
	},

	async createChore(chore: Omit<ChoreT, 'id' | 'created_at' | 'updated_at'>): Promise<ChoreT> {
		const supabase = requireSupabase();
		const { data, error } = await supabase
			.from('chores')
			.insert([chore])
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	async updateChore(id: string, updates: Partial<Omit<ChoreT, 'id' | 'created_at' | 'updated_at'>>): Promise<ChoreT> {
		const supabase = requireSupabase();
		const { data, error } = await supabase
			.from('chores')
			.update({
				...updates,
				updated_at: new Date().toISOString()
			})
			.eq('id', id)
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	async deleteChore(id: string): Promise<void> {
		const supabase = requireSupabase();
		const { error } = await supabase
			.from('chores')
			.delete()
			.eq('id', id);

		if (error) throw error;
	},

	// People
	async getPeople(): Promise<Person[]> {
		const supabase = requireSupabase();
		const { data, error } = await supabase
			.from('people')
			.select('*')
			.order('name');

		if (error) throw error;
		return data || [];
	},

	async createPerson(person: Omit<Person, 'id'>): Promise<Person> {
		const supabase = requireSupabase();
		const { data, error } = await supabase
			.from('people')
			.insert([person])
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	// Completions
	async getCompletions(): Promise<ChoreCompletion[]> {
		const supabase = requireSupabase();
		const { data, error } = await supabase
			.from('chore_completions')
			.select('*')
			.order('completed_date', { ascending: false });

		if (error) throw error;
		return data || [];
	},

	async createCompletion(completion: Omit<ChoreCompletion, 'id' | 'created_at'>): Promise<ChoreCompletion> {
		const supabase = requireSupabase();
		const { data, error } = await supabase
			.from('chore_completions')
			.insert([{
				chore_id: completion.chore_id,
				person_id: completion.person_id,
				completed_date: completion.completed_date,
				created_at: new Date().toISOString()
			}])
			.select()
			.single();

		if (error) throw error;
		return data;
	},

	async deleteCompletion(id: string): Promise<void> {
		const supabase = requireSupabase();
		const { error } = await supabase
			.from('chore_completions')
			.delete()
			.eq('id', id);

		if (error) throw error;
	}
};