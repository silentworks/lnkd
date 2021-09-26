exports.up = async client => {
	await client`alter table public.profiles add primary key (user_id);`
};

exports.down = async client => {
	// ALTER TABLE products
	// DROP CONSTRAINT products_pkey;
	await client`alter table public.profiles drop constraint profiles_pkey;`
};
