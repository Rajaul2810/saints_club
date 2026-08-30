-- Saints Club schema for Supabase Cloud (Singapore).
-- Apply in the SQL Editor, then set .env.local from .env.example.
-- Create a staff user in Authentication, then:
--   npm run promote:superadmin -- you@club.org
-- Import the roll:
--   npm run import:members

create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum (
    'super_admin',
    'secretariat',
    'committee_viewer',
    'member'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.member_status as enum ('active', 'inactive', 'needs_review');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.audience as enum ('public', 'members', 'committee', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.contact_kind as enum ('phone', 'email');
exception when duplicate_object then null;
end $$;

create table if not exists public.member_types (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  admission_fee numeric,
  subscription_fee numeric,
  subscription_period text,
  quota_max int,
  has_voting_rights boolean not null default true,
  is_organisation boolean not null default false,
  needs_review boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.institutes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  city text,
  founded_year int,
  is_eligible boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  member_code text unique not null,
  first_name text,
  last_name text,
  member_type_id uuid references public.member_types (id),
  institute_id uuid references public.institutes (id),
  batch_year int,
  gender text,
  dob date,
  marital_status text,
  anniversary date,
  blood_group text,
  nationality text,
  job_title text,
  organisation text,
  job_location text,
  address text,
  status public.member_status not null default 'active',
  is_organisation boolean not null default false,
  needs_review boolean not null default false,
  review_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.member_contacts (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.members (id) on delete cascade,
  type public.contact_kind not null,
  value text not null,
  is_primary boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  member_id uuid unique references public.members (id) on delete set null,
  role public.app_role not null default 'member',
  last_login_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.field_visibility_policy (
  field_key text not null,
  audience public.audience not null,
  is_visible boolean not null default false,
  updated_by uuid references public.profiles (id),
  updated_at timestamptz not null default now(),
  primary key (field_key, audience)
);

create table if not exists public.member_field_consent (
  member_id uuid not null references public.members (id) on delete cascade,
  field_key text not null,
  audience public.audience not null,
  is_visible boolean not null default true,
  updated_at timestamptz not null default now(),
  primary key (member_id, field_key, audience)
);

create table if not exists public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  category text not null default 'General',
  published_at timestamptz,
  published_by uuid references public.profiles (id),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text,
  starts_at timestamptz not null,
  location text,
  category text not null default 'Dinner',
  cover_path text,
  is_published boolean not null default false,
  featured boolean not null default false,
  published_by uuid references public.profiles (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  excerpt text,
  body text,
  tag text not null default 'Club',
  cover_path text,
  published_at timestamptz,
  published_by uuid references public.profiles (id),
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id),
  action text not null,
  entity text not null,
  before jsonb,
  after jsonb,
  at timestamptz not null default now()
);

create index if not exists members_type_idx on public.members (member_type_id);
create index if not exists members_institute_idx on public.members (institute_id);
create index if not exists members_status_idx on public.members (status);
create index if not exists members_batch_idx on public.members (batch_year);
create index if not exists member_contacts_member_idx on public.member_contacts (member_id);
create index if not exists member_contacts_value_idx on public.member_contacts (lower(value));
create index if not exists notices_published_idx on public.notices (is_published, published_at desc);
create index if not exists events_published_idx on public.events (is_published, starts_at);
create index if not exists news_published_idx on public.news (is_published, published_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists members_updated_at on public.members;
create trigger members_updated_at before update on public.members
for each row execute function public.set_updated_at();

drop trigger if exists notices_updated_at on public.notices;
create trigger notices_updated_at before update on public.notices
for each row execute function public.set_updated_at();

drop trigger if exists events_updated_at on public.events;
create trigger events_updated_at before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists news_updated_at on public.news;
create trigger news_updated_at before update on public.news
for each row execute function public.set_updated_at();

create or replace function public.current_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.current_audience()
returns text
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  r public.app_role;
begin
  if auth.uid() is null then
    return 'public';
  end if;
  select role into r from public.profiles where id = auth.uid();
  if r is null then
    return 'public';
  end if;
  case r
    when 'super_admin' then return 'admin';
    when 'secretariat' then return 'admin';
    when 'committee_viewer' then return 'committee';
    when 'member' then return 'members';
    else return 'public';
  end case;
end;
$$;

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_role() in ('super_admin', 'secretariat', 'committee_viewer'), false);
$$;

create or replace function public.is_content_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_role() in ('super_admin', 'secretariat'), false);
$$;

create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_role() = 'super_admin', false);
$$;

create or replace function public.field_is_visible(
  p_field text,
  p_audience text,
  p_member_id uuid
)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  policy_ok boolean;
  consent_ok boolean;
begin
  if p_field in ('nid', 'password', 'admin_notes') then
    return false;
  end if;
  if p_audience = 'admin' then
    return true;
  end if;

  select is_visible into policy_ok
  from public.field_visibility_policy
  where field_key = p_field and audience = p_audience::public.audience;

  if coalesce(policy_ok, false) = false then
    return false;
  end if;

  if p_field not in ('mobile', 'email', 'organisation', 'blood_group') then
    return true;
  end if;

  select is_visible into consent_ok
  from public.member_field_consent
  where member_id = p_member_id
    and field_key = p_field
    and audience = p_audience::public.audience;

  return coalesce(consent_ok, true);
end;
$$;

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
      'institute_name', inst.name
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

create or replace function public.get_member(p_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  m public.members;
  aud text := public.current_audience();
begin
  select * into m from public.members where id = p_id;
  if not found then
    return null;
  end if;
  if aud not in ('admin', 'committee') and m.status <> 'active' then
    return null;
  end if;
  return public.serialize_member_row(m, aud);
end;
$$;

create or replace function public.quota_stats()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  general_used int;
begin
  if not public.is_staff() then
    raise exception 'not allowed';
  end if;

  select count(*)::int into general_used
  from public.members m
  join public.member_types t on t.id = m.member_type_id
  where m.status = 'active'
    and m.is_organisation = false
    and m.needs_review = false
    and t.has_voting_rights = true
    and t.is_organisation = false;

  return jsonb_build_object(
    'general', jsonb_build_object('used', general_used, 'max', 2318),
    'types', coalesce((
      select jsonb_agg(jsonb_build_object(
        'code', t.code,
        'name', t.name,
        'used', (
          select count(*) from public.members m
          where m.member_type_id = t.id
            and m.status = 'active'
            and m.is_organisation = false
            and m.needs_review = false
        ),
        'max', t.quota_max
      ) order by t.name)
      from public.member_types t
    ), '[]'::jsonb)
  );
end;
$$;

create or replace function public.enforce_member_quota()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  t public.member_types;
  used int;
  general_used int;
  r public.app_role;
begin
  r := public.current_role();
  if auth.uid() is null or r = 'super_admin' then
    return new;
  end if;
  if new.status is distinct from 'active' or new.is_organisation or new.needs_review then
    return new;
  end if;
  if tg_op = 'UPDATE'
    and old.status = 'active'
    and old.member_type_id is not distinct from new.member_type_id
    and old.needs_review is not distinct from new.needs_review
    and old.is_organisation is not distinct from new.is_organisation then
    return new;
  end if;

  select * into t from public.member_types where id = new.member_type_id;
  if t.quota_max is not null then
    select count(*)::int into used
    from public.members m
    where m.member_type_id = new.member_type_id
      and m.status = 'active'
      and m.is_organisation = false
      and m.needs_review = false
      and m.id is distinct from new.id;
    if used >= t.quota_max then
      raise exception 'Quota full for % (% of %)', t.name, used, t.quota_max;
    end if;
  end if;

  if t.has_voting_rights and not t.is_organisation then
    select count(*)::int into general_used
    from public.members m
    join public.member_types mt on mt.id = m.member_type_id
    where m.status = 'active'
      and m.is_organisation = false
      and m.needs_review = false
      and mt.has_voting_rights = true
      and mt.is_organisation = false
      and m.id is distinct from new.id;
    if general_used >= 2318 then
      raise exception 'General member ceiling reached (% of 2318)', general_used;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists members_quota on public.members;
create trigger members_quota
before insert or update of status, member_type_id, needs_review, is_organisation
on public.members
for each row execute function public.enforce_member_quota();

create or replace function public.audit_policy_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.audit_log (actor_id, action, entity, before, after)
  values (
    auth.uid(),
    tg_op,
    'field_visibility_policy',
    to_jsonb(old),
    to_jsonb(new)
  );
  new.updated_by := auth.uid();
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists field_visibility_audit on public.field_visibility_policy;
create trigger field_visibility_audit
before update on public.field_visibility_policy
for each row execute function public.audit_policy_change();

create or replace function public.audit_consent_change()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.audit_log (actor_id, action, entity, before, after)
  values (
    auth.uid(),
    tg_op,
    'member_field_consent',
    case when tg_op = 'INSERT' then null else to_jsonb(old) end,
    case when tg_op = 'DELETE' then null else to_jsonb(new) end
  );
  if tg_op = 'DELETE' then
    return old;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists member_consent_audit on public.member_field_consent;
create trigger member_consent_audit
before insert or update or delete on public.member_field_consent
for each row execute function public.audit_consent_change();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  mid uuid;
begin
  select mc.member_id into mid
  from public.member_contacts mc
  where mc.type = 'email'
    and lower(mc.value) = lower(new.email)
  limit 1;

  insert into public.profiles (id, role, member_id)
  values (new.id, 'member', mid)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.member_types enable row level security;
alter table public.institutes enable row level security;
alter table public.members enable row level security;
alter table public.member_contacts enable row level security;
alter table public.profiles enable row level security;
alter table public.field_visibility_policy enable row level security;
alter table public.member_field_consent enable row level security;
alter table public.notices enable row level security;
alter table public.events enable row level security;
alter table public.news enable row level security;
alter table public.audit_log enable row level security;

-- Lookups
drop policy if exists member_types_read on public.member_types;
create policy member_types_read on public.member_types for select using (true);

drop policy if exists institutes_read on public.institutes;
create policy institutes_read on public.institutes for select using (true);

drop policy if exists member_types_write on public.member_types;
create policy member_types_write on public.member_types for all
  using (public.is_super_admin()) with check (public.is_super_admin());

drop policy if exists institutes_write on public.institutes;
create policy institutes_write on public.institutes for all
  using (public.is_super_admin()) with check (public.is_super_admin());

-- Members: own row + secretariat/super_admin. Committee uses RPC only.
drop policy if exists members_select_own_or_editors on public.members;
create policy members_select_own_or_editors on public.members for select using (
  public.is_content_editor()
  or id = (select member_id from public.profiles where id = auth.uid())
);

drop policy if exists members_insert_editors on public.members;
create policy members_insert_editors on public.members for insert
  with check (public.is_content_editor());

drop policy if exists members_update_editors on public.members;
create policy members_update_editors on public.members for update
  using (public.is_content_editor())
  with check (public.is_content_editor());

drop policy if exists members_delete_super on public.members;
create policy members_delete_super on public.members for delete
  using (public.is_super_admin());

drop policy if exists contacts_select on public.member_contacts;
create policy contacts_select on public.member_contacts for select using (
  public.is_content_editor()
  or member_id = (select member_id from public.profiles where id = auth.uid())
);

drop policy if exists contacts_write on public.member_contacts;
create policy contacts_write on public.member_contacts for all
  using (public.is_content_editor())
  with check (public.is_content_editor());

-- Profiles
drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select using (
  id = auth.uid() or public.is_staff()
);

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update using (
  id = auth.uid()
) with check (
  id = auth.uid() and role = (select role from public.profiles where id = auth.uid())
);

drop policy if exists profiles_update_super on public.profiles;
create policy profiles_update_super on public.profiles for all
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- Policy grid
drop policy if exists policy_select_staff on public.field_visibility_policy;
create policy policy_select_staff on public.field_visibility_policy for select
  using (public.is_staff());

drop policy if exists policy_update_super on public.field_visibility_policy;
create policy policy_update_super on public.field_visibility_policy for update
  using (public.is_super_admin())
  with check (public.is_super_admin());

-- Consent
drop policy if exists consent_select on public.member_field_consent;
create policy consent_select on public.member_field_consent for select using (
  public.is_staff()
  or member_id = (select member_id from public.profiles where id = auth.uid())
);

drop policy if exists consent_write_own on public.member_field_consent;
create policy consent_write_own on public.member_field_consent for all using (
  member_id = (select member_id from public.profiles where id = auth.uid())
) with check (
  member_id = (select member_id from public.profiles where id = auth.uid())
);

-- Content
drop policy if exists notices_select on public.notices;
create policy notices_select on public.notices for select using (
  is_published or public.is_staff()
);
drop policy if exists notices_write on public.notices;
create policy notices_write on public.notices for all
  using (public.is_content_editor()) with check (public.is_content_editor());

drop policy if exists events_select on public.events;
create policy events_select on public.events for select using (
  is_published or public.is_staff()
);
drop policy if exists events_write on public.events;
create policy events_write on public.events for all
  using (public.is_content_editor()) with check (public.is_content_editor());

drop policy if exists news_select on public.news;
create policy news_select on public.news for select using (
  is_published or public.is_staff()
);
drop policy if exists news_write on public.news;
create policy news_write on public.news for all
  using (public.is_content_editor()) with check (public.is_content_editor());

drop policy if exists audit_select on public.audit_log;
create policy audit_select on public.audit_log for select using (public.is_staff());

drop policy if exists audit_insert on public.audit_log;
create policy audit_insert on public.audit_log for insert with check (true);

create or replace function public.link_profile_member()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  mid uuid;
  mail text;
begin
  if auth.uid() is null then
    return null;
  end if;
  select email into mail from auth.users where id = auth.uid();
  if mail is null then
    return null;
  end if;
  select mc.member_id into mid
  from public.member_contacts mc
  where mc.type = 'email' and lower(mc.value) = lower(mail)
  limit 1;
  if mid is not null then
    update public.profiles
    set member_id = mid
    where id = auth.uid() and member_id is null;
  end if;
  return mid;
end;
$$;

grant execute on function public.link_profile_member() to authenticated;
grant execute on function public.list_members(text, text, text, int, boolean, int, int) to anon, authenticated;
grant execute on function public.get_member(uuid) to anon, authenticated;
grant execute on function public.quota_stats() to authenticated;
grant execute on function public.current_audience() to anon, authenticated;
grant execute on function public.current_role() to authenticated;
grant execute on function public.field_is_visible(text, text, uuid) to anon, authenticated;

-- Storage
insert into storage.buckets (id, name, public)
values ('public-media', 'public-media', true)
on conflict (id) do nothing;

drop policy if exists public_media_read on storage.objects;
create policy public_media_read on storage.objects for select
  using (bucket_id = 'public-media');

drop policy if exists public_media_write on storage.objects;
create policy public_media_write on storage.objects for insert
  with check (
    bucket_id = 'public-media' and public.is_content_editor()
  );

drop policy if exists public_media_update on storage.objects;
create policy public_media_update on storage.objects for update
  using (bucket_id = 'public-media' and public.is_content_editor())
  with check (bucket_id = 'public-media' and public.is_content_editor());

drop policy if exists public_media_delete on storage.objects;
create policy public_media_delete on storage.objects for delete
  using (bucket_id = 'public-media' and public.is_content_editor());

-- Seeds
insert into public.member_types (code, name, admission_fee, subscription_fee, subscription_period, quota_max, has_voting_rights, is_organisation, needs_review)
values
  ('FM', 'Founder Member', 0, 0, 'exempt', null, true, false, false),
  ('DM', 'Donor Member', 500000, 0, 'exempt', 300, true, false, false),
  ('LM', 'Life Member', 300000, 0, 'exempt', 500, true, false, false),
  ('PM', 'Permanent Member', 100000, 1000, 'month', 1500, true, false, false),
  ('PT', 'Patron Member', 700000, 0, 'exempt', null, true, false, false),
  ('HM', 'Honorary Member', null, null, 'invitation', null, false, false, false),
  ('NR', 'Non-Resident Member', null, null, 'year', null, false, false, false),
  ('AS', 'Associate Member', null, null, 'as_prescribed', null, false, false, false),
  ('SM', 'Senior Member', null, null, 'as_prescribed', null, false, false, false),
  ('CR', 'Corporate Member', 1000000, 3000, 'month', null, false, true, false),
  ('CNBL', 'Club Notre Damians BD Ltd.', null, null, null, null, false, true, true),
  ('NONM', 'Organisational entity', null, null, null, null, false, true, true),
  ('SCL', 'Organisational entity', null, null, null, null, false, true, true)
on conflict (code) do nothing;

insert into public.institutes (code, name, city, founded_year, is_eligible)
values
  ('SG', 'St. Gregory''s High School', 'Dhaka', 1882, true),
  ('SJ', 'St. Joseph Higher Secondary School', 'Dhaka', 1954, true),
  ('HC', 'Holy Cross Girls'' High School', 'Dhaka', 1951, true),
  ('SF', 'St. Francis Xavier''s Girls High School', 'Dhaka', 1912, true),
  ('SP', 'St. Placid''s School', 'Chattogram', 1853, true),
  ('SS', 'St. Scholastica''s Girls'' School', 'Chattogram', 1883, true),
  ('GI', 'S.F.X. Greenherald International School', 'Dhaka', 1972, true),
  ('CU', 'Unconfirmed / other institute', null, null, false)
on conflict (code) do nothing;

insert into public.field_visibility_policy (field_key, audience, is_visible)
select field_key, audience::public.audience,
  case
    when audience = 'admin' then true
    when field_key in ('first_name', 'last_name', 'institute', 'job_title', 'address') then true
    when field_key in ('member_type', 'status', 'batch_year', 'organisation', 'member_code')
      then audience <> 'public'
    when field_key in ('mobile', 'email', 'blood_group') then audience = 'committee'
    else false
  end
from unnest(array[
  'first_name','last_name','member_code','member_type','status','batch_year','institute',
  'job_title','organisation','job_location','mobile','email','marital_status','anniversary',
  'dob','blood_group','gender','address','nationality'
]) as field_key
cross join unnest(array['public','members','committee','admin']) as audience
on conflict (field_key, audience) do nothing;

insert into public.notices (title, body, category, published_at, is_published)
select * from (values
  (
    'Nominations for the Board of Directors',
    'General Members in good standing may nominate and second candidates for the President and Directors. Terms are two years. Particulars from the Secretariat.',
    'Governance',
    timestamptz '2026-07-28 09:00+06',
    true
  ),
  (
    'Membership Scrutiny sitting dates',
    'The Membership Scrutiny Committee will meet on the last Thursday of each month. Complete papers must reach the Secretariat seven days prior.',
    'Membership',
    timestamptz '2026-07-14 09:00+06',
    true
  ),
  (
    'Subscriptions and financial standing',
    'Permanent, Corporate, and Expatriate members are reminded that monthly subscriptions fall due on the first of each month. Defaults are referred under the Articles.',
    'Finance',
    timestamptz '2026-07-01 09:00+06',
    true
  ),
  (
    'Code of Conduct — house reminder',
    'Misconduct or derogatory behaviour may be referred to the Disciplinary Committee, with appeal to the Appellate Committee and, where provided, Arbitration.',
    'Conduct',
    timestamptz '2026-06-20 09:00+06',
    true
  )
) as v(title, body, category, published_at, is_published)
where not exists (select 1 from public.notices n where n.title = v.title);

insert into public.events (title, body, starts_at, location, category, cover_path, is_published, featured)
select * from (values
  (
    'Autumn Family Night',
    'An evening for members, spouses, and children. Dinner, music, and introductions for newly admitted families.',
    timestamptz '2026-09-12 18:30+06',
    'Lounge & lawn',
    'Family',
    'https://images.unsplash.com/photo-1511632765486-a01980e01a43?w=1200&h=800&fit=crop',
    true,
    true
  ),
  (
    'Alumni Reunion Dinner',
    'A table for the seven schools. Address by the President, followed by conversation in the lounge.',
    timestamptz '2026-09-28 19:00+06',
    'Dining hall',
    'Reunion',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=800&fit=crop',
    true,
    false
  ),
  (
    'Indoor Games Cup',
    'A day of fixtures for members and older children. Lunch in the dining room; prizes in the afternoon.',
    timestamptz '2026-10-05 10:00+06',
    'Indoor games room',
    'Sport',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=800&fit=crop',
    true,
    false
  ),
  (
    'Cultural Evening',
    'Music and readings hosted by Lounge, Events & Cultural Affairs. Members and introduced guests.',
    timestamptz '2026-10-18 18:00+06',
    'Event hall',
    'Cultural',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=800&fit=crop',
    true,
    false
  ),
  (
    'Holiday Celebration',
    'A family gathering to close the year. Children welcome. Reservations at the Secretariat.',
    timestamptz '2026-12-20 17:00+06',
    'House',
    'Family',
    'https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=1200&h=800&fit=crop',
    true,
    false
  ),
  (
    'Members’ Dinner',
    'A quieter members’ table. Spouses welcome. Dress as published on the notice board.',
    timestamptz '2026-11-07 19:30+06',
    'Dining hall',
    'Dinner',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&h=800&fit=crop',
    true,
    false
  )
) as v(title, body, starts_at, location, category, cover_path, is_published, featured)
where not exists (select 1 from public.events e where e.title = v.title);

insert into public.news (title, excerpt, body, tag, cover_path, published_at, is_published)
select * from (values
  (
    'From Gregorian Alumni Club to Saints Club Limited',
    'The Club continues as a company limited by guarantee, bringing together alumni of seven missionary schools.',
    'Originally registered as Gregorian Alumni Club Limited, Saints Club Limited is incorporated under the Companies Act, 1994. The house remains a family-centric society for alumni of Bangladesh’s premier Christian missionary schools.',
    'Club',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop',
    timestamptz '2026-08-02 09:00+06',
    true
  ),
  (
    'Autumn family nights return to the calendar',
    'Lounge, Events & Cultural Affairs has published the season’s family and reunion dates.',
    'Members may reserve a table at the Secretariat. Spouses and dependent children under 24 are welcome as of right.',
    'Events',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&h=800&fit=crop',
    timestamptz '2026-07-22 09:00+06',
    true
  ),
  (
    'Gym and indoor games room now on house hours',
    'Sports, Gym & Indoor Games confirms daily access for members and families during published hours.',
    'Organised fixtures will be announced on the notice board. Private hire of event spaces remains by booking.',
    'Facilities',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=800&fit=crop',
    timestamptz '2026-07-10 09:00+06',
    true
  )
) as v(title, excerpt, body, tag, cover_path, published_at, is_published)
where not exists (select 1 from public.news n where n.title = v.title);
