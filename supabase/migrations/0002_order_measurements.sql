-- Adds custom tailoring measurements to orders, for when the ordered abaya
-- isn't ready for immediate delivery and needs to be made to the customer's
-- measurements. Run this once in the Supabase SQL Editor.

alter table orders add column if not exists custom_measurements jsonb;
