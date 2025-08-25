import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://dyakaanxmnioqmwhspzw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5YWthYW54bW5pb3Ftd2hzcHp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4Nzk3MzIsImV4cCI6MjA1ODQ1NTczMn0.q80WN5aUJu8j5b0rbUqLD63IBq2Sm1kCtqTskYU9eaM';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { storage: AsyncStorage, autoRefreshToken: true, persistSession: true },
});
