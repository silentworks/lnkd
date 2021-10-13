exports.up = async client => {
	await client`
		CREATE TABLE public.links (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			title character varying,
			type character varying,
			url character varying,
			published INT DEFAULT 0,
			description TEXT,
			user_id uuid NOT NULL,
			created_at timestamp with time zone DEFAULT now() NOT NULL,
			updated_at timestamp with time zone
		)
	`
};

exports.down = async client => {
	await client`DROP TABLE IF EXISTS public.links`
};
