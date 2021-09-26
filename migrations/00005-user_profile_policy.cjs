exports.up = async client => {
	await client`
    create policy "Public profiles are viewable by everyone." on public.profiles for select using ( true );
  `
	await client`
    create policy "Users can insert their own profile." on public.profiles for insert with check ( auth.uid() = user_id );
  `

	await client`
    create policy "Users can update own profile." on public.profiles for update using ( auth.uid() = user_id );
  `
};

exports.down = async client => {
	await client`drop policy if exists "Public profiles are viewable by everyone." on public.profiles`
	await client`drop policy if exists "Users can insert their own profile." on public.profiles`
	await client`drop policy if exists "Users can update own profile." on public.profiles`
};
