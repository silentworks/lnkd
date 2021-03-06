exports.up = async (client) => {
  await client`
		CREATE TABLE public.profiles (
			id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
			user_id uuid references auth.users NOT NULL,
			username character varying,
			full_name character varying,
			country character varying,
			created_at timestamp with time zone DEFAULT now() NOT NULL,
			updated_at timestamp with time zone
		)
	`

  await client`
		ALTER TABLE ONLY public.profiles
			ADD CONSTRAINT unique_username UNIQUE (username)
	`

  await client`
		ALTER TABLE ONLY public.profiles
			ADD CONSTRAINT users_pkey UNIQUE (user_id)
	`
}

exports.down = async (client) => {
  await client`DROP TABLE IF EXISTS public.profiles`
}
