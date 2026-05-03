alter table public.products
add column if not exists collection text,
add column if not exists images jsonb not null default '[]'::jsonb,
add column if not exists visibility text not null default 'store';

alter table public.collections
add column if not exists images jsonb not null default '[]'::jsonb,
add column if not exists created bigint,
add column if not exists price numeric not null default 0;

alter table public.admin_users
add column if not exists role text not null default 'cliente',
add column if not exists email text not null default '',
add column if not exists "discordId" text,
add column if not exists avatar text;

alter table public.orders
add column if not exists "userId" text,
add column if not exists subtotal numeric not null default 0,
add column if not exists discount numeric not null default 0,
add column if not exists coupon text;

update public.admin_users
set role = 'admin'
where username = 'admin';
