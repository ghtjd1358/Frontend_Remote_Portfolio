import React, { useEffect, useState } from 'react';
import { getPortfolios, PortfolioSummary } from './network';
import './global.css';

// 스크롤 애니메이션 훅
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
};

const App: React.FC = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [portfolios, setPortfolios] = useState<PortfolioSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useScrollAnimation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPortfolios();
        if (res.success && res.data) {
          setPortfolios(res.data.data);
        }
      } catch (error) {
        console.error('Error fetching portfolios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollBtn(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 주요 프로젝트 (is_featured)
  const featuredProjects = portfolios.filter(p => p.is_featured);
  // 나머지 프로젝트
  const otherProjects = portfolios.filter(p => !p.is_featured);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="portfolio-module">
      {/* 주요 포트폴리오 */}
      <section id="portfolio" className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">Portfolio</div>
            <h2 className="section-title">포트폴리오</h2>
          </div>

          {featuredProjects.length === 0 && otherProjects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
              아직 등록된 포트폴리오가 없습니다.
            </div>
          ) : (
            <div className="project-list">
              {featuredProjects.map((project, index) => (
                <article key={project.id} className={`project-card featured animate-on-scroll delay-${index + 1}`}>
                  <div className="project-thumbnail">
                    {project.badge || '🚀'}
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.short_description || project.description}</p>

                    {/* 기술 스택 태그 */}
                    <div className="project-tags">
                      {project.techStack?.slice(0, 4).map((tech) => (
                        <span key={tech.id} className="project-tag" style={{ borderColor: tech.icon_color || undefined }}>
                          {tech.name}
                        </span>
                      ))}
                    </div>

                    {/* 상세 정보 */}
                    {project.detail && (
                      <div style={{ fontSize: '0.85rem', color: '#888', marginTop: '8px' }}>
                        {project.detail.period && <span>📅 {project.detail.period}</span>}
                        {project.detail.role && <span style={{ marginLeft: '12px' }}>👤 {project.detail.role}</span>}
                      </div>
                    )}

                    <div className="project-links">
                      <a href="#" className="project-link primary">자세히 보기</a>
                      <a href="#" className="project-link secondary">GitHub</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 기타 프로젝트 */}
      {otherProjects.length > 0 && (
        <section id="other" className="section section-alt">
          <div className="container">
            <div className="section-header animate-on-scroll">
              <div className="section-label">Side Projects</div>
              <h2 className="section-title">기타 프로젝트</h2>
            </div>

            <div className="project-grid">
              {otherProjects.map((project, index) => (
                <article key={project.id} className={`project-card-small animate-on-scroll delay-${Math.min(index + 1, 5)}`}>
                  <div className="project-thumbnail-small">{project.badge || '📁'}</div>
                  <h3 className="project-title-small">{project.title}</h3>
                  <p className="project-desc-small">{project.short_description || ''}</p>
                  <div className="project-tags">
                    {project.tags?.slice(0, 3).map((tag) => (
                      <span key={tag.id} className="project-tag-small">{tag.tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 스크롤 탑 버튼 */}
      <button
        className={`scroll-top-btn ${showScrollBtn ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="맨 위로"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="17 11 12 6 7 11"></polyline>
          <polyline points="17 18 12 13 7 18"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default App;
