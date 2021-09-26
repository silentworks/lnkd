exports.up = async client => {
	await client`alter table public.profiles enable row level security;`
	await client`alter table public.lists enable row level security;`
	await client`alter table public.links enable row level security;`
};

exports.down = async client => {
	await client`alter table public.profiles disable row level security;`
	await client`alter table public.lists disable row level security;`
	await client`alter table public.links disable row level security;`
};
