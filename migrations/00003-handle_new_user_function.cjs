exports.up = async client => {
	await client`
    -- inserts a row into public.users
    create function public.handle_new_user()
    returns trigger as $$
    begin
      insert into public.profiles (user_id)
      values (new.id);
      return new;
    end;
    $$ language plpgsql security definer;
  `

  await client`
    -- trigger the function every time a user is created
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_user();
  `
};

exports.down = async client => {
	await client`drop trigger if exists on_auth_user_created on auth.users;`
	await client`drop function if exists public.handle_new_user();`
};
