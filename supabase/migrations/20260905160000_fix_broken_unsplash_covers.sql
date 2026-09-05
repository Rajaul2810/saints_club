-- Fix Unsplash cover URLs that now return 404
update public.events
set cover_path = replace(
  cover_path,
  'photo-1511632765486-a01980e01a43',
  'photo-1529156069898-49953e39b3ac'
)
where cover_path like '%photo-1511632765486-a01980e01a43%';

update public.events
set cover_path = replace(
  cover_path,
  'photo-1519167758481-83f29da8c2b0',
  'photo-1511795409834-ef04bbd61622'
)
where cover_path like '%photo-1519167758481-83f29da8c2b0%';

update public.news
set cover_path = replace(
  cover_path,
  'photo-1511632765486-a01980e01a43',
  'photo-1529156069898-49953e39b3ac'
)
where cover_path like '%photo-1511632765486-a01980e01a43%';

update public.news
set cover_path = replace(
  cover_path,
  'photo-1519167758481-83f29da8c2b0',
  'photo-1511795409834-ef04bbd61622'
)
where cover_path like '%photo-1519167758481-83f29da8c2b0%';
