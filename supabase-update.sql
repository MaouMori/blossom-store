alter table public.products
add column if not exists collection text,
add column if not exists images jsonb not null default '[]'::jsonb,
add column if not exists visibility text not null default 'store';

alter table public.collections
add column if not exists images jsonb not null default '[]'::jsonb,
add column if not exists created bigint;

alter table public.admin_users
add column if not exists role text not null default 'cliente';

update public.admin_users
set role = 'admin'
where username = 'admin';
