-- Uniflora Closet: products + orders schema.
-- Run this once in the Supabase SQL Editor (SQL Editor > New query > paste > Run).

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  price numeric(10, 3) not null,
  image text not null,
  tagline text not null,
  description text not null,
  details text[] not null default '{}',
  fabric text not null,
  sizes text[] not null default '{}',
  is_new boolean not null default false,
  is_bestseller boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

create policy "Public can read products"
  on products for select
  to anon
  using (true);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  delivery boolean not null default false,
  city text,
  neighborhood text,
  address text,
  items jsonb not null,
  subtotal numeric(10, 3) not null,
  shipping numeric(10, 3) not null,
  total numeric(10, 3) not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

alter table orders enable row level security;

create policy "Public can create orders"
  on orders for insert
  to anon
  with check (true);

-- Seed the 5 launch products (safe to re-run: skips slugs that already exist).
insert into products (slug, name, category, price, image, tagline, description, details, fabric, sizes, is_new, is_bestseller, sort_order)
values
  (
    'blush-palm', 'Blush Palm', 'مناسبات', 41.5, '/products/blush-palm.jpg',
    'نخيل مطرّز بخيوط وردية على قماش عاجي ناعم.',
    'عباية بيضاء عاجية مطرّزة يدويًا بنقشة سعف النخيل بخيوط وردية دقيقة، بتنورة مطوية (بليسيه) تمنحها حركة وثقلاً أنيقًا عند كل خطوة.',
    array['تطريز يدوي بخيط وردي على القماش بالكامل', 'تنورة سفلية مطوية (بليسيه) بالكامل', 'سحّاب خلفي مخفي', 'أكمام طويلة واسعة'],
    'قطن كريب فاخر', array['52', '54', '56', '58'], true, false, 1
  ),
  (
    'sky-rain', 'Sky Rain', 'يومية', 31, '/products/sky-rain.jpg',
    'طبقة خفيفة بنقشة هندسية زرقاء، تُرتدى فوق أي إطلالة.',
    'قطعة علوية خفيفة بطبعة هندسية زرقاء مستوحاة من زخارف المشربية، مثالية كطبقة تُضاف فوق العباية اليومية أو كرداء منفرد في المشاوير السريعة.',
    array['قماش خفيف الوزن يتنفس بالكامل', 'طبعة هندسية مطبوعة بتقنية الصبغ الرقمي', 'قصّة مفتوحة بلا أزرار', 'مقاس واحد يناسب الجميع'],
    'قطن مغسول ناعم', array['Free Size'], false, false, 2
  ),
  (
    'navy-lily', 'Navy Lily', 'مناسبات', 33, '/products/navy-lily.jpg',
    'معطف كحلي بطبعة زنبق أبيض تمتد على كامل الذيل.',
    'معطف عباية كحلي بقصّة ياقة كلاسيكية، تزيّن أطرافه السفلية طبعة فنية لزهور الزنبق، يُرتدى فوق فستان داخلي لإطلالة مركّبة وأنيقة في المناسبات المسائية.',
    array['طبعة زهور فنية على كامل الذيل السفلي', 'ياقة كلاسيكية مفتوحة من الأمام', 'أكمام واسعة بقصّة مستقيمة', 'يُرتدى كطبقة علوية فوق فستان داخلي'],
    'كريب صوفي فاخر', array['52', '54', '56', '58', '60'], false, true, 3
  ),
  (
    'emerald-ruby', 'Emerald & Ruby', 'مناسبات', 33, '/products/emerald-ruby.jpg',
    'قطعة بلونين متباينين، سويدي فاخر بغرزة يدوية بارزة.',
    'عباية من قماش السويدي الفاخر بتصميم ثنائي اللون بين الزمردي والعنابي، تُبرز خياطتها اليدوية البارزة على الحواف حرفية الصنع في كل تفصيلة.',
    array['قماش سويدي فاخر بلونين متباينين', 'خياطة حواف يدوية بارزة بخيط أبيض', 'قصّة مفتوحة من الأمام دون أزرار', 'تصميم محدود الكمية'],
    'سويدي (شمواه) صناعي فاخر', array['52', '54', '56', '58'], false, false, 4
  ),
  (
    'red-hibiscus', 'Red Hibiscus', 'مناسبات', 37, '/products/red-hibiscus.jpg',
    'زهرة الكركديه على حرير أسود، بأكمام عنابية وشراشيب.',
    'عباية بلوحة زهرة كركديه فنية على لوح أسود حريري، بأكمام وأطراف عنابية داكنة تنتهي بشراشيب حريرية، لإطلالة مسائية درامية ومميزة.',
    array['طبعة فنية لزهرة الكركديه على قماش حريري', 'أكمام وأطراف بلون عنابي داكن متباين', 'شراشيب حريرية عند الذيل', 'تصميم محدود الكمية'],
    'حرير صناعي فاخر', array['52', '54', '56', '58'], false, false, 5
  )
on conflict (slug) do nothing;
