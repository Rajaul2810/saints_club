-- Fix: cannot cast type record to members
create or replace function public.list_members(
  p_query text default null,
  p_institute_code text default null,
  p_type_code text default null,
  p_batch_year int default null,
  p_include_inactive boolean default false
)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  aud text := public.current_audience();
  q text := nullif(trim(p_query), '');
  result jsonb;
  include_inactive boolean := p_include_inactive;
begin
  if aud not in ('admin', 'committee') then
    include_inactive := false;
  end if;

  select coalesce(
    jsonb_agg(
      public.serialize_member_row(m, aud)
      order by m.last_name nulls last, m.first_name nulls last
    ),
    '[]'::jsonb
  )
  into result
  from public.members m
  left join public.institutes i on i.id = m.institute_id
  left join public.member_types t on t.id = m.member_type_id
  where (include_inactive or m.status = 'active')
    and (p_institute_code is null or i.code = p_institute_code)
    and (p_type_code is null or t.code = p_type_code)
    and (p_batch_year is null or m.batch_year = p_batch_year)
    and (
      q is null
      or (
        public.field_is_visible('first_name', aud, m.id)
        and (
          coalesce(m.first_name, '') ilike '%' || q || '%'
          or coalesce(m.last_name, '') ilike '%' || q || '%'
          or concat_ws(' ', m.first_name, m.last_name) ilike '%' || q || '%'
        )
      )
      or (
        public.field_is_visible('member_code', aud, m.id)
        and m.member_code ilike '%' || q || '%'
      )
      or (
        public.field_is_visible('organisation', aud, m.id)
        and coalesce(m.organisation, '') ilike '%' || q || '%'
      )
      or (
        public.field_is_visible('mobile', aud, m.id)
        and exists (
          select 1 from public.member_contacts c
          where c.member_id = m.id and c.type = 'phone' and c.value ilike '%' || q || '%'
        )
      )
      or (
        public.field_is_visible('email', aud, m.id)
        and exists (
          select 1 from public.member_contacts c
          where c.member_id = m.id and c.type = 'email' and c.value ilike '%' || q || '%'
        )
      )
    );

  return result;
end;
$$;

grant execute on function public.list_members(text, text, text, int, boolean) to anon, authenticated;

notify pgrst, 'reload schema';
