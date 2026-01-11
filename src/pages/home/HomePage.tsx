/**
 * HomePage - Portfolio 메인 페이지
 */

import React, { useEffect, useState } from 'react';
import { ScrollTopButton } from '@mfa/lib';
import { usePortfolios } from '../../hooks';
import { navSections } from '../../data';

// 스크롤 애니메이션 훅
const useScrollAnimation = (dependencies: any[] = []) => {
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
  }, dependencies);
};

// Bento 그리드 카드 사이즈 결정
const getBentoSize = (index: number, total: number): string => {
  if (total === 1) return 'size-large';
  if (total === 2) return index === 0 ? 'size-large' : 'size-wide';
  const pattern = ['size-large', 'size-tall', 'size-normal', 'size-normal', 'size-wide', 'size-normal'];
  return pattern[index % pattern.length];
};

const HomePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const { portfolios, featuredProjects, otherProjects, loading } = usePortfolios();

  useScrollAnimation([portfolios]);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.2;

      for (const section of navSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom > triggerPoint) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 60;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <div>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="portfolio-module">
      {/* 히어로 */}
      <section className="hero portfolio-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              만들어온<br />
              프로젝트들
            </h1>
            <p className="hero-desc">
              실무와 사이드 프로젝트를 통해 성장해온 기록입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 섹션 네비게이션 바 */}
      <div className="sticky-nav-wrapper">
        <nav className="sticky-nav">
          <button className="nav-logo-dots" onClick={scrollToTop}>
            <span className="dot blue"></span>
            <span className="dot green"></span>
            <span className="dot lime"></span>
          </button>
          <ul className="nav-pills">
            {navSections.map((section) => (
              <li key={section.id}>
                <button
                  className={`nav-pill ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 주요 포트폴리오 */}
      <section id="portfolio" className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <div className="section-label">Portfolio</div>
            <h1 className="section-title">포트폴리오</h1>
          </div>

          {featuredProjects.length === 0 && otherProjects.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📁</div>
              <p className="empty-state-text">아직 등록된 포트폴리오가 없습니다.</p>
            </div>
          ) : (
            <div className="bento-grid">
              {featuredProjects.map((project, index) => (
                <article
                  key={project.id}
                  className={`bento-card ${getBentoSize(index, featuredProjects.length)} animate-on-scroll delay-${Math.min(index + 1, 5)}`}
                >
                  {index === 0 && <span className="bento-badge">Featured</span>}
                  <div className="bento-card-inner">
                    <div className="bento-thumbnail">
                      {project.badge || '🚀'}
                    </div>
                    <div className="bento-content">
                      <h3 className="bento-title">{project.title}</h3>
                      <p className="bento-desc">{project.short_description || project.description}</p>
                      <div className="bento-tags">
                        {project.techStack?.slice(0, 4).map((tech) => (
                          <span key={tech.id} className="bento-tag">
                            {tech.name}
                          </span>
                        ))}
                      </div>
                      {project.detail && (
                        <div className="bento-meta">
                          {project.detail.period && <span className="bento-meta-item">📅 {project.detail.period}</span>}
                          {project.detail.role && <span className="bento-meta-item">👤 {project.detail.role}</span>}
                        </div>
                      )}
                      <div className="bento-links">
                        <a href="#" className="bento-link primary">자세히 보기</a>
                        <a href="#" className="bento-link secondary">GitHub</a>
                      </div>
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

            <div className="other-projects-grid">
              {otherProjects.map((project, index) => (
                <article key={project.id} className={`other-project-card animate-on-scroll delay-${Math.min(index + 1, 5)}`}>
                  <div className="other-project-thumbnail">{project.badge || '📁'}</div>
                  <h3 className="other-project-title">{project.title}</h3>
                  <p className="other-project-desc">{project.short_description || ''}</p>
                  <div className="other-project-tags">
                    {project.tags?.slice(0, 3).map((tag) => (
                      <span key={tag.id} className="other-project-tag">{tag.tag}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 스크롤 탑 버튼 */}
      <ScrollTopButton />
    </div>
  );
};

export default HomePage;
