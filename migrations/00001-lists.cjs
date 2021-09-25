exports.up = async client => {
	await client`
		CREATE TABLE public.lists (
			title character varying,
			slug character varying,
			description TEXT,
			user_id uuid NOT NULL,
			created_at timestamp with time zone DEFAULT now() NOT NULL,
			updated_at timestamp with time zone
		)
	`
};

exports.down = async client => {
	await client`DROP TABLE IF EXISTS public.lists`
};
