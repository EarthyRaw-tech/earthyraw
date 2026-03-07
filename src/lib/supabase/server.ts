import { createClient, type SupabaseClient } from "@supabase/supabase-js";

type JsonPrimitive = string | number | boolean | null;
export type Json = JsonPrimitive | { [key: string]: Json | undefined } | Json[];

export type SupabaseDatabase = {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string;
          data: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          data: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          data?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings_history: {
        Row: {
          id: number;
          settings_id: string;
          data: Json;
          created_at: string;
        };
        Insert: {
          id?: number;
          settings_id: string;
          data: Json;
          created_at?: string;
        };
        Update: {
          id?: number;
          settings_id?: string;
          data?: Json;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "site_settings_history_settings_id_fkey";
            columns: ["settings_id"];
            isOneToOne: false;
            referencedRelation: "site_settings";
            referencedColumns: ["id"];
          },
        ];
      };
      lead_submissions: {
        Row: {
          id: string;
          name_role: string;
          company: string;
          phone: string;
          email: string;
          users_pcs: string;
          has_server: string;
          issues: string[];
          message: string;
          language: string;
          destination_email: string;
          submitted_at: string;
          ip: string;
          user_agent: string;
          payload: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          name_role: string;
          company: string;
          phone: string;
          email: string;
          users_pcs: string;
          has_server: string;
          issues: string[];
          message: string;
          language: string;
          destination_email: string;
          submitted_at: string;
          ip: string;
          user_agent: string;
          payload: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          name_role?: string;
          company?: string;
          phone?: string;
          email?: string;
          users_pcs?: string;
          has_server?: string;
          issues?: string[];
          message?: string;
          language?: string;
          destination_email?: string;
          submitted_at?: string;
          ip?: string;
          user_agent?: string;
          payload?: Json;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

let cachedClient: SupabaseClient<SupabaseDatabase> | null | undefined;

function readEnv(name: "SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY") {
  return process.env[name]?.trim() ?? "";
}

export function isSupabaseConfigured() {
  return Boolean(readEnv("SUPABASE_URL") && readEnv("SUPABASE_SERVICE_ROLE_KEY"));
}

export function getSupabaseAdminClient() {
  if (cachedClient !== undefined) {
    return cachedClient;
  }

  const url = readEnv("SUPABASE_URL");
  const serviceRoleKey = readEnv("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceRoleKey) {
    cachedClient = null;
    return cachedClient;
  }

  cachedClient = createClient<SupabaseDatabase>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        "X-Client-Info": "earthyraw-web/server",
      },
    },
  });

  return cachedClient;
}
