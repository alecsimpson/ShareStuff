
export type ItemT = {
	id: string;
	name: string;
	created_at: Date;
	created_by: string;
	urgent: boolean;
	bought: boolean;
	price?: number;
	description?: string;
	link?: string;
	amount?: number;
	image_url?: string;
	store?: string;
};
