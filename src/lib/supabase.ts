import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Portfolio types
export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  cover_image: string | null;
  badge: string | null;
  status: string;
  is_public: boolean;
  is_featured: boolean;
  view_count: number;
  order_index: number;
  created_at: string;
  tags?: PortfolioTag[];
  techStack?: PortfolioTechStack[];
  detail?: PortfolioDetail;
  tasks?: PortfolioTask[];
  results?: PortfolioResult[];
}

export interface PortfolioTag {
  id: string;
  portfolio_id: string;
  tag: string;
  order_index: number;
}

export interface PortfolioTechStack {
  id: string;
  portfolio_id: string;
  category: string | null;
  name: string;
  icon: string | null;
  icon_color: string | null;
  order_index: number;
}

export interface PortfolioDetail {
  id: string;
  portfolio_id: string;
  period: string | null;
  role: string | null;
  team_size: number | null;
  contribution: number | null;
}

export interface PortfolioTask {
  id: string;
  portfolio_id: string;
  task: string;
  order_index: number;
}

export interface PortfolioResult {
  id: string;
  portfolio_id: string;
  result: string;
  metric_value: string | null;
  order_index: number;
}

// Get portfolios
export const getPortfolios = async () => {
  const { data, error } = await supabase
    .from('portfolios')
    .select(`
      *,
      tags:portfolio_tags(*),
      techStack:portfolio_tech_stack(*),
      detail:portfolio_details(*),
      tasks:portfolio_tasks(*),
      results:portfolio_results(*)
    `)
    .eq('is_public', true)
    .order('is_featured', { ascending: false })
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching portfolios:', error);
    return [];
  }

  // Sort nested arrays
  return (data || []).map(p => ({
    ...p,
    tags: p.tags?.sort((a: PortfolioTag, b: PortfolioTag) => a.order_index - b.order_index) || [],
    techStack: p.techStack?.sort((a: PortfolioTechStack, b: PortfolioTechStack) => a.order_index - b.order_index) || [],
    tasks: p.tasks?.sort((a: PortfolioTask, b: PortfolioTask) => a.order_index - b.order_index) || [],
    results: p.results?.sort((a: PortfolioResult, b: PortfolioResult) => a.order_index - b.order_index) || [],
  }));
};
