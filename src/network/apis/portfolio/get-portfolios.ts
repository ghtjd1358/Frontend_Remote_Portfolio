import { supabase, ApiResponse, PageListResponse } from '../common';
import { PortfolioSearchCondition, PortfolioSummary } from './types';

/**
 * 포트폴리오 목록을 조회합니다.
 */
export async function getPortfolios(
  params: PortfolioSearchCondition = {}
): Promise<ApiResponse<PageListResponse<PortfolioSummary>>> {
  try {
    const { page = 1, limit = 12, categoryId, status, isFeatured, isPublic, search, userId } = params;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('portfolios')
      .select(`
        *,
        category:portfolio_categories(id, name, slug, description),
        tags:portfolio_tags(id, tag, order_index),
        detail:portfolio_details(*),
        techStack:portfolio_tech_stack(id, name, icon, icon_color, order_index)
      `, { count: 'exact' });

    // 공개 여부 필터
    if (isPublic !== undefined) {
      query = query.eq('is_public', isPublic);
    } else {
      query = query.eq('is_public', true);
    }

    // 상태 필터
    if (status) {
      query = query.eq('status', status);
    }

    // 카테고리 필터
    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    // 사용자 필터
    if (userId) {
      query = query.eq('user_id', userId);
    }

    // 추천 필터
    if (isFeatured !== undefined) {
      query = query.eq('is_featured', isFeatured);
    }

    // 검색어 필터
    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    // 정렬 및 페이지네이션
    query = query
      .order('is_featured', { ascending: false })
      .order('order_index', { ascending: true })
      .range(offset, offset + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: {
        data: data || [],
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit),
      },
    };
  } catch (err) {
    return { success: false, error: '포트폴리오 목록 조회 중 오류가 발생했습니다.' };
  }
}
