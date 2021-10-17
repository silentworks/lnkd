exports.up = async client => {
  await client`CREATE POLICY "Enable all actions for users based on user_id" ON public.lists FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);`
};

exports.down = async client => {
	await client`DROP POLICY IF EXISTS "Enable all actions for users based on user_id" ON public.lists`
};
