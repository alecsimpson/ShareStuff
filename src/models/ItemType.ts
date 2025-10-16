
export type ItemType = {
	id: number;
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
