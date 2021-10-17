exports.up = async client => {
	await client`
		CREATE TABLE public.lists (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			title character varying,
			slug character varying,
			description TEXT,
			published INT DEFAULT 0,
			user_id uuid references auth.users NOT NULL,
			created_at timestamp with time zone DEFAULT now() NOT NULL,
			updated_at timestamp with time zone
		)
	`
};

exports.down = async client => {
	await client`DROP TABLE IF EXISTS public.lists`
};
