-- Free-text institute on members. Type stays a fixed lookup.

alter table public.members
  add column if not exists institute_name text;

update public.members m
set institute_name = i.name
from public.institutes i
where m.institute_id = i.id
  and coalesce(m.institute_name, '') = '';

create or replace function public.serialize_member_row(m public.members, aud text)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result jsonb := jsonb_build_object('id', m.id);
  inst public.institutes;
  mtype public.member_types;
  phone text;
  em text;
  vis boolean;
begin
  select * into inst from public.institutes where id = m.institute_id;
  select * into mtype from public.member_types where id = m.member_type_id;
  select value into phone
    from public.member_contacts
    where member_id = m.id and type = 'phone'
    order by is_primary desc, created_at
    limit 1;
  select value into em
    from public.member_contacts
    where member_id = m.id and type = 'email'
    order by is_primary desc, created_at
    limit 1;

  vis := public.field_is_visible('first_name', aud, m.id);
  if vis then
    result := result || jsonb_build_object('first_name', m.first_name);
  end if;
  if public.field_is_visible('last_name', aud, m.id) then
    result := result || jsonb_build_object('last_name', m.last_name);
    vis := true;
  end if;
  if vis then
    result := result || jsonb_build_object(
      'name',
      trim(both ' ' from concat_ws(' ', m.first_name, m.last_name))
    );
  end if;
  if public.field_is_visible('member_code', aud, m.id) then
    result := result || jsonb_build_object('member_code', m.member_code);
  end if;
  if public.field_is_visible('member_type', aud, m.id) then
    result := result || jsonb_build_object(
      'member_type', mtype.code,
      'member_type_name', mtype.name
    );
  end if;
  if public.field_is_visible('status', aud, m.id) then
    result := result || jsonb_build_object('status', m.status);
  end if;
  if public.field_is_visible('batch_year', aud, m.id) then
    result := result || jsonb_build_object('batch_year', m.batch_year);
  end if;
  if public.field_is_visible('institute', aud, m.id) then
    result := result || jsonb_build_object(
      'institute', inst.code,
      'institute_name', coalesce(nullif(trim(m.institute_name), ''), inst.name)
    );
  end if;
  if public.field_is_visible('job_title', aud, m.id) then
    result := result || jsonb_build_object('job_title', m.job_title);
  end if;
  if public.field_is_visible('organisation', aud, m.id) then
    result := result || jsonb_build_object('organisation', m.organisation);
  end if;
  if public.field_is_visible('job_location', aud, m.id) then
    result := result || jsonb_build_object('job_location', m.job_location);
  end if;
  if public.field_is_visible('mobile', aud, m.id) then
    result := result || jsonb_build_object('mobile', phone);
  end if;
  if public.field_is_visible('email', aud, m.id) then
    result := result || jsonb_build_object('email', em);
  end if;
  if public.field_is_visible('marital_status', aud, m.id) then
    result := result || jsonb_build_object('marital_status', m.marital_status);
  end if;
  if public.field_is_visible('anniversary', aud, m.id) then
    result := result || jsonb_build_object('anniversary', m.anniversary);
  end if;
  if public.field_is_visible('dob', aud, m.id) then
    result := result || jsonb_build_object('dob', m.dob);
  end if;
  if public.field_is_visible('blood_group', aud, m.id) then
    result := result || jsonb_build_object('blood_group', m.blood_group);
  end if;
  if public.field_is_visible('gender', aud, m.id) then
    result := result || jsonb_build_object('gender', m.gender);
  end if;
  if public.field_is_visible('address', aud, m.id) then
    result := result || jsonb_build_object('address', m.address);
  end if;
  if public.field_is_visible('nationality', aud, m.id) then
    result := result || jsonb_build_object('nationality', m.nationality);
  end if;
  if aud = 'admin' then
    result := result || jsonb_build_object(
      'is_organisation', m.is_organisation,
      'needs_review', m.needs_review,
      'review_notes', m.review_notes
    );
  end if;
  return result;
end;
$$;

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
  inst_q text := nullif(trim(p_institute_code), '');
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
      and (
        inst_q is null
        or coalesce(m.institute_name, i.name, '') ilike '%' || inst_q || '%'
      )
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
          and coalesce(m.institute_name, i.name, '') ilike '%' || q || '%'
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
