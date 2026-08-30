-- Public directory: name, institute, job title, address.
-- Paginated list_members returns { items, total, limit, offset }.

update public.field_visibility_policy
set is_visible = true
where field_key in ('first_name', 'last_name', 'institute', 'job_title', 'address');

drop function if exists public.list_members(text, text, text, int, boolean);
drop function if exists public.list_members(text, text, text, int, boolean, int, int);

create or replace function public.list_members(
  p_query text default null,
  p_institute_code text default null,
  p_type_code text default null,
  p_batch_year int default null,
  p_include_inactive boolean default false,
  p_limit int default 25,
  p_offset int default 0
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
  include_inactive boolean := p_include_inactive;
  lim int := least(greatest(coalesce(p_limit, 25), 1), 10000);
  off int := greatest(coalesce(p_offset, 0), 0);
  result jsonb;
begin
  if aud not in ('admin', 'committee') then
    include_inactive := false;
  end if;

  with filtered as (
    select m
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
          public.field_is_visible('institute', aud, m.id)
          and coalesce(i.name, '') ilike '%' || q || '%'
        )
        or (
          public.field_is_visible('job_title', aud, m.id)
          and coalesce(m.job_title, '') ilike '%' || q || '%'
        )
        or (
          public.field_is_visible('address', aud, m.id)
          and coalesce(m.address, '') ilike '%' || q || '%'
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
      )
  )
  select jsonb_build_object(
    'items', coalesce((
      select jsonb_agg(
        public.serialize_member_row(p.m, aud)
        order by (p.m).last_name nulls last, (p.m).first_name nulls last
      )
      from (
        select f.m
        from filtered f
        order by (f.m).last_name nulls last, (f.m).first_name nulls last
        limit lim
        offset off
      ) p
    ), '[]'::jsonb),
    'total', (select count(*)::int from filtered),
    'limit', lim,
    'offset', off
  )
  into result;

  return result;
end;
$$;

grant execute on function public.list_members(text, text, text, int, boolean, int, int) to anon, authenticated;

notify pgrst, 'reload schema';
