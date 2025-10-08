
export type ItemType = {
	id: string;
	name: string;
	addedAt: Date;
	addedBy: string;
	urgent: boolean;
	bought: boolean;
	price?: number;
	description?: string;
	link?: string;
	amount?: number;
	image?: string;
};
