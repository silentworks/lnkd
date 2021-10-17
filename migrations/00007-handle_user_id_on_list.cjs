exports.up = async client => {
	await client`
    -- inserts a row into public.lists
    CREATE FUNCTION public.handle_new_list()
    RETURNS TRIGGER AS $$
    BEGIN
      new.user_id = auth.uid();
      return new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `
	await client`
    -- trigger the function every time a list is created
    CREATE TRIGGER on_list_created
    BEFORE INSERT ON public.lists
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_list();
  `

  await client`
    -- update a row into public.lists
    CREATE FUNCTION public.handle_update_list()
    RETURNS TRIGGER AS $$
    BEGIN
      new.user_id = old.user_id;
      return new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `
  await client`
    -- trigger the function every time a list is updated
    CREATE TRIGGER on_list_updated
    BEFORE UPDATE ON public.lists
    FOR EACH ROW EXECUTE PROCEDURE public.handle_update_list();
  `
};

exports.down = async client => {
	await client`DROP TRIGGER IF EXISTS on_list_created ON public.lists;`
	await client`DROP FUNCTION IF EXISTS public.handle_new_list();`

	await client`DROP TRIGGER IF EXISTS on_list_updated ON public.lists;`
	await client`DROP FUNCTION IF EXISTS public.handle_update_list();`
};
