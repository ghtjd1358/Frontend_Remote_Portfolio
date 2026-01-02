import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujhlgylnauzluttvmcrz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqaGxneWxuYXV6bHV0dHZtY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU1MDA0MjcsImV4cCI6MjA4MTA3NjQyN30.UcOpbc6QDU-J2s_6eI5vEehvbgSRMCSHIjkFiHb0oRo';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedData() {
  console.log('🌱 Starting to seed dummy data...\n');

  // 1. Insert portfolios
  const portfolios = [
    {
      title: 'E-Commerce Platform',
      slug: 'e-commerce-platform',
      short_description: '현대적인 온라인 쇼핑몰 플랫폼 개발',
      description: 'React와 Node.js를 활용한 풀스택 이커머스 플랫폼입니다. 결제 시스템 연동, 재고 관리, 주문 추적 등의 기능을 구현했습니다.',
      cover_image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      badge: 'Featured',
      status: 'published',
      is_public: true,
      is_featured: true,
      view_count: 245,
      order_index: 1,
    },
    {
      title: 'Task Management App',
      slug: 'task-management-app',
      short_description: '팀 협업을 위한 태스크 관리 앱',
      description: '실시간 협업이 가능한 태스크 관리 애플리케이션입니다. 드래그앤드롭, 실시간 알림, 간트차트 등의 기능을 제공합니다.',
      cover_image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      badge: 'New',
      status: 'published',
      is_public: true,
      is_featured: true,
      view_count: 189,
      order_index: 2,
    },
    {
      title: 'AI Chat Bot',
      slug: 'ai-chat-bot',
      short_description: 'OpenAI API 기반 AI 챗봇 서비스',
      description: 'GPT-4를 활용한 지능형 챗봇 서비스입니다. 자연어 처리, 맥락 이해, 다국어 지원 기능을 갖추고 있습니다.',
      cover_image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      badge: null,
      status: 'published',
      is_public: true,
      is_featured: false,
      view_count: 156,
      order_index: 3,
    },
    {
      title: 'Health & Fitness Tracker',
      slug: 'health-fitness-tracker',
      short_description: '개인 건강 관리 모바일 앱',
      description: 'React Native로 개발한 크로스플랫폼 건강 관리 앱입니다. 운동 기록, 식단 관리, 수면 추적 기능을 제공합니다.',
      cover_image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800',
      badge: null,
      status: 'published',
      is_public: true,
      is_featured: false,
      view_count: 98,
      order_index: 4,
    },
    {
      title: 'Real Estate Platform',
      slug: 'real-estate-platform',
      short_description: '부동산 매물 검색 및 중개 플랫폼',
      description: '지도 기반 부동산 매물 검색 플랫폼입니다. 필터링, 가상 투어, 중개사 연결 기능을 포함합니다.',
      cover_image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      badge: 'Popular',
      status: 'published',
      is_public: true,
      is_featured: false,
      view_count: 312,
      order_index: 5,
    },
  ];

  const { data: insertedPortfolios, error: portfolioError } = await supabase
    .from('portfolios')
    .insert(portfolios)
    .select();

  if (portfolioError) {
    console.error('❌ Error inserting portfolios:', portfolioError.message);
    return;
  }
  console.log(`✅ Inserted ${insertedPortfolios.length} portfolios`);

  // 2. Insert portfolio details
  const details = insertedPortfolios.map((portfolio, index) => ({
    portfolio_id: portfolio.id,
    period: ['2024.01 - 2024.06', '2023.08 - 2024.02', '2024.03 - 2024.05', '2023.06 - 2023.12', '2024.02 - 진행중'][index],
    role: ['Full Stack Developer', 'Frontend Lead', 'AI Engineer', 'Mobile Developer', 'Backend Developer'][index],
    team_size: [5, 4, 3, 2, 6][index],
    contribution: [80, 70, 90, 100, 60][index],
  }));

  const { error: detailError } = await supabase
    .from('portfolio_details')
    .insert(details);

  if (detailError) {
    console.error('❌ Error inserting details:', detailError.message);
  } else {
    console.log(`✅ Inserted ${details.length} portfolio details`);
  }

  // 3. Insert portfolio tags
  const tagsData = [
    ['React', 'Node.js', 'E-Commerce', 'Payment'],
    ['React', 'WebSocket', 'Collaboration', 'Productivity'],
    ['AI', 'ChatGPT', 'NLP', 'Python'],
    ['React Native', 'Mobile', 'Health', 'iOS/Android'],
    ['Next.js', 'Maps', 'Real Estate', 'TypeScript'],
  ];

  const tags = insertedPortfolios.flatMap((portfolio, pIndex) =>
    tagsData[pIndex].map((tag, tIndex) => ({
      portfolio_id: portfolio.id,
      tag,
      order_index: tIndex,
    }))
  );

  const { error: tagError } = await supabase
    .from('portfolio_tags')
    .insert(tags);

  if (tagError) {
    console.error('❌ Error inserting tags:', tagError.message);
  } else {
    console.log(`✅ Inserted ${tags.length} portfolio tags`);
  }

  // 4. Insert tech stacks
  const techStackData = [
    [
      { name: 'React', icon: 'SiReact', icon_color: '#61DAFB', category: 'Frontend' },
      { name: 'Node.js', icon: 'SiNodedotjs', icon_color: '#339933', category: 'Backend' },
      { name: 'PostgreSQL', icon: 'SiPostgresql', icon_color: '#4169E1', category: 'Database' },
      { name: 'Stripe', icon: 'SiStripe', icon_color: '#008CDD', category: 'Payment' },
    ],
    [
      { name: 'React', icon: 'SiReact', icon_color: '#61DAFB', category: 'Frontend' },
      { name: 'Socket.io', icon: 'SiSocketdotio', icon_color: '#010101', category: 'Realtime' },
      { name: 'Redis', icon: 'SiRedis', icon_color: '#DC382D', category: 'Cache' },
      { name: 'Docker', icon: 'SiDocker', icon_color: '#2496ED', category: 'DevOps' },
    ],
    [
      { name: 'Python', icon: 'SiPython', icon_color: '#3776AB', category: 'Backend' },
      { name: 'OpenAI', icon: 'SiOpenai', icon_color: '#412991', category: 'AI' },
      { name: 'FastAPI', icon: 'SiFastapi', icon_color: '#009688', category: 'Backend' },
      { name: 'MongoDB', icon: 'SiMongodb', icon_color: '#47A248', category: 'Database' },
    ],
    [
      { name: 'React Native', icon: 'SiReact', icon_color: '#61DAFB', category: 'Mobile' },
      { name: 'Firebase', icon: 'SiFirebase', icon_color: '#FFCA28', category: 'Backend' },
      { name: 'Expo', icon: 'SiExpo', icon_color: '#000020', category: 'Mobile' },
    ],
    [
      { name: 'Next.js', icon: 'SiNextdotjs', icon_color: '#000000', category: 'Frontend' },
      { name: 'TypeScript', icon: 'SiTypescript', icon_color: '#3178C6', category: 'Language' },
      { name: 'Supabase', icon: 'SiSupabase', icon_color: '#3ECF8E', category: 'Backend' },
      { name: 'Mapbox', icon: 'SiMapbox', icon_color: '#000000', category: 'Maps' },
    ],
  ];

  const techStacks = insertedPortfolios.flatMap((portfolio, pIndex) =>
    techStackData[pIndex].map((tech, tIndex) => ({
      portfolio_id: portfolio.id,
      name: tech.name,
      icon: tech.icon,
      icon_color: tech.icon_color,
      category: tech.category,
      order_index: tIndex,
    }))
  );

  const { error: techError } = await supabase
    .from('portfolio_tech_stack')
    .insert(techStacks);

  if (techError) {
    console.error('❌ Error inserting tech stacks:', techError.message);
  } else {
    console.log(`✅ Inserted ${techStacks.length} tech stacks`);
  }

  // 5. Insert portfolio tasks
  const tasksData = [
    ['프론트엔드 UI/UX 설계 및 구현', '결제 시스템 연동 (Stripe)', 'RESTful API 설계 및 개발', '주문/배송 추적 시스템 구현'],
    ['실시간 협업 기능 구현 (WebSocket)', '드래그앤드롭 UI 개발', '알림 시스템 설계', '간트차트 컴포넌트 개발'],
    ['GPT-4 API 연동', '대화 맥락 관리 시스템 구현', '다국어 응답 처리', '응답 스트리밍 구현'],
    ['크로스플랫폼 앱 개발', '건강 데이터 시각화', '운동 추적 알고리즘 개발', 'Apple Health/Google Fit 연동'],
    ['지도 기반 매물 검색 구현', '필터링 시스템 개발', '가상 투어 기능 구현', '중개사 매칭 시스템'],
  ];

  const tasks = insertedPortfolios.flatMap((portfolio, pIndex) =>
    tasksData[pIndex].map((task, tIndex) => ({
      portfolio_id: portfolio.id,
      task,
      order_index: tIndex,
    }))
  );

  const { error: taskError } = await supabase
    .from('portfolio_tasks')
    .insert(tasks);

  if (taskError) {
    console.error('❌ Error inserting tasks:', taskError.message);
  } else {
    console.log(`✅ Inserted ${tasks.length} portfolio tasks`);
  }

  // 6. Insert portfolio results
  const resultsData = [
    [
      { result: '월간 매출 300% 증가', metric_value: '300%' },
      { result: '평균 주문 처리 시간 50% 단축', metric_value: '50%' },
      { result: '고객 만족도 4.8/5.0', metric_value: '4.8' },
    ],
    [
      { result: '팀 생산성 40% 향상', metric_value: '40%' },
      { result: '프로젝트 완료율 25% 증가', metric_value: '25%' },
      { result: '사용자 리텐션 85%', metric_value: '85%' },
    ],
    [
      { result: '고객 문의 응답률 95%', metric_value: '95%' },
      { result: '평균 응답 시간 2초', metric_value: '2s' },
      { result: '사용자 만족도 4.7/5.0', metric_value: '4.7' },
    ],
    [
      { result: '앱스토어 평점 4.6', metric_value: '4.6' },
      { result: '월간 활성 사용자 10만+', metric_value: '100K+' },
      { result: '데일리 목표 달성률 78%', metric_value: '78%' },
    ],
    [
      { result: '매물 조회수 200% 증가', metric_value: '200%' },
      { result: '중개 성사율 35% 향상', metric_value: '35%' },
      { result: '평균 체류 시간 5분', metric_value: '5min' },
    ],
  ];

  const results = insertedPortfolios.flatMap((portfolio, pIndex) =>
    resultsData[pIndex].map((result, rIndex) => ({
      portfolio_id: portfolio.id,
      result: result.result,
      metric_value: result.metric_value,
      order_index: rIndex,
    }))
  );

  const { error: resultError } = await supabase
    .from('portfolio_results')
    .insert(results);

  if (resultError) {
    console.error('❌ Error inserting results:', resultError.message);
  } else {
    console.log(`✅ Inserted ${results.length} portfolio results`);
  }

  console.log('\n🎉 Seed data completed successfully!');
}

seedData().catch(console.error);