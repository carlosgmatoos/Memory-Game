import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const URL = 'https://rgatekwvjnfvhcgtlqss.supabase.co'
const KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYXRla3d2am5mdmhjZ3RscXNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMTc3NzEsImV4cCI6MjA0OTg5Mzc3MX0.MYp4T804RyZqorSZCE1CoSFGOCWrhJM1EPCgzv4t7UM'
export const supabase = createClient(URL, KEY)
