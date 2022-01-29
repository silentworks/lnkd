exports.up = async client => {
	await client`
    -- inserts a row into public.links
    CREATE FUNCTION public.handle_new_link()
    RETURNS TRIGGER AS $$
    BEGIN
      new.user_id = auth.uid();
      return new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `
	await client`
    -- trigger the function every time a link is created
    CREATE TRIGGER on_link_created
    BEFORE INSERT ON public.links
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_link();
  `

  await client`
    -- update a row into public.links
    CREATE FUNCTION public.handle_update_link()
    RETURNS TRIGGER AS $$
    BEGIN
      new.user_id = old.user_id;
      return new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `
  await client`
    -- trigger the function every time a link is updated
    CREATE TRIGGER on_link_updated
    BEFORE UPDATE ON public.links
    FOR EACH ROW EXECUTE PROCEDURE public.handle_update_link();
  `
};

exports.down = async client => {
	await client`DROP TRIGGER IF EXISTS on_link_created ON public.links;`
	await client`DROP FUNCTION IF EXISTS public.handle_new_link();`

	await client`DROP TRIGGER IF EXISTS on_link_updated ON public.links;`
	await client`DROP FUNCTION IF EXISTS public.handle_update_link();`
};

